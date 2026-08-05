import { Outlet } from "react-router-dom"
import Header from "../../../components/ui/header/header"
import Navigation from "../../../components/ui/navigation/navigation"

const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <Navigation />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Public
