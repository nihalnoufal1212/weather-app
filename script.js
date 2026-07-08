const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const weatherCard = document.getElementById("weather-card");
const forecastContainer = document.getElementById("hourly-forecast");
const unitBtn = document.getElementById("unit-toggle");
const themeBtn = document.getElementById("theme-toggle");
const clearHistoryBtn = document.getElementById("clear-history-btn");

/* ===== API KEY FALLBACK ===== */
const LOCAL_API_KEY = "PASTE_YOUR_API_KEY_HERE";
const FINAL_API_KEY = typeof API_KEY !== "undefined" ? API_KEY : LOCAL_API_KEY;

const suggestionsBox = document.getElementById("suggestions-box");
const historyBox = document.getElementById("history-box");

/* ===== STATE ===== */
let currentUnit = localStorage.getItem("unit") || "metric";
let lastCity = "";

/* ===== HELPERS ===== */
function getUnitSymbol(){
return currentUnit === "metric" ? "°C" : "°F";
}

function updateUnitBtn(){
unitBtn.textContent =
currentUnit === "metric" ? "Switch to °F" : "Switch to °C";
}
updateUnitBtn();

/* ===== TOAST ===== */
function showToast(message){
const toast = document.getElementById("toast");
toast.textContent = message;
toast.className = "show";
setTimeout(()=>toast.className="",2500);
}

/* ===== DARK MODE ===== */
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

/* ===== UNIT TOGGLE ===== */
unitBtn.addEventListener("click",()=>{
currentUnit = currentUnit==="metric" ? "imperial" : "metric";
localStorage.setItem("unit",currentUnit);
updateUnitBtn();

if(lastCity){
getWeather(lastCity);
getHourlyForecast(lastCity);
}
});

/* ===== CENTRAL SEARCH FUNCTION (NEW FIX) ===== */
function handleSearch(city){

city = city.trim();

lastCity = city;
getWeather(city);
getHourlyForecast(city);

saveToHistory(city);
suggestionsBox.style.display = "none";
historyBox.style.display = "none";
}

/* ===== SEARCH BUTTON ===== */
searchBtn.addEventListener("click",()=>{
const city = cityInput.value.trim();

if(!city){
showToast("Enter city name");
return;
}

handleSearch(city);

});
cityInput.addEventListener("keydown", (e) => {

if(e.key === "Enter"){

const city = cityInput.value.trim();

if(!city){
showToast("Enter city name");
return;
}

handleSearch(city);

}

});

