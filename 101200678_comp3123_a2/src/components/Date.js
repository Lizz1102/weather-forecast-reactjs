import React from "react"
import dayjs from "dayjs"

export default function Date(props) {
  const { currentWeather } = props
  const date = dayjs().isValid(currentWeather.date) ? currentWeather.date : ""
  return (
    <>
      <span>
        {dayjs(date).format("dddd")}, {dayjs(date).format("h:mm")}{" "}
        {dayjs(date).format("A")}
      </span>
    </>
  )
}
