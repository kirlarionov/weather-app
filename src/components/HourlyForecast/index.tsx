import { FC, useEffect, useState } from "react"
import { Typography, Box, SxProps, Theme } from "@mui/material"
import { getHourlyForecastRequest } from "../../services/weather"
import { CityHourlyForecats } from "../../interface/hourly-forecast/weather-all-hours"
import TempCard from "./HourTempCard"

const hourlyForecastStyle: SxProps<Theme> = {
   position: "relative",
   borderBottom: "3px solid gray",
   padding: "0px 30px",
}

const zeroDegreesStyle: SxProps<Theme> = {
   position: "absolute",
   bottom: "0px",
   left: "-18px",
   fontSize: "22px",
}

const HourlyForecast: FC<{ cityId: number }> = ({ cityId }) => {
   const [hourlyForecast, setHourlyForecast] =
      useState<CityHourlyForecats | null>(null)

   useEffect(() => {
      getHourlyForecastRequest(cityId).then((data) => setHourlyForecast(data))
   }, [cityId])

   if (!hourlyForecast) return null

   return (
      <Box sx={hourlyForecastStyle}>
         <Typography variant="h4" m={"40px"} textAlign="center">
            Hourly Forecast
         </Typography>

         <Box sx={{ display: "flex" }}>
            {hourlyForecast.list
               .filter((el, index) => index < 9)
               .map((hourTemp, index) => {
                  return <TempCard key={index} hourTemp={hourTemp} />
               })}
         </Box>

         <Box sx={zeroDegreesStyle}>0°C</Box>
      </Box>
   )
}

export default HourlyForecast
