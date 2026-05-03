const cityInput = document.getElementById("city-input");

const searchBtn = document.getElementById("search-btn");

const locationBtn = document.getElementById("location-btn");

const weatherCard = document.getElementById("weather-card");

const forecastContainer = document.getElementById("hourly-forecast");



/* TOAST POPUP FUNCTION */

function showToast(message) {

const toast = document.getElementById("toast");

toast.textContent = message;

toast.className = "show";

setTimeout(() => {

toast.className = toast.className.replace("show","");

},2500);

}



/* SEARCH BUTTON */

searchBtn.addEventListener("click", () => {

const city = cityInput.value.trim();

if(!city){

showToast("Enter a city name");

return;

}

getWeather(city);

getHourlyForecast(city);

});



/* CURRENT WEATHER FUNCTION */

async function getWeather(city){

try{

const response = await fetch(

`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

);

const data = await response.json();


if(data.cod !== 200){

showToast("City not found");

return;

}


const icon = data.weather[0].icon;


weatherCard.innerHTML = `

<h2>${data.name}</h2>

<img src="https://openweathermap.org/img/wn/${icon}@2x.png">

<h1>${Math.round(data.main.temp)}°C</h1>

<p>${data.weather[0].description}</p>

`;

}catch{

showToast("Network error");

}

}



/* HOURLY FORECAST FUNCTION ⭐ */

async function getHourlyForecast(city){

forecastContainer.innerHTML = "";

try{

const response = await fetch(

`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`

);

const data = await response.json();

const forecastList = data.list.slice(0,5);


forecastList.forEach(item => {

const time = item.dt_txt.split(" ")[1].slice(0,5);

const temp = Math.round(item.main.temp);

const icon = item.weather[0].icon;


const card = document.createElement("div");

card.classList.add("forecast-card");


card.innerHTML = `

<p>${time}</p>

<img src="https://openweathermap.org/img/wn/${icon}@2x.png">

<p>${temp}°C</p>

`;

forecastContainer.appendChild(card);

});

}catch{

showToast("Forecast loading failed");

}

}



/* LOCATION BUTTON */

locationBtn.addEventListener("click", () => {

navigator.geolocation.getCurrentPosition(position => {

const lat = position.coords.latitude;

const lon = position.coords.longitude;


getWeatherByCoords(lat,lon);

getForecastByCoords(lat,lon);

});

});



/* LOCATION WEATHER */

async function getWeatherByCoords(lat,lon){

const response = await fetch(

`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

);

const data = await response.json();


const icon = data.weather[0].icon;


weatherCard.innerHTML = `

<h2>${data.name}</h2>

<img src="https://openweathermap.org/img/wn/${icon}@2x.png">

<h1>${Math.round(data.main.temp)}°C</h1>

<p>${data.weather[0].description}</p>

`;

}



/* LOCATION FORECAST */

async function getForecastByCoords(lat,lon){

forecastContainer.innerHTML = "";

const response = await fetch(

`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

);

const data = await response.json();

const forecastList = data.list.slice(0,5);


forecastList.forEach(item => {

const time = item.dt_txt.split(" ")[1].slice(0,5);

const temp = Math.round(item.main.temp);

const icon = item.weather[0].icon;


const card = document.createElement("div");

card.classList.add("forecast-card");


card.innerHTML = `

<p>${time}</p>

<img src="https://openweathermap.org/img/wn/${icon}@2x.png">

<p>${temp}°C</p>

`;

forecastContainer.appendChild(card);

});

}