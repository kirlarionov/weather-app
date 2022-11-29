import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import CityWeatherPage from "./pages/CityWeatherPage"
import MainPage from "./pages/MainPage"
import NotFoundPage from "./pages/NotFoundPage"

const App: FC = () => {
   //! ----- ДОБАВИТЬ страницу 404


   return (
      <Routes>
         <Route path="/" element={<MainPage />} />
         <Route path="/cities/:cityName" element={<CityWeatherPage />} />
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   )
}

export default App
