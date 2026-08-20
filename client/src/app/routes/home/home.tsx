import Banner from "../../../components/ui/banner/banner"
import Promotion from "../../../components/ui/promotion/promotion"
import BestSeller from "../../../features/best-seller/bestSeller"
import DailyDeal from "../../../features/daily-deal/Dailydeal"
import FeatureProducts from "../../../features/feature-products/FeatureProducts"
import NewArrivals from "../../../features/new-arrivals/NewArrivals"
import Sidebar from "../../../features/sidebar/Sidebar"

const Home = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="w-main flex flex-col">
        <div className="flex items-stretch gap-5 mb-7.5">
          <Sidebar />
          <div className="flex-1">
            <Banner />
          </div>
        </div>
        <div className="w-full flex">
          <DailyDeal />
          <div className="pl-5 w-[75%]">
            <BestSeller />
            <Promotion />
          </div>
        </div>
        <FeatureProducts />
        <NewArrivals />
        <div className="w-full h-[500px]"></div>
      </div>
    </div>
  )
}

export default Home