/* ===== WEATHER ===== */
async function getWeather(city){
try{
const res = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${FINAL_API_KEY}&units=${currentUnit}`
);
const data = await res.json();

if(data.cod == 401){
showToast("Use valid API key");
return;
}

if(data.cod !== 200){
showToast("City not found");
return;
}

const icon = data.weather[0].icon;
const updatedTime = new Date().toLocaleTimeString([], {
hour: '2-digit',
minute: '2-digit'
});
const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
hour: '2-digit',
minute: '2-digit'
});
const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
hour: '2-digit',
minute: '2-digit'
});
const directions = ["N","NE","E","SE","S","SW","W","NW"];
const windDirection =
directions[Math.round(data.wind.deg / 45) % 8];
const feelsDiff = Math.round(data.main.feels_like - data.main.temp);

const feelsText =
feelsDiff === 0
? "(Same)"
: feelsDiff > 0
? `(+${feelsDiff}${getUnitSymbol()})`
: `(${feelsDiff}${getUnitSymbol()})`;
let humidityStatus = "";

if (data.main.humidity < 30) {
    humidityStatus = "Low";
} else if (data.main.humidity <= 60) {
    humidityStatus = "Comfortable";
} else {
    humidityStatus = "High";
}
let temperatureStatus = "";

if (data.main.temp < 15) {
    temperatureStatus = "Cold";
} else if (data.main.temp < 25) {
    temperatureStatus = "Pleasant";
} else if (data.main.temp < 35) {
    temperatureStatus = "Warm";
} else {
    temperatureStatus = "Hot";
}
let windStrength = "";

if (data.wind.speed < 2) {
    windStrength = "Light";
} else if (data.wind.speed < 6) {
    windStrength = "Moderate";
} else {
    windStrength = "Strong";
}
weatherCard.innerHTML=`
<h2>${data.name}, ${data.sys.country}</h2>
<img
src="https://openweathermap.org/img/wn/${icon}@2x.png"
title="${data.weather[0].description}"
alt="${data.weather[0].description}">
<h1>${data.main.temp.toFixed(1)}${getUnitSymbol()} (${temperatureStatus})</h1>
<p>${data.weather[0].description}</p>
<p>🤗 Feels Like: ${data.main.feels_like.toFixed(1)}${getUnitSymbol()}</p><p>🔽 Min: ${data.main.temp_min.toFixed(1)}${getUnitSymbol()}</p>
<p>🔼 Max: ${data.main.temp_max.toFixed(1)}${getUnitSymbol()}</p>
<p>💨 Wind Speed: ${data.wind.speed} m/s (${windDirection}) - ${windStrength}</p>
<p>💧 Humidity: ${data.main.humidity}% (${humidityStatus})</p>
<p>🌍 Pressure: ${data.main.pressure} hPa</p>
<p>👁️ Visibility: ${data.visibility / 1000} km</p>
<p>🌅 Sunrise: ${sunrise}</p>
<p>🌇 Sunset: ${sunset}</p>
<p>🕒 Updated: ${updatedTime}</p>
`;

}catch{
showToast("Network error");
}
}

/* ===== FORECAST ===== */
async function getHourlyForecast(city){
forecastContainer.innerHTML="";

try{
const res = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${FINAL_API_KEY}&units=${currentUnit}`
);
const data = await res.json();

if(data.cod == 401){
showToast("Use valid API key");
return;
}

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

/* ===== LOCATION ===== */
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
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${FINAL_API_KEY}&units=${currentUnit}`
);
const data = await res.json();

if(data.cod == 401){
showToast("Use valid API key");
return;
}

const icon = data.weather[0].icon;
const updatedTime = new Date().toLocaleTimeString([], {
hour: '2-digit',
minute: '2-digit'
});
const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
hour: '2-digit',
minute: '2-digit'
});
const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
hour: '2-digit',
minute: '2-digit'
});
const directions = ["N","NE","E","SE","S","SW","W","NW"];
const windDirection =
directions[Math.round(data.wind.deg / 45) % 8];
const feelsDiff = Math.round(data.main.feels_like - data.main.temp);

const feelsText =
feelsDiff === 0
? "(Same)"
: feelsDiff > 0
? `(+${feelsDiff}${getUnitSymbol()})`
: `(${feelsDiff}${getUnitSymbol()})`;
let humidityStatus = "";

if (data.main.humidity < 30) {
    humidityStatus = "Low";
} else if (data.main.humidity <= 60) {
    humidityStatus = "Comfortable";
} else {
    humidityStatus = "High";
}
let temperatureStatus = "";

if (data.main.temp < 15) {
    temperatureStatus = "Cold";
} else if (data.main.temp < 25) {
    temperatureStatus = "Pleasant";
} else if (data.main.temp < 35) {
    temperatureStatus = "Warm";
} else {
    temperatureStatus = "Hot";
}
let windStrength = "";

if (data.wind.speed < 2) {
    windStrength = "Light";
} else if (data.wind.speed < 6) {
    windStrength = "Moderate";
} else {
    windStrength = "Strong";
}
weatherCard.innerHTML=`
<h2>${data.name}, ${data.sys.country}</h2>
<img
src="https://openweathermap.org/img/wn/${icon}@2x.png"
title="${data.weather[0].description}"
alt="${data.weather[0].description}">
<h1>${data.main.temp.toFixed(1)}${getUnitSymbol()} (${temperatureStatus})</h1>
<p>${data.weather[0].description}</p>
<p>🤗 Feels Like: ${data.main.feels_like.toFixed(1)}${getUnitSymbol()}</p><p>🔽 Min: ${data.main.temp_min.toFixed(1)}${getUnitSymbol()}</p>
<p>🔼 Max: ${data.main.temp_max.toFixed(1)}${getUnitSymbol()}</p>
<p>💨 Wind Speed: ${data.wind.speed} m/s (${windDirection}) - ${windStrength}</p>
<p>💧 Humidity: ${data.main.humidity}% (${humidityStatus})</p>
<p>🌍 Pressure: ${data.main.pressure} hPa</p>
<p>👁️ Visibility: ${data.visibility / 1000} km</p>
<p>🌅 Sunrise: ${sunrise}</p>
<p>🌇 Sunset: ${sunset}</p>
<p>🕒 Updated: ${updatedTime}</p>
`;
}

async function getForecastByCoords(lat,lon){
forecastContainer.innerHTML="";

const res = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${FINAL_API_KEY}&units=${currentUnit}`
);
const data = await res.json();

