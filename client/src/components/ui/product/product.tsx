import { useCallback } from "react"
import type { IProduct } from "../../../types/product"
import { formatCurrency } from "../../../utils/helpers"
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md"

type ProductProps = {
  product: IProduct
}

const Product = ({ product }: ProductProps) => {
  const { thumb, title, price, totalRatings } = product

  const Star = useCallback(
    () => (
      <div className="flex">
        {Array.from({ length: totalRatings }).map((_, idx) => (
          <MdOutlineStarPurple500
            key={`star-purple-${idx}`}
            size={20}
            color="orange"
          />
        ))}
        {Array.from({ length: 5 - totalRatings }).map((_, idx) => (
          <MdOutlineStarOutline key={`star-${idx}`} size={20} color="orange" />
        ))}
      </div>
    ),
    [totalRatings],
  )

  return (
    <div className="p-[15px] flex flex-1 flex-col min-w-0 border border-main-border w-full">
      <div className="relative w-full">
        <img src={thumb} className="w-full object-contain" alt={title} />

        <div className="absolute flex top-0 right-0 bg-[#fbb000] text-white text-[13px] font-bold pl-10 pr-4 py-1.5 flex items-center gap-2.5 [clip-path:polygon(10px_0%,_100%_0%,_100%_100%,_10px_100%,_0%_50%)]">
          <span className="w-[6px] h-[6px] bg-white rounded-full absolute left-[10px] top-1/2 -translate-y-1/2" />
          <span className="uppercase text-[10px] font-main">NEW</span>
        </div>
      </div>

      <span className="text-[16px] font-main text-quaternary block w-full min-w-0 truncate mt-5">
        {title}
      </span>
      <Star />
      <span className="text-[16px] font-main text-neutral mt-1">
        {formatCurrency(price, "VND")}
      </span>
    </div>
  )
}

export default Product
