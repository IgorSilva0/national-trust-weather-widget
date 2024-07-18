(function () {

    // Function to randomly decide whether to show Version A or Version B
    const shouldShowWeatherWidget = () => {
        return Math.random() < 0.5; // 50% chance of showing weather widget
    };

    // Solution One
    // Fetch data about location from national trust api
    const fetchCoordinates = async () => {
        try {
            const url = sessionStorage.getItem("qm_last_page");
            const parts = url.split('/visit/');

            if (parts.length > 1) {
                const property = parts[1].split('?')[0];
                const response = await fetch(`https://www.nationaltrust.org.uk/_next/data/2rnPVc3m1spnWupt3nYd8/visit/${property}.json`);

                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                const data = await response.json();
                const location = data.pageProps.appContext.place.data.location.latitudeLongitude;
                const lat = location.latitude;
                const lon = location.longitude;

                return { lat, lon };
            } else {
                console.log("Invalid URL format");
                return null; // Return null or handle invalid format case
            }
        } catch (error) {
            console.error('Fetch nt api error:', error);
            throw error; // Propagate the error further
        }
    };

    // Solution Two
    // extract coordinates from html element, nearly zero impact on app performance
    const extractCoordinates = () => {
        const property = document.querySelector('#propertyViewOnGoogleMaps_image').href;
        const coordinates = property.split('destination=')[1];
        return coordinates.split('%2C');
    };

    // Solution Three
    // Fetch the page script to extract the coordinates (less efficient)
    const extractCoords = () => {
        const coordinates = document.querySelector('#__NEXT_DATA__');
        const text = coordinates.textContent
        // Regular expression to find the latitude and longitude JSON substring
        const regex = /"latitude":\s*(-?\d+\.\d+),\s*"longitude":\s*(-?\d+\.\d+)/;
        const match = text.match(regex);
        if (match) {
            const lat = parseFloat(match[1]);
            const lon = parseFloat(match[2]);
            return { lat, lon };
        } else {
            throw new Error('Latitude and/or longitude not found.');
        }
    }

    // fetch weather data
    const fetchWeatherData = async (lat, lon) => {
        const apiKey = 'a2ef86c41a';
        const url = `https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=${apiKey}&lat=${lat}&lon=${lon}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => data.list[0])
            .catch(error => {
                console.error('Fetch error:', error);
                throw error; // Propagate the error further
            });
    };

    // Function to create weather display elements
    const createWeatherDisplay = (temperature, clouds) => {
        const weatherDisplay = document.createElement('div');
        weatherDisplay.classList.add('weather-widget');
        weatherDisplay.style.marginBottom = '10px';
        weatherDisplay.style.display = 'none';

        // Weather title
        const weatherTitle = document.createElement('h4');
        weatherTitle.textContent = 'Current weather conditions:';
        weatherTitle.style.margin = '0 0 10px 0';
        weatherDisplay.appendChild(weatherTitle);

        // Weather information
        const weatherInfo = document.createElement('p');
        weatherInfo.textContent = `${clouds} with a temperature of ${Math.floor(temperature)}°C`;
        weatherInfo.style.fontSize = '1rem';
        weatherDisplay.appendChild(weatherInfo);

        return weatherDisplay;
    };

    // Function to toggle weather display
    const toggleWeatherDisplay = () => {
        const weatherWidget = document.querySelector('.weather-widget');
        if (weatherWidget.style.display === 'none' || !weatherWidget.style.display) {
            weatherWidget.style.display = 'block';
        } else {
            weatherWidget.style.display = 'none';
        }
    };

    // Event listener for weather view button click
    const trackWeatherButtonClick = () => {
        console.log('Weather button clicked');
        // Replace with actual analytics tracking code if available
        // For example: analytics.track('WeatherButtonClicked');
        toggleWeatherDisplay(); // Show weather widget info
        document.querySelector('#weatherButton').style.display = 'none'; // Hide the button after click
    };

    // Start widget
    const initialize = async () => {
        try {
            if (shouldShowWeatherWidget()) {
                //Solution One
                const { lat, lon } = await fetchCoordinates();

                //Solution Two
                //const [lat, lon] = extractCoordinates();

                //Solution Three
                //const { lat, lon } = extractCoords();

                // Check if weather display already exists on the page
                const existingWeatherDisplay = document.querySelector('.weather-widget');

                if (!existingWeatherDisplay) {
                    fetchWeatherData(lat, lon)
                        .then(({ main, weather }) => {
                            const temperature = main.temp;
                            const clouds = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
                            const parent = document.querySelector('[data-testid="place-summary-links"]');
                            const weatherDisplay = createWeatherDisplay(temperature, clouds);
                            parent.appendChild(weatherDisplay);

                            // Add weather view button
                            const weatherButton = document.createElement('button');
                            weatherButton.textContent = 'View Current Weather';
                            weatherButton.id = 'weatherButton';
                            weatherButton.addEventListener('click', trackWeatherButtonClick);
                            parent.appendChild(weatherButton);
                        })
                        .catch(error => console.error('Error:', error));
                } else {
                    console.log('Weather display already exists. Not adding a new one.');
                }
            } else {
                console.log('Version B: Normal site without weather widget.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    initialize();

})();
