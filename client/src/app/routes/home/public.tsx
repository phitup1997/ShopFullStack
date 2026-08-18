import { Outlet } from "react-router-dom"
import Header from "../../../components/ui/header/header"
import Navigation from "../../../components/ui/navigation/navigation"
import TopHeader from "../../../components/ui/header/top-header"

const Public = () => {
  return (
    <div className="w-full">
      <div className="hidden sm:block w-full">
        <TopHeader />
        <Header />
        <Navigation />
        <Outlet />
      </div>
    </div>
  )
}

export default Public
