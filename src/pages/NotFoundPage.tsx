import { FC } from "react"
import { Typography, Box, SxProps, Theme } from "@mui/material"
import Logo from "../components/Logo"
import BackToMainButton from "../components/BackToMainButton"

const notFoundPageStyle: SxProps<Theme> = {
   position: "relative",
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
   maxWidth: "990px",
   minHeight: "100vh",
   margin: "0 auto",
   padding: "40px",
   fontFamily: "Roboto, sans-serif",
   backgroundColor: "#fffdc3",
}

const NotFoundPage: FC = () => {
   return (
      <Box sx={notFoundPageStyle}>
         <Logo top="25px" right="-10px" />
         <Box position="relative">
            <Typography variant="h4">Oops! Page not found... 😐</Typography>
            <BackToMainButton bottom="-70px" right="100px" />
         </Box>
      </Box>
   )
}

export default NotFoundPage
