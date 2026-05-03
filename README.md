# 🌦️ Weather Dashboard (Vanilla JavaScript Project)

A modern **Weather Dashboard Web App** built using **HTML, CSS, and Vanilla JavaScript** that displays real-time weather information along with an hourly forecast preview using the OpenWeather API.

This project is being upgraded step-by-step into a **portfolio-level frontend dashboard application** by adding one feature at a time.

---

## 🚀 Features

### Current Weather

* Search weather by city name
* Detect weather using current location (Geolocation API)
* Displays:

  * Temperature
  * Weather condition
  * Weather icon
  * City name

### Hourly Forecast (Latest Upgrade ⭐)

* Shows next **5 upcoming forecast time slots**
* Displays:

  * Time
  * Weather icon
  * Temperature
* Uses OpenWeather **5-day / 3-hour forecast API**

### User Experience Enhancements

* Custom toast popup notifications
* Input validation handling
* Network error handling
* City-not-found handling
* Clean responsive layout
* Smooth UI updates without page refresh

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* OpenWeatherMap API
* Geolocation API
* Fetch API
* Async / Await
* DOM Manipulation

---

## 📦 Project Structure

weather-dashboard/
│
├── index.html
├── style.css
├── script.js
├── apikey.js (ignored from GitHub)
└── README.md

---

## 🔐 API Key Security

The API key is stored in:

apikey.js

This file is excluded from version control using:

.gitignore

Example:

const API_KEY = "YOUR_API_KEY_HERE";

---

## 📡 API Used

OpenWeather API

Endpoints:

Current weather:
https://api.openweathermap.org/data/2.5/weather

Forecast data:
https://api.openweathermap.org/data/2.5/forecast

---

## ▶️ How to Run Locally

1. Clone repository

git clone <your-repo-link>

2. Create file:

apikey.js

3. Add your API key:

const API_KEY = "YOUR_API_KEY_HERE";

4. Open:

index.html

---

## 📈 Learning Goals of This Project

This project demonstrates:

* Working with REST APIs
* Async JavaScript programming
* Time-series forecast parsing
* UI rendering using DOM manipulation
* Error handling in frontend apps
* Secure API key handling in frontend projects
* Building dashboard-style layouts without frameworks

---

## 🔮 Planned Improvements

Upcoming upgrades:

* Dark mode toggle
* Search history dropdown
* Weather-based dynamic background
* Deployment on Netlify / Vercel
* README screenshots
* React version upgrade

---

## 👨‍💻 Author

Built by Nihal Noufal

Frontend learning project focused on building **internship-level JavaScript dashboard applications**
