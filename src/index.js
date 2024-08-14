function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let currentDateELement = document.querySelector("#current-date");
  let condition = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let icon = document.querySelector("#icon");
  let cityElement = document.querySelector("#current-city");
  let conditionElement = document.querySelector("#current-condition");

  currentDateELement.innerHTML = formatDate(currentDate);
  icon.innerHTML = `<img class="icon-dimensions"src="${response.data.condition.icon_url}">`;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  conditionElement.innerHTML = `, ${condition} <br />Humidity: <strong>${humidity}%</strong>, Wind: <strong>${wind}km/h</strong>`;
}
function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
}

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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDate = new Date();

searchCity("Tehran");
