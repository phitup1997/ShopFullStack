import type { ComponentType } from "react"
import type { IProduct } from "../../../types/product"
import { formatCurrency } from "../../../utils/helpers"
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md"
import { FaRegEye, FaEye, FaBars, FaRegHeart, FaHeart } from "react-icons/fa6"
import { HiMiniBars3 } from "react-icons/hi2"

type ProductProps = {
  product: IProduct
}

type IconComponent = ComponentType<{ size?: number }>

type ProductAction = {
  key: string
  DefaultIcon: IconComponent
  HoverIcon: IconComponent
  wrapperClassName: string
  iconWrapperClassName: string
  defaultIconClassName: string
  hoverIconClassName: string
}

const PRODUCT_ACTIONS: ProductAction[] = [
  {
    key: "eye",
    DefaultIcon: FaRegEye,
    HoverIcon: FaEye,
    wrapperClassName:
      "group/eye bg-white hover:bg-black w-fit p-3 rounded-3xl shadow-md cursor-pointer transition-colors",
    iconWrapperClassName:
      "relative block w-4 h-4 text-black group-hover/eye:text-white transition-colors",
    defaultIconClassName:
      "absolute top-0 left-0 group-hover/eye:opacity-0 transition-opacity",
    hoverIconClassName:
      "absolute top-0 left-0 opacity-0 group-hover/eye:opacity-100 transition-opacity",
  },
  {
    key: "bars",
    DefaultIcon: FaBars,
    HoverIcon: HiMiniBars3,
    wrapperClassName:
      "group/bars bg-white hover:bg-black w-fit p-3 rounded-3xl shadow-md cursor-pointer transition-colors",
    iconWrapperClassName:
      "relative block w-4 h-4 text-black group-hover/bars:text-white transition-colors",
    defaultIconClassName:
      "absolute top-0 left-0 group-hover/bars:opacity-0 transition-opacity",
    hoverIconClassName:
      "absolute top-0 left-0 opacity-0 group-hover/bars:opacity-100 transition-opacity",
  },
  {
    key: "heart",
    DefaultIcon: FaRegHeart,
    HoverIcon: FaHeart,
    wrapperClassName:
      "group/heart bg-white hover:bg-black w-fit p-3 rounded-3xl shadow-md cursor-pointer transition-colors",
    iconWrapperClassName:
      "relative block w-4 h-4 text-black group-hover/heart:text-white transition-colors",
    defaultIconClassName:
      "absolute top-0 left-0 group-hover/heart:opacity-0 transition-opacity",
    hoverIconClassName:
      "absolute top-0 left-0 opacity-0 group-hover/heart:opacity-100 transition-opacity",
  },
]

const ProductActionsRow = () => (
  <div
    className="absolute flex gap-5 w-full -bottom-1 justify-center items-center
               opacity-0 translate-y-4 pointer-events-none
               group-hover/product:opacity-100 group-hover/product:translate-y-0 group-hover/product:pointer-events-auto
               transition-all duration-300 ease-out"
  >
    {PRODUCT_ACTIONS.map(
      ({
        key,
        DefaultIcon,
        HoverIcon,
        wrapperClassName,
        iconWrapperClassName,
        defaultIconClassName,
        hoverIconClassName,
      }) => (
        <div key={key} className={wrapperClassName}>
          <span className={iconWrapperClassName}>
            <span className={defaultIconClassName}>
              <DefaultIcon size={16} />
            </span>
            <span className={hoverIconClassName}>
              <HoverIcon size={16} />
            </span>
          </span>
        </div>
      ),
    )}
  </div>
)

const NewBadge = () => (
  <div className="absolute flex top-0 right-0 bg-[#fbb000] text-white text-[13px] font-bold pl-10 pr-4 py-1.5 flex items-center gap-2.5 [clip-path:polygon(10px_0%,_100%_0%,_100%_100%,_10px_100%,_0%_50%)]">
    <span className="w-[6px] h-[6px] bg-white rounded-full absolute left-[10px] top-1/2 -translate-y-1/2" />
    <span className="uppercase text-[10px] font-main">NEW</span>
  </div>
)

const MAX_RATING = 5

const renderStars = (totalRatings: number) => (
  <div className="flex">
    {Array.from({ length: totalRatings }).map((_, idx) => (
      <MdOutlineStarPurple500
        key={`star-filled-${idx}`}
        size={20}
        color="orange"
      />
    ))}
    {Array.from({ length: MAX_RATING - totalRatings }).map((_, idx) => (
      <MdOutlineStarOutline
        key={`star-empty-${idx}`}
        size={20}
        color="orange"
      />
    ))}
  </div>
)

const Product = ({ product }: ProductProps) => {
  const { thumb, title, price, totalRatings } = product

  return (
    <div className="group/product p-[15px] flex flex-1 flex-col min-w-0 border border-main-border w-full overflow-hidden">
      <div className="relative w-full">
        <ProductActionsRow />
        <img src={thumb} className="w-full object-contain" alt={title} />
        <NewBadge />
      </div>

      <span className="text-[16px] font-main text-quaternary block w-full min-w-0 truncate mt-5">
        {title}
      </span>
      {renderStars(totalRatings)}
      <span className="text-[16px] font-main text-neutral mt-1">
        {formatCurrency(price, "VND")}
      </span>
    </div>
  )
}

export default Product
