import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { act } from "react-dom/test-utils"
import store from "../store/store"
import MainPage from "../pages/MainPage"

describe("Renders MainPage", () => {
   test("Search on page: search-button and 'welcome text'", async () => {
      render(
         <Provider store={store}>
            <MainPage />
         </Provider>
      )

      const searchCity = "Dubai"
      const searchButton = screen.getByText("SEARCH")
      const searchInput = screen.getByPlaceholderText(/search city/i)
      const welcomeText = screen.getByText(/welcome to the weather app/i)

      expect(screen.queryByText(/feels like/i)).toBeNull()
      expect(welcomeText.tagName).toEqual("H4")
      expect(searchButton).toBeInTheDocument()
      expect(searchInput).toHaveValue("")
      
      fireEvent.change(searchInput, { target: { value: searchCity } })
      expect(searchInput).toHaveValue(searchCity)

      act(() => {
         fireEvent.click(searchButton)
      })
   })
})
