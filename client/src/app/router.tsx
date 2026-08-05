import { Route, Routes } from "react-router-dom"
import path from "../utils/path"
import Public from "./routes/home/public"
import Home from "./routes/home/home"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={path.PUBLIC} element={<Public />}>
        <Route path={path.HOME} element={<Home />} />
      </Route>
    </Routes>
  )
}
