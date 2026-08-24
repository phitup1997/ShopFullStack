import { useEffect, useState } from "react"
import { TabProduct, useNewArrivalStore } from "./newArrivalStore"
import Product from "@components/ui/product/product"

type NewArrivalTabKey = keyof TabProduct

type Tab = {
  key: NewArrivalTabKey
  title: string
}

const TABS_PRODUCT = [
  { key: "smartphone", title: "SmartPhone" },
  { key: "tablet", title: "Tablet" },
  { key: "laptop", title: "Laptop" },
] as const satisfies Tab[]

const NewArrivals = () => {
  const [selectedTab, setSelectedTab] = useState<NewArrivalTabKey>(
    TABS_PRODUCT[0].key,
  )
  const products = useNewArrivalStore(state => state.products)
  const isLoading = useNewArrivalStore(state => state.isLoading)
  const getNewArrivalProducts = useNewArrivalStore(
    state => state.getNewArrivalProducts,
  )

  useEffect(() => {
    void getNewArrivalProducts()
  }, [getNewArrivalProducts])

  if (isLoading) return <div></div>

  return (
    <div className="flex flex-col mt-5">
      <div className="flex w-full justify-between mb-5 py-3.75 border-b-2 border-main">
        <span className="text-[20px] font-semibold text-accent font-main">
          NEW ARRIVALS
        </span>
        <div className="flex main items-end divide-x gap-5 divide-main-border">
          {TABS_PRODUCT.map((tab, idx) => (
            <span
              key={`TABS_PRODUCT_${tab.key}`}
              className={`text-gray text-[14px] cursor-pointer ${idx === TABS_PRODUCT.length - 1 ? "" : "pr-5"} ${selectedTab === tab.key ? "text-main" : ""} font-main hover:text-main`}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.title}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-5">
        {products[selectedTab].map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default NewArrivals
