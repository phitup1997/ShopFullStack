import DiagonalRevealImage from "../diagonal-reveal-image/DiagonalRevealImage"

const PROMOTIONS = [
  {
    key: "promo-watch",
    src: "https://digital-world-2.myshopify.com/cdn/shop/files/promo-23_2000x_crop_center.png?v=1750842393",
    alt: "promotion",
  },
  {
    key: "promo-phone",
    src: "https://digital-world-2.myshopify.com/cdn/shop/files/promo-24_2000x_crop_center.png?v=1750842410",
    alt: "promotion",
  },
]

const PromotionSection = () => {
  return (
    <div className="w-full flex mt-5 gap-5">
      {PROMOTIONS.map(({ key, src, alt }) => (
        <DiagonalRevealImage key={key} src={src} alt={alt} className="flex-1" />
      ))}
    </div>
  )
}

export default PromotionSection
