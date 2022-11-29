import { FC } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"

interface BackToMainButtonProps {
   bottom: string
   right: string
}

const BackToMainButton: FC<BackToMainButtonProps> = ({ bottom, right }) => {
   return (
      <NavLink to={"/"}>
         <Button
            variant="contained"
            startIcon={<ChevronLeftIcon />}
            sx={{
               position: "absolute",
               fontSize: "16px",
               bottom,
               right,
            }}>
            BACK TO MAIN
         </Button>
      </NavLink>
   )
}

export default BackToMainButton
