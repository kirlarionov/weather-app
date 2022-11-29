import { FC } from "react"
import { Typography, Box, SxProps, Theme } from "@mui/material"

const appLogoStyle: SxProps<Theme> = {
   position: "absolute",
   backgroundColor: "#c3c7ce",
   padding: "15px",
   borderRadius: "10px 0px 0px 10px",
}

interface LogoProps {
   top: string
   right: string
}

const Logo: FC<LogoProps> = ({ top, right }) => {
   return (
      <Box sx={{ ...appLogoStyle, top, right }}>
         <Typography variant="h3" color="white">
            Weather App
         </Typography>
      </Box>
   )
}

export default Logo
