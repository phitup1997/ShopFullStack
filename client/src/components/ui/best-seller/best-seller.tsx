import { useEffect, useState } from "react"
import { getProducts } from "../../../apis/product"
import Product from "../product/product"
import { IProduct } from "../../../types/product"
import Carousel from "../carousel/carousel"

enum TabId {
  BestSeller = 1,
  NewArrivals = 2,
}

const TABS = [
  { id: TabId.BestSeller, title: "Best Seller" },
  { id: TabId.NewArrivals, title: "New Arrivals" },
]

const BestSeller = () => {
  const [activeTab, setActiveTab] = useState<TabId>(TabId.BestSeller)
  const [productsMap, setProductsMap] = useState<Record<TabId, IProduct[]>>({
    [TabId.BestSeller]: [],
    [TabId.NewArrivals]: [],
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [bsData, naData] = await Promise.all([
          getProducts({ sort: "-sold" }),
          getProducts({ sort: "-createdAt" }),
        ])

        setProductsMap({
          [TabId.BestSeller]: bsData.data.products,
          [TabId.NewArrivals]: naData.data.products,
        })
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
    }

    void fetchProducts()
  }, [])

  return (
    <div>
      <div className="flex border-b-2 border-main pb-3.75 mb-5 font-semibold font-main">
        {TABS.map((tab, idx) => {
          const isActive = activeTab === tab.id
          const hasBorder = idx < TABS.length - 1

          return (
            <span
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                cursor-pointer pr-5 mr-5 text-[20px] uppercase text-accent transition-opacity
                ${isActive ? "opacity-100" : "opacity-50"}
                ${hasBorder ? "border-r border-main-border" : ""}
              `}
            >
              {tab.title}
            </span>
          )
        })}
      </div>
      <div className="mt-4">
        <Carousel itemsToShow={{ base: 2, md: 2, lg: 3 }} gap={16}>
          {productsMap[activeTab].map(item => (
            <Product key={item._id} product={item} />
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default BestSeller
