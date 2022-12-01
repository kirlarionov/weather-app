import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import NotFoundPage from "../pages/NotFoundPage"

describe("Renders NotFoundPage", () => {
   beforeEach(() =>
      render(
         <BrowserRouter>
            <NotFoundPage />
         </BrowserRouter>
      )
   )

   test("go to the MainPage", () => {
      const backToMainButton = screen.getByText(/back to main/i)

      expect(window.location.pathname).toEqual("/")
      fireEvent.click(backToMainButton)
      expect(window.location.pathname).toEqual("/weather-app/")
   })
})
