import { FC } from "react"
import { Box, Typography } from "@mui/material"
import { useAppSelector } from "../hook"
import CityWeatherCard from "../components/CityWeatherCard"

const SavedCitiesList: FC = () => {
   const savedCities = useAppSelector((state) => state.weather.savedCityNames)

   return (
      <Box>
         <Typography variant="h5" m={"10px 0px 5px"}>
            Saved cities:
         </Typography>

         {savedCities.length ? (
            <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
               {savedCities?.map((cityName: string, index: number) => (
                  <CityWeatherCard key={index} cityName={cityName} />
               ))}
            </Box>
         ) : (
            <Typography color={"gray"}>
               To add the city, you need to find it and click on the &#9734;.
            </Typography>
         )}
      </Box>
   )
}

export default SavedCitiesList
