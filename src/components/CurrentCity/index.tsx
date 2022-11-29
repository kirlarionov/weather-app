import { FC, useState, useEffect, MouseEvent } from "react"
import { NavLink } from "react-router-dom"
import {
   Box,
   Typography,
   IconButton,
   Tooltip,
   Button,
   SxProps,
   Theme,
} from "@mui/material"
import UpdateIcon from "@mui/icons-material/Update"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import StarIcon from "@mui/icons-material/Star"
import moment from "moment"
import { tempFormat } from "../../utils/temp-format"
import { useAppSelector, useAppDispatch } from "../../hook"
import {
   getCurrentCityInfo,
   saveCity as addCity,
} from "../../store/slices/weatherSlice"
import { getSavedCities } from "../../utils/get-saved-cities"
import { getCityWeatherRequest } from "../../services/weather"
import WelcomeMessage from "./WelcomeMessage"

const currentCityStyle: SxProps<Theme> = {
   display: "inline-block",
   position: "relative",
   m: "15px 0px",
   p: "30px",
   backgroundColor: "white",
   borderRadius: "10px",
   minHeight: "232px",
}

const tempAndImgStyle: SxProps<Theme> = {
   display: "flex",
   alignItems: "center",
   mb: "12px",
}

const starIconStyle: SxProps<Theme> = {
   color: "#edd415",
   height: "32px",
   width: "32px",
   ":hover": { transform: "scale(1.3)" },
   transition: "all .2s",
}

const CurrentCity: FC = () => {
   const [saved, setSaved] = useState(false)

   const city = useAppSelector((state) => state.weather.currentCity)
   const savedCities = useAppSelector((state) => state.weather.savedCityNames)
   const dispatch = useAppDispatch()
   const localStorageCities = getSavedCities()

   useEffect(() => {
      if (city && localStorageCities?.includes(city.name)) {
         setSaved(true)
      } else setSaved(false)
   }, [city, localStorageCities])

   if (!city) return <WelcomeMessage />

   const cityPageUrl = `/cities/${city.name.toLocaleLowerCase()}`
   const updatedDate = moment().format("MMMM DD, HH:mm:ss")
   const currentTemp = tempFormat(city.main.temp)
   const feelsLikeTemp = tempFormat(city.main.feels_like)

   const saveCity = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!localStorageCities?.length) {
         const cityName = JSON.stringify([city.name])
         dispatch(addCity(city.name))
         localStorage.setItem("savedCities", cityName)
      }

      if (localStorageCities?.length) {
         dispatch(addCity(city.name))
         const cities = JSON.stringify([...savedCities, city.name])
         localStorage.setItem("savedCities", cities)
      }
   }

   const updateCurrentCity = async (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      return await getCityWeatherRequest(city.name).then((data) =>
         dispatch(getCurrentCityInfo(data))
      )
   }

   return (
      <Box sx={currentCityStyle}>
         <Typography>{updatedDate}</Typography>
         <Box sx={{ display: "flex", alignItems: "baseline", gap: "7px" }}>
            <Typography variant="h3">{city.name}</Typography>
            <Typography variant="h5">({city.sys.country})</Typography>
         </Box>
         <Box sx={tempAndImgStyle}>
            <Typography variant="h4">{currentTemp}</Typography>
            <Box sx={{ marginTop: "-15px" }}>
               <img
                  src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                  alt={city.weather[0].description}
               />
            </Box>
         </Box>
         <Typography variant="subtitle2" m={"-30px 0px 15px"}>
            Feels like {feelsLikeTemp}, {city.weather[0].description}
         </Typography>

         <NavLink to={cityPageUrl}>
            <Button
               endIcon={<ChevronRightIcon />}
               sx={{ position: "absolute", bottom: "6px", right: "6px" }}>
               MORE INFO
            </Button>
         </NavLink>
         <Tooltip title="Update" placement="right" arrow>
            <IconButton
               sx={{ position: "absolute", bottom: "2px", left: "2px" }}
               onClick={updateCurrentCity}>
               <UpdateIcon />
            </IconButton>
         </Tooltip>
         <Tooltip title="Save city" arrow>
            <IconButton
               sx={{ position: "absolute", top: "3px", right: "3px" }}
               onClick={saveCity}
               disabled={saved}>
               {saved ? (
                  <StarIcon sx={starIconStyle} />
               ) : (
                  <StarBorderIcon sx={starIconStyle} />
               )}
            </IconButton>
         </Tooltip>
      </Box>
   )
}

export default CurrentCity
