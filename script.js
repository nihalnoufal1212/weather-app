const apiKey="a75a946c55ba8911eae8e56757138a16";

const cityInput=document.getElementById("city");
const searchBtn=document.getElementById("searchBtn");

let isCelsius=true;


/* TOAST FUNCTION */

function showToast(message){

const toast=document.getElementById("toast");

toast.innerText=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}


/* LOADER */

function showLoader(){

document.getElementById("status").innerHTML=
"<div class='loader'></div>";

}

function hideLoader(){

document.getElementById("status").innerHTML="";

}


/* EVENT LISTENERS */

searchBtn.addEventListener("click",getWeather);

cityInput.addEventListener("keypress",function(e){

if(e.key==="Enter") getWeather();

});

cityInput.addEventListener("input",handleInput);


/* UNIT TOGGLE */

document.getElementById("unitToggle")

.addEventListener("click",()=>{

isCelsius=!isCelsius;

getWeather();

});


/* HANDLE INPUT FIELD */

function handleInput(){

const value=cityInput.value.trim();

if(value===""){

showRecentSearches();

document.getElementById("suggestions").innerHTML="";

}

else{

suggestCities();

document.getElementById("recentSearches").innerHTML="";

}

}


/* WEATHER FETCH */

async function getWeather(){

const city=cityInput.value.trim();

if(!city){

showToast("Enter city name first");

return;

}

showLoader();

try{

const response=await fetch(

`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${isCelsius?"metric":"imperial"}`
);

const data=await response.json();

hideLoader();

if(data.cod===401){

showToast("Invalid API key");

return;

}

if(data.cod===404){

showToast("City not found");

return;

}

displayWeather(data);

saveRecent(city);

}

catch{

hideLoader();

showToast("Network error");

}

}


/* DISPLAY WEATHER */

function displayWeather(data){

document.getElementById("weatherBox").classList.remove("hidden");

document.getElementById("cityName").innerText=data.name;

document.getElementById("temp").innerText=

Math.round(data.main.temp)+(isCelsius?"°C":"°F");

document.getElementById("condition").innerText=

data.weather[0].main;

document.getElementById("icon").src=

`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

changeBackground(data.weather[0].main);

}


/* BACKGROUND */

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


/* AUTOSUGGEST */

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


/* SELECT CITY */

function selectCity(city){

cityInput.value=city;

document.getElementById("suggestions").innerHTML="";

getWeather();

}


/* LOCATION WEATHER */

function getLocationWeather(){

navigator.geolocation.getCurrentPosition(async position=>{

const {latitude,longitude}=position.coords;

showLoader();

try{

const response=await fetch(

`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${isCelsius?"metric":"imperial"}`
);

const data=await response.json();

hideLoader();

displayWeather(data);

}

catch{

hideLoader();

showToast("Location fetch failed");

}

});

}


/* RECENT SEARCH STORAGE */

function saveRecent(city){

let recent=JSON.parse(localStorage.getItem("recentCities"))||[];

recent=recent.filter(item=>item!==city);

recent.unshift(city);

if(recent.length>5) recent.pop();

localStorage.setItem("recentCities",JSON.stringify(recent));

}


/* SHOW RECENT SEARCHES */

function showRecentSearches(){

let recent=JSON.parse(localStorage.getItem("recentCities"))||[];

let html="";

recent.forEach(city=>{

html+=

`<div class="recentItem"

onclick="selectCity('${city}')">

${city}

</div>`;

});

document.getElementById("recentSearches").innerHTML=html;

}


/* LOAD LAST SEARCH */

window.onload=()=>{

showRecentSearches();

};