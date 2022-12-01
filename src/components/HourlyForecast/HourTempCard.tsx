import { FC } from "react"
import { Box, SxProps, Theme, Paper } from "@mui/material"
import moment from "moment"
import { tempFormat } from "../../utils/temp-format"
import { HourTemp } from "../../interface/hourly-forecast/hour-temp"

const hourTempCardStyle: SxProps<Theme> = {
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   justifyContent: "space-between",
   height: "240px",
   width: "110px",
   background: "white",
   fontSize: "18px",
}

interface HourTempCardProps {
   key: number
   hourTemp: HourTemp
}

const HourTempCard: FC<HourTempCardProps> = ({ hourTemp }) => {
   const time = moment(hourTemp.dt_txt).format("HH:mm")
   const temp = tempFormat(hourTemp.main.temp)

   const cardMargin = () => {
      const temp = Math.round(hourTemp.main.temp)
      return +temp * 3
   }

   const margin = cardMargin()

   return (
      <Box sx={hourTempCardStyle}>
         <Box mt="7px">{time}</Box>
         <Box mt="-20px">
            <img
               src={`http://openweathermap.org/img/wn/${hourTemp.weather[0].icon}@2x.png`}
               alt={hourTemp.weather[0].description}
            />
         </Box>

         <Paper
            sx={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               width: "100%",
               minHeight: "35px",
               backgroundColor: "yellow",
               borderBottom: "3px solid orange",
               marginBottom: `${margin}px`,
            }}>
            {temp}
         </Paper>
      </Box>
   )
}

export default HourTempCard
