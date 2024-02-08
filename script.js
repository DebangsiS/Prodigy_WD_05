const apiKey = '0e8f3cad31066397318fe6b7c0dc17ef';

// Function to fetch weather data based on user's location
function fetchWeatherDataByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to fetch weather data based on user input
function fetchWeatherDataByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayWeatherData(data))
    .catch(error => console.error('Error fetching weather data:', error));
}

// Function to display weather data on the page
function displayWeatherData(data) {
  const { name, main, weather } = data;
  const temp = main.temp.toFixed(1);
  const description = weather[0].description;

  document.getElementById('city-name').textContent = name;
  document.getElementById('temperature').textContent = `${temp}°C`;
  document.getElementById('description').textContent = description;
  document.getElementById('humidity').textContent = `Humidity: ${main.humidity}%`;
  document.getElementById('wind-speed').textContent = `Wind Speed: ${main.wind.speed} m/s`;

  // Set weather icon
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
  document.getElementById('weather-icon').src = iconUrl;
}

// Add event listener to search button
document.getElementById('search-btn').addEventListener('click', () => {
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.trim();

  if (city) {
    fetchWeatherDataByCity(city);
  } else {
    alert('Please enter a city name.');
  }
});

// Add event listener to current location button
document.getElementById('current-location-btn').addEventListener('click', fetchWeatherDataByLocation);