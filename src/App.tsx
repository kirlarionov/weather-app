import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import CityWeatherPage from "./pages/CityWeatherPage"
import MainPage from "./pages/MainPage"
import NotFoundPage from "./pages/NotFoundPage"

const App: FC = () => {
   return (
      <Routes>
         <Route path="/weather-app/" element={<MainPage />} />
         <Route
            path="/weather-app/cities/:cityName"
            element={<CityWeatherPage />}
         />
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   )
}

export default App
