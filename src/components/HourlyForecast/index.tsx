import { FC, useEffect } from "react"
import { Typography, Box, SxProps, Theme } from "@mui/material"
import { getHourlyForecast } from "../../store/slices/weatherSlice"
import { useAppSelector, useAppDispatch } from "../../hook"
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
   const hourlyForecast = useAppSelector(
      (state) => state.weather.cityHourlyForecats
   )
   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(getHourlyForecast(cityId))
   }, [cityId, dispatch])

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
