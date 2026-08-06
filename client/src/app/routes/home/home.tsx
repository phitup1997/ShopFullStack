import Banner from "../../../components/ui/banner/banner"
import BestSeller from "../../../components/ui/best-seller/best-seller"
import Sidebar from "../../../features/sidebar/Sidebar"
import icons from "../../../utils/icons"

const Home = () => {
  const { FaStar } = icons

  return (
    <div className="w-main flex flex-col gap-7">
      <div className="flex items-stretch gap-5">
        <Sidebar />
        <div className="flex-1">
          <Banner />
        </div>
      </div>
      <div className="w-main flex">
        <div className="flex flex-col w-[25%] h-fit justify-center items-center border border-main-border p-[20px]">
          <div className="flex items-center w-full mb-10">
            <FaStar
              color="red"
              size={"20"}
              className="absolute object-contain"
            />
            <span className="uppercase font-semibold text-[20px] text-center w-full font-main text-secondary">
              DAILY DEALS
            </span>
          </div>
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/Kiet-tac-dong-ho-thong-minh-HUAWEI-WATCH-Ultimate-se-duoc-ra-mat-tai-Viet-Nam-5_1_400x.png?v=1750768905"
            alt="daily-deal"
            className="w-full object-contain"
          />
        </div>
        <div className="w-[75%] pl-[20px]">
          <BestSeller />
        </div>
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  )
}

export default Home
