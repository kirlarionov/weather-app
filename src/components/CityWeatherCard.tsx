import { FC, useEffect, useState, useCallback, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import {
   Paper,
   Typography,
   Box,
   IconButton,
   SxProps,
   Theme,
   Tooltip,
} from "@mui/material"
import UpdateIcon from "@mui/icons-material/Update"
import ClearIcon from "@mui/icons-material/Clear"
import moment from "moment"
import { tempFormat } from "../utils/temp-format"
import { getCityWeatherRequest } from "../services/weather/index"
import { useAppSelector, useAppDispatch } from "../hook"
import { City } from "../interface/city"
import { removeSavedCity } from "../store/slices/weatherSlice"

const paperStyles: SxProps<Theme> = {
   position: "relative",
   display: "inline-block",
   p: "10px",
   cursor: "pointer",
   ":hover": {
      background: "#dae4fb",
      transition: "all .3s",
   },
}

interface CityWeatherCardProps {
   key: number
   cityName: string
}

const CityWeatherCard: FC<CityWeatherCardProps> = ({ cityName }) => {
   const [cityWeather, setCityWeather] = useState<City | null>(null)

   const savedCityNames = useAppSelector(
      (state) => state.weather.savedCityNames
   )
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const getWeather = useCallback(() => {
      getCityWeatherRequest(cityName).then((data) => {
         setCityWeather(data)
         return data
      })
   }, [cityName])

   useEffect(() => {
      getWeather()
   }, [cityName, getWeather])

   if (!cityWeather) return null

   const cityPageUrl = `/cities/${cityWeather.name.toLocaleLowerCase()}`
   const updatedDate = moment().format("HH:mm:ss")
   const currentTemp = tempFormat(cityWeather.main.temp)

   const updateCityWeather = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      getWeather()
   }

   const deleteSavedCity = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      const updatedSavedCitiesList = savedCityNames.filter(
         (city) => city !== cityName
      )

      dispatch(removeSavedCity(updatedSavedCitiesList))
      localStorage.setItem(
         "savedCities",
         JSON.stringify(updatedSavedCitiesList)
      )
   }

   const openCityWeatherPage = () => {
      navigate(cityPageUrl)
   }

   return (
      <Paper sx={paperStyles} elevation={3} onClick={openCityWeatherPage}>
         <Box>
            <Typography color={"gray"}>{updatedDate}</Typography>
            <Typography variant="h5">
               {cityWeather.name}, {cityWeather.sys.country}
            </Typography>
            <Typography variant="h5">{currentTemp}</Typography>
            <Box sx={{ marginTop: "-20px" }}>
               <img
                  src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
                  alt={cityWeather.weather[0].description}
               />
            </Box>
         </Box>

         <Tooltip title="Update" arrow>
            <IconButton
               sx={{ position: "absolute", bottom: "0px", left: "0px" }}
               onClick={updateCityWeather}>
               <UpdateIcon />
            </IconButton>
         </Tooltip>
         <Tooltip title="Delete" arrow>
            <IconButton
               sx={{ position: "absolute", bottom: "0px", right: "0px" }}
               onClick={deleteSavedCity}>
               <ClearIcon />
            </IconButton>
         </Tooltip>
      </Paper>
   )
}

export default CityWeatherCard
