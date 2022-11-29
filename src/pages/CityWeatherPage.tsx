import { FC, useEffect, useState, useCallback, MouseEvent } from "react"
import { useParams } from "react-router-dom"
import {
   Typography,
   Box,
   SxProps,
   Theme,
   Tooltip,
   IconButton,
} from "@mui/material"
import UpdateIcon from "@mui/icons-material/Update"
import SpeedIcon from "@mui/icons-material/Speed"
import WindPowerIcon from "@mui/icons-material/WindPower"
import { getCityWeatherRequest } from "../services/weather"
import { City } from "../interface/city"
import moment from "moment"
import { tempFormat } from "../utils/temp-format"
import BackToMainButton from "../components/BackToMainButton"
import HourlyForecast from "../components/HourlyForecast"

const cityWeatherPageStyle: SxProps<Theme> = {
   maxWidth: "1100px",
   minHeight: "100vh",
   margin: "0 auto",
   padding: "40px",
   fontFamily: "Roboto, sans-serif",
   backgroundColor: "#ebfbf0",
   paddingBottom: "250px",
}

const headerStyle: SxProps<Theme> = {
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   mb: "30px",
}

const timeAndUpdateBoxStyle: SxProps<Theme> = {
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
   gap: "6px",
}

const updateIconStyle: SxProps<Theme> = {
   ":hover": { transform: "scale(1.3)" },
   transition: "all .2s",
}

const contentBoxStyle: SxProps<Theme> = {
   display: "flex",
   fontSize: "18px",
   mb: "20px",
   p: "20px",
   position: "relative",
   backgroundColor: "white",
   borderRadius: "10px",
}

const currentTempStyle: SxProps<Theme> = {
   display: "flex",
   gap: "10px",
   alignItems: "center",
}

const CityWeatherPage: FC = () => {
   const [cityWeather, setCityWeather] = useState<City | null>(null)

   const { cityName } = useParams()
   const updatedDate = moment().format("MMMM DD, HH:mm:ss")

   const getWeather = useCallback(() => {
      getCityWeatherRequest(cityName).then((data) => {
         setCityWeather(data)
         return data
      })
   }, [cityName])

   useEffect(() => {
      getWeather()
   }, [getWeather])

   if (!cityWeather) return null

   const currentTemp = tempFormat(cityWeather.main.temp)
   const minTemp = tempFormat(cityWeather.main.temp_min)
   const maxTemp = tempFormat(cityWeather.main.temp_max)
   const feelsLikeTemp = tempFormat(cityWeather.main.feels_like)
   const sunriseTime = moment.unix(cityWeather.sys.sunrise).format("HH:mm")
   const sunsiteTime = moment.unix(cityWeather.sys.sunset).format("HH:mm")

   const updateCityWeather = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      getWeather()
   }

   return (
      <Box sx={cityWeatherPageStyle}>
         <Box sx={headerStyle}>
            <Typography variant="h3" sx={{ span: { color: "green" } }}>
               Weather in <span>{cityWeather?.name}</span>,{" "}
               {cityWeather?.sys.country}
            </Typography>
            <Box sx={timeAndUpdateBoxStyle}>
               <Typography sx={{ fontSize: "16px", color: "grayText" }}>
                  {updatedDate}
               </Typography>
               <Tooltip title="Update" placement="right" arrow>
                  <IconButton onClick={updateCityWeather}>
                     <UpdateIcon sx={updateIconStyle} />
                  </IconButton>
               </Tooltip>
            </Box>
         </Box>

         <Box sx={contentBoxStyle}>
            <Box sx={{ width: "50%" }}>
               <Box sx={currentTempStyle}>
                  <Typography variant="h5">Current Temp:</Typography>
                  <Typography variant="h4">{currentTemp}</Typography>
               </Box>
               <Typography fontSize={20} mb="15px">
                  Feels like: {feelsLikeTemp}
               </Typography>
               <Typography fontSize={20} mt="15px">
                  Min Temp: {minTemp}
               </Typography>
               <Typography fontSize={20} mb="15px">
                  Max Temp: {maxTemp}
               </Typography>
               <Typography fontSize={20} mt="10px">
                  Humidity: {cityWeather.main.humidity}%
               </Typography>
               <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                  <SpeedIcon />
                  <Typography fontSize={20}>
                     Pressure: {cityWeather.main.pressure}hPa
                  </Typography>
               </Box>
               <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                  <WindPowerIcon />
                  <Typography fontSize={20}>
                     Wind Speed: {cityWeather.wind.speed}m/s
                  </Typography>
               </Box>
            </Box>

            <Box sx={{ width: "50%" }}>
               <Box sx={{ display: "flex", alignItems: "center", mt: "-20px" }}>
                  <img
                     src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
                     alt={cityWeather.weather[0].description}
                  />
                  <Typography
                     fontSize={20}
                     sx={{ textTransform: "capitalize" }}>
                     {cityWeather.weather[0].description}
                  </Typography>
               </Box>
               <Typography fontSize={20}>Sunrise: {sunriseTime}</Typography>
               <Typography fontSize={20}>Sunset: {sunsiteTime}</Typography>
            </Box>
            <BackToMainButton bottom="20px" right="20px" />
         </Box>

         <HourlyForecast cityId={cityWeather.id} />
      </Box>
   )
}

export default CityWeatherPage
