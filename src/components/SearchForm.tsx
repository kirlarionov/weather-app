import { FC, ChangeEvent, FormEvent, useState, useEffect } from "react"
import { Box, Paper, InputBase, Button, SxProps, Theme } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../hook"
import {
   getCurrentCityInfo,
   searchErrorIsFalse,
} from "../store/slices/weatherSlice"

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
   const [emptySearchInput, setEmptySearchInput] = useState(false)

   const searchError: boolean = useAppSelector(
      (state) => state.weather.searchError
   )
   const dispatch = useAppDispatch()

   const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchCity(e.target.value)
   }

   const clearingSearchInput = () => {
      dispatch(searchErrorIsFalse())
      setEmptySearchInput(false)
   }

   useEffect(() => {
      if (searchError) {
         setInterval(() => dispatch(searchErrorIsFalse()), 3000)
      }
   }, [dispatch, searchError])

   const getCityWeather = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (searchCity) {
         return await dispatch(getCurrentCityInfo(searchCity)).then(() =>
            setSearchCity("")
         )
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
