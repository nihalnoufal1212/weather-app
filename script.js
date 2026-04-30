const apiKey = "YOUR_API_KEY_HERE";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

let isCelsius = true;


/*
TOAST NOTIFICATION FUNCTION
*/

function showToast(message){

const toast=document.getElementById("toast");

toast.innerText=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}


/*
CHECK API KEY
*/

if(apiKey==="YOUR_API_KEY_HERE"){

showToast("Please add your OpenWeather API key inside script.js");

}


/*
EVENT LISTENERS
*/

searchBtn.addEventListener("click",getWeather);

cityInput.addEventListener("keypress",function(e){

if(e.key==="Enter")

getWeather();

});

cityInput.addEventListener("input",suggestCities);


document.getElementById("unitToggle")

.addEventListener("click",()=>{

isCelsius=!isCelsius;

getWeather();

});


/*
MAIN WEATHER FUNCTION
*/

async function getWeather(){

const city=cityInput.value.trim();

if(!city){

showToast("Enter a city name first");

return;

}

try{

const response=await fetch(

`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${isCelsius?"metric":"imperial"}`

);

const data=await response.json();


if(data.cod===401){

showToast("Invalid API key");

return;

}


if(data.cod===404){

showToast("City not found");

return;

}


displayWeather(data);

localStorage.setItem("lastCity",city);

}

catch{

showToast("Network error");

}

}


/*
DISPLAY WEATHER
*/

function displayWeather(data){

document.getElementById("weatherBox").classList.remove("hidden");

document.getElementById("cityName").innerHTML=data.name;

document.getElementById("temp").innerHTML=

Math.round(data.main.temp)+(isCelsius?"°C":"°F");

document.getElementById("condition").innerHTML=

data.weather[0].main;

document.getElementById("icon").src=

`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

changeBackground(data.weather[0].main);

}


/*
BACKGROUND CHANGE
*/

function changeBackground(condition){

if(condition.includes("Cloud"))

document.body.style.background="#90a4ae";

else if(condition.includes("Rain"))

document.body.style.background="#4fc3f7";

else if(condition.includes("Clear"))

document.body.style.background="#ffd54f";

else

document.body.style.background="#81d4fa";

}


/*
CITY AUTOSUGGEST
*/

async function suggestCities(){

let city=cityInput.value;

if(city.length<1){

document.getElementById("suggestions").innerHTML="";

return;

}


let response=await fetch(

`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`

);


let data=await response.json();


let html="";


data.forEach(place=>{

html+=

`<div class="suggestion"

onclick="selectCity('${place.name}')">

${place.name}, ${place.country}

</div>`;

});


document.getElementById("suggestions").innerHTML=html;

}


/*
SELECT CITY
*/

function selectCity(city){

cityInput.value=city;

document.getElementById("suggestions").innerHTML="";

getWeather();

}


/*
LOCATION WEATHER FIXED
*/

function getLocationWeather(){

navigator.geolocation.getCurrentPosition(async position=>{

const {latitude,longitude}=position.coords;

try{

const response=await fetch(

`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${isCelsius?"metric":"imperial"}`

);

const data=await response.json();


if(data.cod===401){

showToast("Invalid API key");

return;

}


displayWeather(data);

}

catch{

showToast("Unable to fetch location weather");

}

});

}


/*
LOAD LAST SEARCH
*/

window.onload=()=>{

const savedCity=localStorage.getItem("lastCity");

if(savedCity){

cityInput.value=savedCity;

getWeather();

}

};