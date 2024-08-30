import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import WeatherDisplay from "./WeatherDisplay.jsx"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WeatherDisplay />
  </React.StrictMode>,
)
