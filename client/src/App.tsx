import { Route, Routes } from "react-router-dom"
import path from "./utils/path"
import { Home, Public } from "./pages"

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}
