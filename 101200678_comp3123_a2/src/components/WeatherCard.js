import React from "react"

import AppLayout from "./AppLayout"

import * as openWeatherIcons from "../icons"

export default function Weather(props) {
  const { currentWeather, forecast } = props
  if (currentWeather && forecast) {
    const prefix = "wi wi-"
    const icon = prefix + openWeatherIcons.default[currentWeather.icon_id].icon

    return (
      <div>
        <AppLayout
          currentWeather={currentWeather}
          forecast={forecast}
          icon={icon}
        />
      </div>
    )
  }
}
