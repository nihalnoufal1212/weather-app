const apiKey = "YOUR_API_KEY_HERE";

const cityInput = document.getElementById("city");

const searchBtn = document.getElementById("searchBtn");


searchBtn.addEventListener("click", getWeather);


cityInput.addEventListener("keypress", function(e){

if(e.key==="Enter")

getWeather();

});


cityInput.addEventListener("input", suggestCities);



async function getWeather(){

const city = cityInput.value.trim();


if(!city) return;


document.getElementById("status").innerHTML = "Loading...";


try{

const response = await fetch(

`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`

);


const data = await response.json();


if(data.cod !== 200){

document.getElementById("status").innerHTML = "City not found";

return;

}


displayWeather(data);

}

catch{

document.getElementById("status").innerHTML = "Network error";

}

}



function displayWeather(data){

document.getElementById("weatherBox").classList.remove("hidden");


document.getElementById("status").innerHTML = "";


document.getElementById("cityName").innerHTML = data.name;


document.getElementById("temp").innerHTML =

Math.round(data.main.temp) + "°C";


document.getElementById("condition").innerHTML =

data.weather[0].main;


document.getElementById("icon").src =

`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

}



/*
CITY AUTOSUGGEST FEATURE
*/

async function suggestCities(){

let city = cityInput.value;


if(city.length < 1){

document.getElementById("suggestions").innerHTML="";

return;

}


let response = await fetch(

`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`

);


let data = await response.json();


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



function selectCity(city){

cityInput.value = city;

document.getElementById("suggestions").innerHTML="";

getWeather();

}