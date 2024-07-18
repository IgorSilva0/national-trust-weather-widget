# National Trust Weather Display Widget

This JavaScript project dynamically creates a weather display widget on National Trust property pages. The widget enhances user engagement by providing real-time weather information based on the property's location. By leveraging session storage to minimize redundant operations, it optimizes performance and improves overall user experience.

## Project Scope and Objectives

The National Trust aims to enrich their property information pages with current weather conditions to increase user engagement and encourage visits. They require this functionality to be implemented via a JavaScript script, which can seamlessly integrate into their existing site without structural changes. A/B testing is planned to measure the impact on user behavior.

## Key Features and Implementation

### Coordinate Extraction and Weather Data Fetching

- **Fetch Coordinates Options**:
  - Extracts property coordinates from the National Trust API, HTML elements linking to Google Maps, or embedded JSON on the page.
  
- **Fetch Weather Data**:
  - Utilizes the fetched coordinates to query a weather API for real-time weather conditions.

### Session Storage Optimization

- **Minimize Redundancy**:
  - Stores fetched coordinates in session storage to avoid repeated API calls, enhancing script performance.
  
- **Enhance User Experience**:
  - Swiftly delivers relevant weather information, improving user interaction without causing delays.

## Implementation Strategy

To effectively meet the National Trust's requirements:

- **Single Script Integration**:
  - The JavaScript script seamlessly integrates into National Trust property pages, dynamically extracting coordinates and displaying weather data.
  
- **No Structural Changes Required**:
  - Operates within the constraints of the existing National Trust website infrastructure, requiring only script inclusion.
  
- **Performance and User Engagement**:
  - Enhances user engagement by providing valuable weather insights, potentially increasing user interest in visiting properties.
## Solution One: Fetch Data from National Trust API

```javascript
const fetchCoordinates = async () => {
    try {
        // Get URL from Session Storage 
        const url = sessionStorage.getItem("qm_last_page");
        //const url = window.location.href;
        const parts = url.split('/visit/');

        if (parts.length > 1) {
            const property = parts[1].split('?')[0];
            // Option 1: Fetch from National Trust API directly
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
            return null; // Handle invalid format case
        }
    } catch (error) {
        console.error('Fetch nt api error:', error);
        throw error; // Propagate the error further
    }
};
```

**Pros:**
- Fetches accurate data directly from the National Trust API, ensuring up-to-date and precise coordinates.
- Explicit error handling allows for debugging and error management.
  
**Cons:**
- Introduces a network request, which can be slow and subject to failure.
- Dependent on the availability and response time of the external API.
- Potential impact on app performance due to asynchronous operations and potential delays.

## Solution Two: Extract Coordinates from HTML Element

```javascript
const extractCoordinates = () => {
    const property = document.querySelector('#propertyViewOnGoogleMaps_image').href;
    const coordinates = property.split('destination=')[1];
    return coordinates.split('%2C');
};
```

**Pros:**
- Almost zero impact on performance as it extracts data directly from the already loaded HTML.
- No dependency on external API availability or network reliability.
- Simpler and faster execution since it only parses existing content.

**Cons:**
- Relies on the presence and consistency of the HTML element's structure, which can change and break the extraction logic.
- Less robust if the HTML structure is not guaranteed to be consistent.

## Solution Three: Extract Coordinates from Page Script

```javascript
const extractCoords = () => {
    const coordinates = document.querySelector('#__NEXT_DATA__');
    const text = coordinates.textContent;
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
};
```

**Pros:**
- Extracts data from the embedded JSON script, ensuring data consistency with the page's current state.
- No network request required, reducing dependency on external factors.

**Cons:**
- Parsing JSON from a script element can be less efficient and harder to maintain.
- Requires careful handling of the extracted text and regular expressions, which can be error-prone and sensitive to changes in the page structure.

## Conclusion

**Best Solution: Solution Two - Extract Coordinates from HTML Element**

**Reasons:**
- **Performance:** Solution Two has minimal performance impact as it only involves DOM manipulation and avoids additional network requests.
- **Simplicity:** It is simpler and faster, relying solely on the existing HTML structure.
- **Robustness:** While it depends on the consistency of the HTML element, it is still less prone to failure compared to network-dependent solutions.

This choice optimizes performance and reliability, making it suitable for integrating into the National Trust website without introducing unnecessary complexity or potential points of failure.

## Future Plans for Expansion

The National Trust Weather Display Widget is planned to evolve with enhanced features:

### Expanded Functionality

- **Multi-Day Weather Forecast**:
  - Extend the widget to display weather forecasts for multiple days ahead.
  - Integrate with a weather API supporting multi-day forecasts, allowing users to toggle between current conditions and future forecasts.

- **Weather Display on Property Search Lists**:
  - Improve usability by displaying current weather information directly on property search lists.
  - Modify the widget to fetch and display real-time weather alongside each property listing in search results.

### Technical Enhancements

- **Backend Integration**:
  - Develop backend scripts to fetch and cache weather forecasts efficiently.
  
- **API Integration**:
  - Integrate with robust weather APIs to ensure reliable and accurate forecasts.
  
- **UI/UX Refinement**:
  - Enhance widget design for better usability and accessibility while accommodating additional weather information.

## User Experience Benefits

- **Enhanced Decision Making**:
  - Empower users with comprehensive weather data for informed property visit planning.
  
- **Improved Accessibility**:
  - Make weather information easily accessible across various touchpoints, enhancing user engagement with property listings.
  
- **Optimized Performance**:
  - Maintain script efficiency through backend optimizations and frontend enhancements, ensuring smooth operation for all users.

## Conclusion

The future expansion of the National Trust Weather Display Widget aims to significantly enrich user interactions by providing multi-day weather forecasts and integrating real-time weather information into property search lists. These enhancements not only improve usability but also align with the National Trust's goal of enhancing user engagement and facilitating informed decision-making regarding property visits.
