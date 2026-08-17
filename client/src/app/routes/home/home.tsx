import Banner from "../../../components/ui/banner/banner"
import BestSeller from "../../../components/ui/best-seller/best-seller"
import Promotion from "../../../components/ui/promotion/promotion"
import DailyDeal from "../../../features/daily-deal/Dailydeal"
import FeatureProducts from "../../../features/feature-products/FeatureProducts"
import Sidebar from "../../../features/sidebar/Sidebar"

const Home = () => {
  return (
    <div className="w-main flex flex-col">
      <div className="flex items-stretch gap-5 mb-[30px]">
        <Sidebar />
        <div className="flex-1">
          <Banner />
        </div>
      </div>
      <div className="w-main flex">
        <DailyDeal />
        <div className="w-[75%] pl-[20px]">
          <BestSeller />
          <Promotion />
        </div>
      </div>
      <FeatureProducts />
      <div className="w-full h-[500px]"></div>
    </div>
  )
}

export default Home
