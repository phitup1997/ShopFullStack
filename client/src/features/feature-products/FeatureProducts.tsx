import { useEffect } from "react"
import { useFeatureProductStore } from "./featureProductStore"
import ProductCard from "../../components/ui/product-card/productCard"
import DiagonalRevealImage from "../../components/ui/diagonal-reveal-image/DiagonalRevealImage"
import gallery1 from "../../assets/gallary-1.png"
import gallery2 from "../../assets/gallary-2.png"
import gallery3 from "../../assets/gallary-3.png"
import gallery4 from "../../assets/gallary-4.png"

type GalleryBanner = {
  key: string
  src: string
  alt: string
  href?: string
}

const GALLERY_STACKED_BANNERS: GalleryBanner[] = [
  {
    key: "gallery-juice-blender",
    src: gallery2,
    alt: "Juice blender promotion",
  },
  { key: "gallery-cookware-set", src: gallery3, alt: "Cookware set promotion" },
]

const GALLERY_LEFT_BANNER: GalleryBanner = {
  key: "gallery-electronic-sale",
  src: gallery1,
  alt: "Electronic sale promotion",
}

const GALLERY_RIGHT_BANNER: GalleryBanner = {
  key: "gallery-mega-sale-refrigerator",
  src: gallery4,
  alt: "Mega sale refrigerator promotion",
}

const FeatureProducts = () => {
  const products = useFeatureProductStore(state => state.products)
  const isLoading = useFeatureProductStore(state => state.isLoading)
  const fetchFeatureProducts = useFeatureProductStore(
    state => state.fetchFeatureProducts,
  )

  useEffect(() => {
    void fetchFeatureProducts()
  }, [fetchFeatureProducts])

  return (
    <div className="flex flex-col">
      <div className="w-full mb-5 py-3.75 border-b-2 border-main">
        <span className="text-[20px] font-semibold text-accent font-main">
          FEATURED PRODUCTS
        </span>
      </div>

      {isLoading ? (
        <p className="spinner">Loading featured products...</p>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      <div className="flex w-full mt-5 gap-5">
        <DiagonalRevealImage
          key={GALLERY_LEFT_BANNER.key}
          src={GALLERY_LEFT_BANNER.src}
          alt={GALLERY_LEFT_BANNER.alt}
          className="flex-2 "
        />
        <div className="flex flex-1 flex-col justify-between gap-5">
          {GALLERY_STACKED_BANNERS.map(banner => (
            <DiagonalRevealImage
              key={banner.key}
              src={banner.src}
              alt={banner.alt}
              className="flex-1"
            />
          ))}
        </div>
        <DiagonalRevealImage
          key={GALLERY_RIGHT_BANNER.key}
          src={GALLERY_RIGHT_BANNER.src}
          alt={GALLERY_RIGHT_BANNER.alt}
          className="flex-1"
        />
      </div>
    </div>
  )
}

export default FeatureProducts
