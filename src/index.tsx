import React from "react"
import { Provider } from "react-redux"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import store from "./store/store"
import "./nullstyle.css"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
   <React.StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <App />
         </Provider>
      </BrowserRouter>
   </React.StrictMode>
)
