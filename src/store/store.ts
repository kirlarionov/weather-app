import { configureStore } from "@reduxjs/toolkit"
import weatherReaducer from "./slices/weatherSlice"

const store = configureStore({
   reducer: {
      weather: weatherReaducer,
   },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
