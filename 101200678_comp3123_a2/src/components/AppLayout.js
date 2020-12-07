import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardContent, CardHeader, Divider, Typography, Grid } from "@material-ui/core"

import Forecast from "./FiveDayForecast"
import Date from "./Date"

const useStyles = makeStyles(theme => ({
  atmospheric: {
    fontSize: "28px",
    padding: "5px"
  },
  card: {
    minWidth: 600,
    minHeight: 900,
    backgroundColor:"#cce6ff",
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  layout: {
    marginTop: "50px"
  },
  wi: {
    color: "#ff6600"
  }
}))

export default function AppLayout(props) {
  const classes = useStyles()
  const { currentWeather, forecast, icon } = props

  return (
    <div className={classes.layout}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <WeatherCard
            currentWeather={currentWeather}
            forecast={forecast}
            icon={icon}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const WeatherCard = props => {
  const classes = useStyles()
  const { currentWeather, forecast } = props

  return (
    <Card className={classes.card}>
      <CardHeader style={{ color:"ff6600" }}
        title={"Location: " + currentWeather.city + ", " + currentWeather.country}
        subheader={<Date currentWeather={currentWeather} />}
      />
      <CardContent>
        <Typography
          variant="h2"
          className="big-temp"
          color="textPrimary"
          component="h2"
          style={{ fontFamily: "Georgia", paddingTop: "30px" }}>
          {Math.round(currentWeather.temperature)}&deg;C, { currentWeather.description}
        </Typography>
        <Typography
          variant="subtitle2"
          className="atmospheric-conditions"
          color="textSecondary"
          gutterBottom
          style={{ paddingTop: "5px", paddingBottom: "40px", paddingLeft: "90px" }}>         
          {currentWeather.wind_speed} km/h Winds{" "}
          {currentWeather.humidity}% Humidity
        </Typography>
        <Divider variant="fullWidth" />
        <Forecast forecast={forecast} />
      </CardContent>
    </Card>
  )
}
