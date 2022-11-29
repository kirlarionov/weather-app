import axios from "axios"
import { WEATHER_API, API_KEY } from "./config"

export const getCityWeatherRequest = async (searchCity: string | undefined) => {
   const response = await axios.get(
      `${WEATHER_API}/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
   )
   return response.data
}

export const getHourlyForecastRequest = async (cityId: number | undefined) => {
   const response = await axios.get(
      `${WEATHER_API}/data/2.5/forecast?id=${cityId}&appid=${API_KEY}&units=metric`
   )
   return response.data
}