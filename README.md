# 🌦️ Weather Dashboard (Vanilla JavaScript)

A modern **Weather Dashboard Web App** built using **HTML, CSS, and Vanilla JavaScript**, featuring real-time weather data, hourly forecast, theme switching, and unit conversion.

This project is being developed step-by-step into a **portfolio-level frontend application**.

---

## 🚀 Features

### 🌍 Current Weather

* Search weather by city
* Get weather using current location (Geolocation API)
* Displays:

  * Temperature
  * Weather condition
  * Weather icon
  * City name

---

### ⏱️ Hourly Forecast ⭐

* Shows next **5 forecast time slots**
* Displays:

  * Time
  * Temperature
  * Weather icon
* Uses OpenWeather **forecast API**

---

### 🌡️ Temperature Unit Toggle

* Switch between:

  * Celsius (°C)
  * Fahrenheit (°F)
* Preference saved using **localStorage**

---

### 🌙 Dark Mode Toggle

* Toggle between light and dark themes
* Automatically saves user preference
* Persistent after page reload

---

### 🔔 Toast Notification System

Custom popup alerts for:

* Empty input
* Invalid API key
* City not found
* Network errors

---

### 📍 Location Weather

* Uses browser **Geolocation API**
* Fetches weather based on user location

---

### ⚡ Smart API Handling

* Uses **fallback API key system**
* Supports:

  * `apikey.js` (secure local file)
  * fallback key inside `script.js`
* Prevents app from breaking during development

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* OpenWeatherMap API
* Fetch API
* Async / Await
* DOM Manipulation
* LocalStorage
* Geolocation API

---

## 📦 Project Structure

```
weather-dashboard/
│
├── index.html
├── style.css
├── script.js
├── apikey.js   (ignored in GitHub)
├── .gitignore
└── README.md
```

---

## 🔐 API Key Handling

The API key is **not exposed on GitHub**.

### Method used:

* Stored in `apikey.js`
* Ignored using `.gitignore`

### Optional fallback:

A local API key is used inside `script.js` for development.

---

## 📡 API Endpoints

### Current Weather:

https://api.openweathermap.org/data/2.5/weather

### Forecast Data:

https://api.openweathermap.org/data/2.5/forecast

---

## ▶️ How to Run Locally

1. Clone the repository

```
git clone <your-repo-link>
```

2. Create a file:

```
apikey.js
```

3. Add your API key:

```
const API_KEY = "YOUR_API_KEY_HERE";
```

4. Open:

```
index.html
```

---

## 📈 Learning Outcomes

This project demonstrates:

* Working with real-world APIs
* Handling asynchronous data
* Building dynamic UI using DOM
* Managing application state
* Creating reusable UI components
* Implementing theme persistence
* Secure handling of API keys in frontend projects
* Time-series forecast processing

---

## 🔮 Future Improvements

* Search history dropdown (clickable)
* Weather-based background animations
* Deploy on Netlify / Vercel
* Add screenshots to README
* Convert project to React

---

## 👨‍💻 Author

**Nihal Noufal**

Frontend developer in progress, building real-world projects step-by-step 🚀
