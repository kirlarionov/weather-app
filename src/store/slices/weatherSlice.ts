import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import {
   getCityWeatherRequest,
   getHourlyForecastRequest,
} from "../../services/weather/index"
import { City } from "../../interface/city"
import { CityHourlyForecats } from "../../interface/hourly-forecast/weather-all-hours"

interface CitiesState {
   currentCity: City | null
   searchError: boolean
   savedCityNames: string[]
   cityHourlyForecats: CityHourlyForecats | null
}

export const getCurrentCityInfo = createAsyncThunk(
   "weather/getCurrentCityInfo",
   async (searchCity: string | undefined) => {
      return await getCityWeatherRequest(searchCity)
   }
)

export const getHourlyForecast = createAsyncThunk(
   "weather/getHourlyForecast",
   async (cityId: number | undefined) => {
      return await getHourlyForecastRequest(cityId)
   }
)

const initialState: CitiesState = {
   currentCity: null,
   searchError: false,
   savedCityNames: [],
   cityHourlyForecats: null,
}

export const weatherSlice = createSlice({
   name: "weather",
   initialState,
   reducers: {
      getSavedCityNames(state, action: PayloadAction<string[]>) {
         state.savedCityNames = action.payload
      },
      saveCity(state, action: PayloadAction<string>) {
         state.savedCityNames.push(action.payload)
      },
      removeSavedCity(state, action: PayloadAction<string[]>) {
         state.savedCityNames = action.payload
      },
      searchErrorIsFalse(state) {
         state.searchError = false
      },
   },
   extraReducers: (builder) => {
      builder.addCase(
         getCurrentCityInfo.fulfilled,
         (state: CitiesState, action: PayloadAction<City>) => {
            state.searchError = false
            state.currentCity = action.payload
         }
      )
      builder.addCase(getCurrentCityInfo.rejected, (state: CitiesState) => {
         state.searchError = true
      })
      builder.addCase(
         getHourlyForecast.fulfilled,
         (state: CitiesState, action: PayloadAction<CityHourlyForecats>) => {
            state.cityHourlyForecats = action.payload
         }
      )
   },
})

export const {
   getSavedCityNames,
   saveCity,
   removeSavedCity,
   searchErrorIsFalse,
} = weatherSlice.actions

export default weatherSlice.reducer
