const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const weatherCard = document.getElementById("weather-card");
const forecastContainer = document.getElementById("hourly-forecast");
const unitBtn = document.getElementById("unit-toggle");
const themeBtn = document.getElementById("theme-toggle");

let currentUnit = localStorage.getItem("unit") || "metric";
let lastCity = "";

/* Helpers */
function getUnitSymbol(){
return currentUnit === "metric" ? "°C" : "°F";
}

function updateUnitBtn(){
unitBtn.textContent =
currentUnit === "metric" ? "Switch to °F" : "Switch to °C";
}

updateUnitBtn();

/* Toast */
function showToast(message){
const toast = document.getElementById("toast");
toast.textContent = message;
toast.className = "show";
setTimeout(()=>toast.className="",2500);
}

/* Theme */
if(localStorage.getItem("theme")==="dark"){
document.body.classList.add("dark");
themeBtn.textContent="☀️ Light Mode";
}

themeBtn.addEventListener("click",()=>{
document.body.classList.toggle("dark");
if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
themeBtn.textContent="☀️ Light Mode";
}else{
localStorage.setItem("theme","light");
themeBtn.textContent="🌙 Dark Mode";
}
});

/* Unit toggle */
unitBtn.addEventListener("click",()=>{
currentUnit = currentUnit==="metric" ? "imperial" : "metric";
localStorage.setItem("unit",currentUnit);
updateUnitBtn();

if(lastCity){
getWeather(lastCity);
getHourlyForecast(lastCity);
}
});

/* Search */
searchBtn.addEventListener("click",()=>{
const city = cityInput.value.trim();
if(!city){
showToast("Enter city name");
return;
}
lastCity = city;
getWeather(city);
getHourlyForecast(city);
});

/* Weather */
async function getWeather(city){
try{
const res = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${currentUnit}`
);
const data = await res.json();

if(data.cod!==200){
showToast("City not found");
return;
}

const icon = data.weather[0].icon;

weatherCard.innerHTML=`
<h2>${data.name}</h2>
<img src="https://openweathermap.org/img/wn/${icon}@2x.png">
<h1>${Math.round(data.main.temp)}${getUnitSymbol()}</h1>
<p>${data.weather[0].description}</p>
`;

}catch{
showToast("Network error");
}
}

/* Forecast */
async function getHourlyForecast(city){
forecastContainer.innerHTML="";

try{
const res = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${currentUnit}`
);
const data = await res.json();

data.list.slice(0,5).forEach(item=>{
const time = item.dt_txt.split(" ")[1].slice(0,5);
const temp = Math.round(item.main.temp);
const icon = item.weather[0].icon;

const card = document.createElement("div");
card.classList.add("forecast-card");

card.innerHTML=`
<p>${time}</p>
<img src="https://openweathermap.org/img/wn/${icon}@2x.png">
<p>${temp}${getUnitSymbol()}</p>
`;

forecastContainer.appendChild(card);
});

}catch{
showToast("Forecast failed");
}
}

/* Location */
locationBtn.addEventListener("click",()=>{
navigator.geolocation.getCurrentPosition(pos=>{
const lat = pos.coords.latitude;
const lon = pos.coords.longitude;
getWeatherByCoords(lat,lon);
getForecastByCoords(lat,lon);
});
});

async function getWeatherByCoords(lat,lon){
const res = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${currentUnit}`
);
const data = await res.json();

const icon = data.weather[0].icon;

weatherCard.innerHTML=`
<h2>${data.name}</h2>
<img src="https://openweathermap.org/img/wn/${icon}@2x.png">
<h1>${Math.round(data.main.temp)}${getUnitSymbol()}</h1>
<p>${data.weather[0].description}</p>
`;
}

async function getForecastByCoords(lat,lon){
forecastContainer.innerHTML="";

const res = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${currentUnit}`
);
const data = await res.json();

data.list.slice(0,5).forEach(item=>{
const time = item.dt_txt.split(" ")[1].slice(0,5);
const temp = Math.round(item.main.temp);
const icon = item.weather[0].icon;

const card = document.createElement("div");
card.classList.add("forecast-card");

card.innerHTML=`
<p>${time}</p>
<img src="https://openweathermap.org/img/wn/${icon}@2x.png">
<p>${temp}${getUnitSymbol()}</p>
`;

forecastContainer.appendChild(card);
});
}