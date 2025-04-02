document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "461e36c0925adf07e1bd769324b04eae";
    const lat = 4.95893; // Calabar Latitude
    const lon = 8.32695; // Calabar Longitude
    const units = "metric"; // Use 'imperial' for Fahrenheit

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    async function fetchWeather() {
        try {
            const response = await fetch(weatherUrl);
            if (!response.ok) throw new Error("Weather data fetch failed");
            const data = await response.json();

            const cityName = data.name;
            const temperature = Math.round(data.main.temp);
            let description = data.weather[0].description;

            // Capitalize each word in description
            description = description
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");


                // Get current date and time
            const now = new Date();
            const options = { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric", 
                hour: "2-digit", 
                minute: "2-digit", 
                hour12: true 
            };
            const formattedDate = now.toLocaleString("en-US", options); // Fix applied

            

            document.getElementById("city-name").textContent = cityName;
            document.getElementById("current-temp").textContent = `${temperature}°C`;
            document.getElementById("weather-description").textContent = description;
            document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("weather-icon").alt = description;
            document.getElementById("current-date-time").textContent = formattedDate;

             // Change weather background based on conditions
             const weatherContainer = document.querySelector(".weather");
             if (description.includes("Rain")) {
                 weatherContainer.style.backgroundColor = "#2c3e50"; // Dark blue for rainy weather
             } else if (description.includes("Sunny") || description.includes("Clear")) {
                 weatherContainer.style.backgroundColor = "#f39c12"; // Bright yellow for sunny
             } else if (description.includes("Cloud")) {
                 weatherContainer.style.backgroundColor = "#7f8c8d"; // Gray for cloudy weather
             }
        } catch (error) {
            console.error("Weather fetch error:", error);
            document.getElementById("weather-description").textContent = "Weather data unavailable.";
        
        }
    }

    async function fetchForecast() {
        try {
            const response = await fetch(forecastUrl);
            if (!response.ok) throw new Error("Forecast data fetch failed");
            const data = await response.json();

            const forecastContainer = document.getElementById("forecast");
            forecastContainer.innerHTML = ""; // Clear previous content

            const dailyForecasts = {};
            data.list.forEach(item => {
                const date = item.dt_txt.split(" ")[0]; // Extract date
                const time = item.dt_txt.split(" ")[1]; // Extract time

                // Pick forecast at 12:00 PM for more accuracy
                if (time === "12:00:00" && !dailyForecasts[date]) {
                    dailyForecasts[date] = item.main.temp;
                }
            });

            let dayCount = 0;
            for (let date in dailyForecasts) {
                if (dayCount < 3) {
                    const temp = Math.round(dailyForecasts[date]);

                   // Format date (e.g., "Monday, Apr 1")
                   const forecastDate = new Date(date);
                   const options = { weekday: "long", month: "short", day: "numeric" };
                   const formattedDate = forecastDate.toLocaleDateString("en-US", options);

                   const forecastItem = document.createElement("p");
                   forecastItem.textContent = `${formattedDate}: ${temp}°C`;
                   forecastContainer.appendChild(forecastItem);
                   dayCount++;
               }
           
            }
        } catch (error) {
            console.error("Forecast fetch error:", error);
            document.getElementById("forecast").textContent = "Forecast data unavailable.";
        }
    }

    

    fetchWeather();
    fetchForecast();
});


