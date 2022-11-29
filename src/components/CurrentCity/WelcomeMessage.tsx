import { FC } from "react"
import { Box, Typography, SxProps, Theme } from "@mui/material"

const welcomeMessageStyle: SxProps<Theme> = {
   height: "262px",
   p: "20px",
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   justifyContent: "center",
}

const WelcomeMessage: FC = () => (
   <Box sx={welcomeMessageStyle}>
      <Box>
         <Typography variant="h4">Welcome to the Weather App</Typography>
         <Typography variant="h4">Enjoy it's use and good luck! 🙂</Typography>
      </Box>
   </Box>
)

export default WelcomeMessage
