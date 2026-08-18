import type { FC } from "react"
import logo from "../../../assets/logo.png"
import icons from "../../../utils/icons"
import { Link } from "react-router-dom"
import { paths } from "../../../config/paths"
import { CiHeart } from "react-icons/ci"

const Header: FC = () => {
  const { RiPhoneFill, MdEmail, BsHandbagFill } = icons

  return (
    <div className="flex w-full justify-center px-3">
      <div className="flex w-main justify-between h-27.5 py-8.75">
        <Link to={paths.home.getHref()}>
          <img src={logo} alt="logo" className="w-full object-contain" />
        </Link>
        <div className="flex text-secondary">
          <div className="hidden min-[900px]:flex min-[900px]:flex-col items-center border-r border-main-border px-5">
            <span className="flex items-center gap-4">
              <RiPhoneFill color="red" />
              <span className="font-semibold text-[13px]">
                (+1800) 000 8808
              </span>
            </span>
            <span className="text-[11.9px]">Mon-Sat 9:00AM - 8:00PM</span>
          </div>
          <div className="hidden min-[900px]:flex min-[900px]:flex-col items-center px-5">
            <span className="flex items-center gap-1">
              <MdEmail color="red" />
              <span className="font-semibold text-[13px]">
                support@tadathemes.com
              </span>
            </span>
            <span className="text-[11.9px]">Online Support 24/7</span>
          </div>
          <div className="flex justify-center items-center px-5 border-x border-main-border">
            <CiHeart size={24} color="red" />
          </div>
          <div className="flex justify-center items-center gap-2  px-5">
            <BsHandbagFill color="red" />
            <span className="font-semibold text-[13px]">0 Item</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
