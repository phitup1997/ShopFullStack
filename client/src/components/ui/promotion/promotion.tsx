const Promotion = () => {
  return (
    <div className="w-full flex mt-5 gap-5">
      {/* Promo 1 */}
      <div className="group/promo1 relative flex flex-1 overflow-hidden cursor-pointer">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/promo-23_2000x_crop_center.png?v=1750842393"
          alt="promotion"
          className="w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-black/20 origin-top-left scale-0
                           group-hover/promo1:scale-100 transition-transform duration-500 ease-in-out
                           [clip-path:polygon(0_0,100%_0,0_100%)]"
        />
        <div
          className="absolute inset-0 bg-black/20 origin-bottom-right scale-0
                           group-hover/promo1:scale-100 transition-transform duration-500 ease-in-out
                           [clip-path:polygon(100%_0,100%_100%,0_100%)]"
        />
      </div>

      {/* Promo 2 */}
      <div className="group/promo2 relative flex flex-1 overflow-hidden cursor-pointer">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/promo-24_2000x_crop_center.png?v=1750842410"
          alt="promotion"
          className="w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-black/20 origin-top-left scale-0
                           group-hover/promo2:scale-100 transition-transform duration-500 ease-in-out
                           [clip-path:polygon(0_0,100%_0,0_100%)]"
        />
        <div
          className="absolute inset-0 bg-black/20 origin-bottom-right scale-0
                           group-hover/promo2:scale-100 transition-transform duration-500 ease-in-out
                           [clip-path:polygon(100%_0,100%_100%,0_100%)]"
        />
      </div>
    </div>
  )
}

export default Promotion
