import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { City } from "../../interface/city"

interface CitiesState {
   currentCity: City | null
   savedCityNames: string[]
}

const initialState: CitiesState = {
   currentCity: null,
   savedCityNames: [],
}

export const weatherSlice = createSlice({
   name: "weather",
   initialState,
   reducers: {
      getCurrentCityInfo(state, action: PayloadAction<City>) {
         state.currentCity = action.payload
      },
      getSavedCityNames(state, action: PayloadAction<string[]>) {
         state.savedCityNames = action.payload
      },
      saveCity(state, action: PayloadAction<string>) {
         state.savedCityNames.push(action.payload)
      },
      removeSavedCity(state, action: PayloadAction<string[]>) {
         state.savedCityNames = action.payload
      },
   },
})

export const {
   getCurrentCityInfo,
   getSavedCityNames,
   saveCity,
   removeSavedCity,
} = weatherSlice.actions

export default weatherSlice.reducer
