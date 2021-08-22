function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${minutes}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatIcon(weatherIcon) {
  let iconLookUp = {
    "01d": "☀️",
    "02d": "🌤",
    "03d": "🌥",
    "04d": "☁️",
    "09d": "🌧",
    "10d": "🌧",
    "11d": "⛈",
    "13d": "🌨",
    "50d": "🌫",
    "01n": "🌑",
    "02n": "🌘",
    "03n": "🌥",
    "04n": "☁️",
    "09n": "🌧",
    "10n": "🌧",
    "11n": "⛈",
    "13n": "🌨",
    "50n": "🌫",
  };
  console.log(weatherIcon);
  return iconLookUp[weatherIcon];
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
  <div class="forecast-day">${formatForecastDay(forecastDay.dt)}</div>
  <span class="forecast-icon-emoji" id="icon-emoji">${formatIcon(
    forecastDay.weather[0].icon
  )}</span>
  <div class="forecast-temperature">
  <span class="forecast-temperature-max"> ${Math.round(
    forecastDay.temp.max
  )}° </span>
  <span class="forecast-temperature-min"> ${Math.round(
    forecastDay.temp.min
  )}° </span>
  </div>
  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "f6e27edd666fe2993c6dd52e5b82732e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconEmojiElement = document.querySelector("#icon-emoji");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconEmojiElement.innerHTML = formatIcon(response.data.weather[0].icon);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "f6e27edd666fe2993c6dd52e5b82732e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrenheitTemp(event) {
  event.preventDefault;
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.add("inactive");
  fahrenheitLink.classList.remove("inactive");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault;
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.remove("inactive");
  fahrenheitLink.classList.add("inactive");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Edinburgh");
