import type { IProduct } from "../../../types/product"
import { formatCurrency } from "../../../utils/helpers"

type ProductProps = {
  product: IProduct
}

const Product = ({ product }: ProductProps) => {
  return (
    <div className="p-[15px] flex flex-col border border-main-border">
      <div className="relative w-full">
        <img
          src={product.thumb || ""}
          className="w-full object-contain"
          alt={product.title}
        />

        <div className="absolute flex top-0 right-0 bg-[#fbb000] text-white text-[13px] font-bold pl-10 pr-4 py-1.5 flex items-center gap-2.5 [clip-path:polygon(10px_0%,_100%_0%,_100%_100%,_10px_100%,_0%_50%)]">
          <span className="w-[6px] h-[6px] bg-white rounded-full absolute left-[10px] top-1/2 -translate-y-1/2" />
          <span className="uppercase text-[10px] font-main">NEW</span>
        </div>
      </div>

      <span className="text-[16px] font-main text-quaternary mt-5">
        {product.title}
      </span>
      <span className="text-[16px] font-main text-neutral mt-1">
        {formatCurrency(product.price, "VND")}
      </span>
    </div>
  )
}

export default Product
