import Banner from "../../../components/ui/banner/banner"
import BestSeller from "../../../components/ui/best-seller/best-seller"
import Sidebar from "../../../features/sidebar/Sidebar"

const Home = () => {
  return (
    <div className="w-main flex">
      <div className="gap-5 w-[25%] mb-[30px]">
        <Sidebar />
        <span>Deal Daily</span>
      </div>
      <div className="pl-5 w-[75%]">
        <Banner />
        <BestSeller />
      </div>
    </div>
  )
}

export default Home
