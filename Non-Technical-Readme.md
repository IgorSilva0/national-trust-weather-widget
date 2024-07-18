## Overview of the Solution for a Non-Technical Audience

**National Trust Weather Display Widget**

This project aims to enhance the National Trust property pages by providing visitors with real-time weather information for the properties they are interested in. This dynamic weather display widget is designed to improve user engagement and help visitors plan their trips more effectively.

#### Key Features:

1. **Weather Information Display:**
   - A widget that shows current weather conditions for National Trust properties.
   - The weather information includes temperature and sky conditions (e.g., sunny, cloudy).

2. **A/B Testing:**
   - We are conducting an A/B test to measure the impact of the weather widget on user engagement.
   - **Version A:** Includes the weather widget, but users need to click a button to view the weather.
   - **Version B:** The property page is shown without the weather widget.

3. **Random Assignment:**
   - Visitors are randomly assigned to either Version A or Version B to ensure an unbiased comparison.

4. **User Interaction Tracking:**
   - In Version A, the button click to view the weather is tracked to understand user interest.

#### Benefits:

- **Enhanced Planning:**
  - Visitors can see the current weather conditions, helping them decide the best time to visit.
  
- **User Engagement:**
  - Providing useful weather information can increase the time visitors spend on the site and their interest in visiting the properties.

#### Implementation:

- **Coordinate Extraction:**
  - The widget uses different methods to extract property coordinates for fetching weather data, ensuring flexibility and reliability.
  
- **Weather Data Fetching:**
  - The coordinates are used to query a weather API for real-time weather conditions.

- **Session Storage:**
  - Coordinates are stored in session storage to avoid repeated API calls, improving performance.

#### Conclusion:

This weather display widget is designed to seamlessly integrate into the existing National Trust property pages, providing valuable weather information to enhance user experience. Through the A/B test, we aim to gather insights on how this feature impacts visitor behavior, guiding future improvements and expansions of our online services.

#### Future Plans:

- **Multi-Day Forecasts:**
  - Expanding the widget to display weather forecasts for multiple days.
  
- **Integration in Search Lists:**
  - Displaying weather information directly in property search results for better usability.

These enhancements will continue to improve user engagement and help visitors make informed decisions about their visits to National Trust properties.
