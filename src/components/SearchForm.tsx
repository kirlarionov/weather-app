import { FC, ChangeEvent, FormEvent, useState } from "react"
import { Box, Paper, InputBase, Button, SxProps, Theme } from "@mui/material"
import { getCityWeatherRequest } from "../services/weather"
import { useAppDispatch } from "../hook"
import { getCurrentCityInfo } from "../store/slices/weatherSlice"

const errorMessageStyles: SxProps<Theme> = {
   position: "absolute",
   top: "-20px",
   left: "5px",
   color: "red",
   fontSize: "16px",
}

const paperStyles: SxProps<Theme> = {
   padding: "3px 10px",
   display: "flex",
   alignItems: "center",
   width: 400,
   position: "relative",
}

const SearchForm: FC = () => {
   const [searchCity, setSearchCity] = useState("")
   const [searchError, setSearchError] = useState(false)
   const [emptySearchInput, setEmptySearchInput] = useState(false)

   const dispatch = useAppDispatch()

   const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchCity(e.target.value)
   }

   const clearingSearchInput = () => {
      setSearchError(false)
      setEmptySearchInput(false)
   }

   const getCityWeather = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (searchCity) {
         return await getCityWeatherRequest(searchCity)
            .then((data) => dispatch(getCurrentCityInfo(data)))
            .then(() => setSearchCity(""))
            .catch(() => {
               setSearchError(true)
               setInterval(() => setSearchError(false), 4000)
            })
      } else {
         setEmptySearchInput(true)
         setInterval(() => setEmptySearchInput(false), 4000)
      }
   }

   return (
      <Paper
         sx={paperStyles}
         component="form"
         elevation={4}
         onSubmit={getCityWeather}>
         {(searchError || emptySearchInput) && (
            <Box sx={errorMessageStyles}>
               {searchError
                  ? "City not found"
                  : "Please enter a city to search"}
            </Box>
         )}
         <InputBase
            sx={{ fontSize: "18px", width: "80%" }}
            placeholder="Search city..."
            autoComplete="off"
            value={searchCity}
            onChange={handleInputValue}
            onFocus={clearingSearchInput}
         />
         <Button variant="contained" type="submit">
            SEARCH
         </Button>
      </Paper>
   )
}

export default SearchForm
