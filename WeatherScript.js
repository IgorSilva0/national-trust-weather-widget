(function() {
    // extract coordinates from URL
    const extractCoordinates = () => {
        const property = document.querySelector('#propertyViewOnGoogleMaps_image').href;
        const coordinates = property.split('destination=')[1];
        return coordinates.split('%2C');
    };

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
        weatherDisplay.style.marginBottom = '10px';

        // Weather title
        const weatherTitle = document.createElement('h4');
        weatherTitle.textContent = 'Current weather conditions:';
        weatherTitle.style.margin = '10px 0';
        weatherDisplay.appendChild(weatherTitle);

        // Weather information
        const weatherInfo = document.createElement('p');
        weatherInfo.textContent = `${clouds} with a temperature of ${Math.floor(temperature)}°C`;
        weatherInfo.style.fontSize = '1rem';
        weatherDisplay.appendChild(weatherInfo);

        return weatherDisplay;
    };

    const initialize = () => {
        try {
            const [lat, lon] = extractCoordinates();
            fetchWeatherData(lat, lon)
                .then(({ main, weather }) => {
                    const temperature = main.temp;
                    const clouds = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
                    const parent = document.querySelector('[data-testid="place-summary-links"]');
                    const weatherDisplay = createWeatherDisplay(temperature, clouds);
                    parent.appendChild(weatherDisplay);
                })
                .catch(error => console.error('Error:', error));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Call func
    initialize();
})();
