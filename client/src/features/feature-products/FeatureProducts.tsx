import { useEffect } from "react"
import { useFeatureProductStore } from "./featureProductStore"
import ProductCard from "../../components/ui/product-card/productCard"

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
    </div>
  )
}

export default FeatureProducts
