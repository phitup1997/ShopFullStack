import { useEffect, useState } from "react"
import { TabProduct, useNewArrivalStore } from "./newArrivalStore"
import Product from "@components/ui/product/product"
import Section from "@/components/ui/section/section"

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
      <Section
        name="NEW ARRIVALS"
        tabs={TABS_PRODUCT}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      <div className="flex gap-5">
        {products[selectedTab].map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default NewArrivals
