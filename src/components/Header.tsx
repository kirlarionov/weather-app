import { FC } from "react"
import { Box, SxProps, Theme } from "@mui/material"
import SearchForm from "./SearchForm"
import Logo from "./Logo"

const headerStyle: SxProps<Theme> = {
   display: "flex",
   justifyContent: "space-between",
   position: "relative",
}

const Header: FC = () => (
   <Box sx={headerStyle}>
      <SearchForm />
      <Logo top="-10px" right="-45px" />
   </Box>
)

export default Header
