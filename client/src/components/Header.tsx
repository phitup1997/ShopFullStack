import type { FC } from "react"
import logo from "../assets/logo.png"
import icons from "../utils/icons"
import { Link } from "react-router-dom"
import path from "../utils/path"

const Header: FC = () => {
  const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons

  return (
    <div className="flex justify-between border w-main h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-secondary">
        <div className="flex flex-col items-center border-r px-5">
          <span className="flex items-center gap-4">
            <RiPhoneFill color="red" />
            <span className="font-semibold text-[13px]">(+1800) 000 8808</span>
          </span>
          <span className="text-[11.9px]">Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col items-center px-[20px] border-r">
          <span className="flex items-center gap-1">
            <MdEmail color="red" />
            <span className="font-semibold text-[13px]">
              support@tadathemes.com
            </span>
          </span>
          <span className="text-[11.9px]">Online Support 24/7</span>
        </div>
        <div className="flex justify-center items-center px-[20px] gap-2 border-r">
          <BsHandbagFill color="red" />
          <span className="font-semibold text-[13px]">0 Item</span>
        </div>
        <div className="flex justify-center items-center px-[20px]">
          <FaUserCircle size={24} />
        </div>
      </div>
    </div>
  )
}

export default Header
