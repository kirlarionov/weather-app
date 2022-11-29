import { FC, useEffect } from "react"
import { Box, SxProps, Theme } from "@mui/material"
import CurrentCity from "../components/CurrentCity"
import { getSavedCities } from "../utils/get-saved-cities"
import { useAppDispatch } from "../hook"
import { getSavedCityNames } from "../store/slices/weatherSlice"
import SavedCitiesList from "../components/SavedCitiesList"
import Header from "../components/Header"

const mainPageStyle: SxProps<Theme> = {
   maxWidth: "990px",
   minHeight: "100vh",
   margin: "0 auto",
   padding: "40px",
   fontFamily: "Roboto, sans-serif",
   backgroundColor: "#f2f5fa",
}

const MainPage: FC = () => {
   const dispatch = useAppDispatch()

   useEffect(() => {
      const getLocalStorageCities = getSavedCities()

      if (getLocalStorageCities) {
         dispatch(getSavedCityNames(getLocalStorageCities))
      }
   }, [dispatch])

   return (
      <Box sx={mainPageStyle}>
         <Header />
         <CurrentCity />
         <SavedCitiesList />
      </Box>
   )
}

export default MainPage
