import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import store from "../store/store"
import SavedCitiesList from "../components/SavedCitiesList"

describe("Renders SavedCitiesList", () => {
   test("1", () => {
      render(
         <Provider store={store}>
            <SavedCitiesList />
         </Provider>
      )

      expect(screen.queryByText(/saved cities/i)).toBeInTheDocument()
   })
})
