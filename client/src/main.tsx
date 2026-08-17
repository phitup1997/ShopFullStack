import { createRoot } from "react-dom/client"
import { App } from "./app"
import "./index.css"
import { BrowserRouter } from "react-router-dom"

const root = document.getElementById("root")
if (!root) throw new Error("No root element found")

createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
