import { MdOutlineStarPurple500 } from "react-icons/md"
import { IProduct } from "../../../types/product"
import { formatCurrency } from "../../../utils/helpers"

type ProductCardProps = {
  product: IProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { thumb, title, price, totalRatings } = product

  const renderStars = (totalRatings: number) => (
    <div className="flex">
      {Array.from({ length: totalRatings }).map((_, idx) => (
        <MdOutlineStarPurple500
          key={`star-filled-${idx}`}
          size={20}
          color="orange"
        />
      ))}
    </div>
  )

  return (
    <div className="flex gap-5 items-center border border-main-border p-3.75">
      <img
        src={thumb}
        alt={title}
        className="w-22.5 h-22.5 object-cover shrink-0 cursor-pointer"
      />
      <div className="flex flex-col min-w-0">
        <span className="text-[16px] font-main text-quaternary truncate cursor-pointer hover:text-main">
          {title}
        </span>
        <div className="flex flex-col justify-center mt-1 flex-wrap">
          {/* {oldPrice && (
            <span className="text-[14px] font-main text-neutral/60 line-through">
              {formatCurrency(price, "VND")}
            </span>
          )} */}
          {renderStars(totalRatings)}
          <span className="text-[14px] font-main text-neutral/60 mt-1 line-through">
            {formatCurrency(price, "VND")}
          </span>
          <span className="text-[16px] font-main text-neutral">
            {formatCurrency(price, "VND")}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