if(data.cod == 401){
showToast("Use valid API key");
return;
}

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

/* ===== AUTOSUGGEST ===== */
cityInput.addEventListener("input", async () => {

const query = cityInput.value.trim();

historyBox.style.display = "none";

if(!query){
suggestionsBox.style.display = "none";
showHistory();
return;
}

try{
const res = await fetch(
`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${FINAL_API_KEY}`
);

const data = await res.json();

suggestionsBox.innerHTML = "";

if(data.length === 0){

suggestionsBox.innerHTML = "<div>No suggestions found</div>";

suggestionsBox.style.display = "block";

return;

}

data.forEach(place => {

const item = document.createElement("div");

item.textContent = `${place.name}, ${place.country}`;

item.addEventListener("click", () => {

cityInput.value = place.name;
suggestionsBox.style.display = "none";

handleSearch(place.name);
cityInput.value = "";

});

suggestionsBox.appendChild(item);

});

suggestionsBox.style.display = "block";

}catch{
showToast("Suggestion error");
}

});

/* ===== HISTORY ===== */
function saveToHistory(city){
city = city
.toLowerCase()
.replace(/\b\w/g, letter => letter.toUpperCase());
let history = JSON.parse(localStorage.getItem("history")) || [];

history = history.filter(c => c.toLowerCase() !== city.toLowerCase());

history.unshift(city);

if(history.length > 5) history.pop();

localStorage.setItem("history", JSON.stringify(history));

}

function showHistory(){

let history = JSON.parse(localStorage.getItem("history")) || [];

if(history.length === 0) return;

historyBox.innerHTML = "";

history.forEach(city => {

const item = document.createElement("div");

item.textContent = city;

item.addEventListener("click", () => {

cityInput.value = city;
historyBox.style.display = "none";

handleSearch(city);

});

historyBox.appendChild(item);

});

historyBox.style.display = "block";
}

/* ===== SHOW HISTORY ON FOCUS ===== */
cityInput.addEventListener("focus", () => {

if(!cityInput.value){
showHistory();
}

});
clearHistoryBtn.addEventListener("click",()=>{

localStorage.removeItem("history");

historyBox.innerHTML = "";

historyBox.style.display = "none";

showToast("History cleared");

});
cityInput.addEventListener("focus",()=>{

cityInput.placeholder = "Try: London, Mumbai, Tokyo...";

});

cityInput.addEventListener("blur",()=>{

cityInput.placeholder = "Enter city name";

historyBox.style.display = "none";
suggestionsBox.style.display = "none";

});
cityInput.addEventListener("click",()=>{

cityInput.select();

});

/* ===== CLICK OUTSIDE CLOSE ===== */
document.addEventListener("click", (e) => {

if(!cityInput.contains(e.target)){
suggestionsBox.style.display = "none";
historyBox.style.display = "none";
}

});
window.addEventListener("load", () => {

cityInput.focus();

});