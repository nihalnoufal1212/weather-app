# 🌦️ Weather Dashboard (Vanilla JavaScript)

A modern **Weather Dashboard Web App** built using **HTML, CSS, and Vanilla JavaScript**, featuring real-time weather, hourly forecasts, autosuggest search, history tracking, and UI customization.

This project is being developed step-by-step into a **portfolio-level frontend application**.

---

## 🚀 Features

### 🌍 Current Weather

* Search weather by city name
* Displays:

  * Temperature
  * Feels-like temperature
  * Wind speed
  * Humidity
  * Visibility
  * Weather condition
  * Weather icon
  * City name
* Sunrise time display
* Sunset time display
* Last updated time display
* Tooltip hint for search button
* Glassmorphism weather card styling
* Hover animation for weather card
* Smooth fade-in animation for weather card
- Maximum width constraint for cleaner card layout
- Subtle glass-style border for weather card
- Improved mobile responsiveness for weather card
- Minimum temperature display
- Maximum temperature display

---

### 📍 Location Weather

* Fetch weather using browser **Geolocation API**
* Displays current location weather instantly
* Tooltip hint for location button

---

### ⏱️ Hourly Forecast ⭐

* Shows next **5 upcoming forecast time slots**
* Displays:

  * Time
  * Temperature
  * Weather icon
* Uses OpenWeather **forecast API**
* Hover animation for forecast cards
* Interactive pointer cursor for forecast cards
- Enhanced smooth hover animation for forecast cards
- Smooth fade-in animation for forecast cards
- Improved spacing between forecast cards
- Smooth horizontal scrolling for forecast cards
- Prevented accidental dragging of forecast weather icons
- Center-aligned forecast card content
- Subtle glass-style border for forecast cards
- Hover shadow effect for forecast cards
- Rounded weather icons in forecast cards

---

### 🔎 Autosuggest Search

* Shows city suggestions while typing
* Uses OpenWeather **Geolocation API**
* Click suggestion to auto-search instantly
* Press Enter to search instantly
* Suggestions automatically close after search
* Displays message when no suggestions are found
* Clears input after successful search
* Search input automatically focused on page load
* Dynamic placeholder text on input focus
* Auto-selects search text on input click
* Automatically removes extra spaces from searches
* Automatically closes dropdowns when input loses focus
- Subtle focus animation for search input
- Focus glow effect for search input
- Glassmorphism styling for suggestion and history dropdowns
- Smooth hover transition for dropdown items
- Pointer cursor for suggestion and history items
- Improved dropdown item spacing

---

### 🕘 Search History Dropdown

* Stores recent searches using **localStorage**
* Shows when input is empty
* Click previous searches to reuse instantly
* Automatically formats city names for cleaner history display
* Clear search history button

---

### 🌡️ Temperature Unit Toggle

* Switch between:

  * Celsius (°C)
  * Fahrenheit (°F)
* Preference saved using **localStorage**
* Tooltip hint for temperature toggle button

---

### 🌙 Dark Mode Toggle

* Switch between light and dark themes
* Automatically saves user preference
* Persistent after reload
* Animated gradient background
* Smooth background transition during theme changes
- Button hover shadow effect

---

### 🔔 Toast Notification System

Custom popup alerts for:

* Empty input
* Invalid API key
* City not found
* Network errors
* Suggestion errors

---

### ⚡ Smart API Handling

* Supports dual API key system:

  * `apikey.js` (secure local file)
  * Fallback key inside `script.js`
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

```plaintext
weather-dashboard/
│
├── index.html
├── style.css
├── script.js
├── apikey.js   (ignored from GitHub)
├── .gitignore
└── README.md
```

---

## 🔐 API Key Handling

The API key is **not exposed on GitHub**.

### Method Used

* Stored in `apikey.js`
* Ignored using `.gitignore`

### Development Fallback

* A backup API key is used inside `script.js` to avoid breaking the app locally

---

## 📡 API Endpoints

### Current Weather

https://api.openweathermap.org/data/2.5/weather

### Forecast Data

https://api.openweathermap.org/data/2.5/forecast

### Geolocation (Autosuggest)

https://api.openweathermap.org/geo/1.0/direct

---

## ▶️ How to Run Locally

1. Clone the repository

```bash
git clone <your-repo-link>
```

2. Create file:

```js
apikey.js
```

3. Add your API key:

```js
const API_KEY = "YOUR_API_KEY_HERE";
```

4. Open:

```plaintext
index.html
```

---

## 📈 Learning Outcomes

This project demonstrates:

* API integration and data handling
* Async JavaScript programming
* Time-series forecast processing
* Building dynamic UI using DOM
* Implementing search systems (autosuggest + history)
* UI state management with localStorage
* Theme persistence (dark mode)
* Secure API handling in frontend projects
* Building scalable frontend architecture

---

## 🔮 Future Improvements

* Improved dropdown UI (animations + styling)
* Weather-based dynamic background
* Keyboard navigation (arrow keys for suggestions)
* Deploy on Netlify / Vercel
* Add screenshots to README
* Convert project to React

---

## 👨‍💻 Author

**Nihal Noufal**

Frontend developer in progress, building real-world projects step-by-step 🚀
