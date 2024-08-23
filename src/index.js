function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayTemperature(response) {
  //console.log(response.data);
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let currentDateELement = document.querySelector("#current-date");
  let conditionElement = document.querySelector("#current-condition");
  let condition = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let icon = document.querySelector("#icon");
  let cityElement = document.querySelector("#current-city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  currentDateELement.innerHTML = formatDate(currentDate);
  conditionElement.innerHTML = `, ${condition} <br />Humidity: <strong>${humidity}%</strong>, Wind: <strong>${wind}km/h</strong>`;
  icon.innerHTML = `<img class="icon-dimensions"src="${response.data.condition.icon_url}">`;

  displayForecast(response.data.city);
}

function displayForecast(response) {
  let forecast = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecast += `<div class="forecast-day">
            <div class="forecast-date">${formatDay(day.time)}</div>
            <div class="forecast-icon"><img class="forecast-icon-dimensions" src="${
              day.condition.icon_url
            }"></div>
            <div class="forecast-temperature">
              <div class="forecast-temperature-max"><strong>${Math.round(
                day.temperature.maximum
              )}</strong></div>

              <div class="forecast-temperature-min">${Math.round(
                day.temperature.minimum
              )}</div>
            </div>
          </div>
`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecast;
}

function searchCity(city) {
  //function to dislay the temp details of inputed city
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let currentapiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let forecastapiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(currentapiUrl).then(displayTemperature);
  axios.get(forecastapiUrl).then(displayForecast);
}

function searchElement(event) {
  //function grabs city and passes it to the searchCity function
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchElement);

let currentDate = new Date();

searchCity("Tehran");
