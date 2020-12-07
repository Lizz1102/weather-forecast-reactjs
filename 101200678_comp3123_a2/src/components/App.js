import React, { useEffect, useState } from "react"
import { createMuiTheme, Container, ThemeProvider } from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"

import WeatherCard from "./WeatherCard"

export default function App() {
  const city = "Toronto"
  const error = "Error!"
  const [currentWeather, setCurrentWeather] = useState({})
  const [forecast, setForecast] = useState([])

  useEffect(() => {
    getWeather(city)
      .then(weather => {
        setCurrentWeather(weather)
      })
  }, [city]);

  useEffect(() => {
    getForecast(city)
      .then(data => {
        setForecast(data)
      })
  }, [city])

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      fontSize: 14,
      h5: {
        fontWeight: 600
      }
    }
  })

  if (
    (currentWeather && Object.keys(currentWeather).length) ||
    (forecast && Object.keys(forecast).length)
  ) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <WeatherCard
            city={city}
            currentWeather={currentWeather}
            forecast={forecast}
          />
        </Container>
      </ThemeProvider>
    )
  } else {
    return (
      <div>
        {error ? <p>{error}</p> : ""}
      </div>
    )
  }
}

function handleResponse(response) {
  if (response.ok) {
    return response.json()
  } else {
    throw new Error("Error: Location " + (response.statusText).toLowerCase())
  }
}

function getWeather(city) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/weather/?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
  )
    .then(res => handleResponse(res))
    .then(weather => {
      if (Object.entries(weather).length) {
        const mappedData = mapDataToWeatherInterface(weather)
        return mappedData
      }
    })
}

function getForecast(city) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/forecast/?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
  )
    .then(res => handleResponse(res))
    .then(result => {
      if (Object.entries(result).length) {
        const forecast = []
        for (let i = 0; i < result.list.length; i += 8) {
          forecast.push(mapDataToWeatherInterface(result.list[i + 4]))
        }
        return forecast
      }
    })
}

function mapDataToWeatherInterface(data) {
  const mappedWeatherData = {
    city: data.name,
    country: data.sys.country,
    date: data.dt * 1000,
    humidity: data.main.humidity,
    icon_id: data.weather[0].id,
    temperature: data.main.temp,
    description: data.weather[0].description,
    wind_speed: Math.round(data.wind.speed * 3.6), 
    condition: data.cod
  }
  
  if (data.dt_txt) {
    mappedWeatherData.dt_txt = data.dt_txt
  }

  if (data.weather[0].icon) {
    mappedWeatherData.icon = data.weather[0].icon
  }

  if (data.main.temp_min && data.main.temp_max) {
    mappedWeatherData.max = data.main.temp_max
    mappedWeatherData.min = data.main.temp_min
  }

  return mappedWeatherData
}
