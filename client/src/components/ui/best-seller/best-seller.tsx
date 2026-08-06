import { useEffect, useState } from "react"
import { getProducts } from "../../../apis/product"
import Product from "../product/product"
import { IProduct } from "../../../types/product"
import Carousel from "../carousel/carousel"

const tabs = [
  {
    id: 1,
    title: "Best Seller",
  },
  {
    id: 2,
    title: "New Arrivals",
  },
  {
    id: 3,
    title: "Tablet",
  },
]

const BestSeller = () => {
  const [isActiveTab, setIsActiveTab] = useState<number>(1)
  const [bestSeller, setBestSeller] = useState<IProduct[]>([])
  const [newArrivals, setNewArrivals] = useState<IProduct[]>([])

  const fetchProduct = async () => {
    const [bsData, naData] = await Promise.all([
      getProducts({ sort: "-sold" }),
      getProducts({ sort: "-createdAt" }),
    ])

    setBestSeller(bsData.data.products)
    setNewArrivals(bsData.data.products)
    // console.log(`test 2 : ${JSON.stringify(test2)}`)
  }

  useEffect(() => {
    void fetchProduct()
  }, [])

  return (
    <div>
      <div className="flex pb-[15px] mb-5 font-semibold border-b border-main border-b-2">
        {tabs.map((tab, idx) => (
          <span
            key={tab.id}
            className={
              isActiveTab === tab.id
                ? `text-[20px] font-main uppercase text-accent cursor-pointer pr-5 mr-5 ${tabs.length - 1 > idx ? "border-r border-main-border" : ""}`
                : `text-[20px] font-main uppercase text-accent cursor-pointer opacity-50 pr-5 mr-5 ${tabs.length - 1 > idx ? "border-r border-main-border" : ""}`
            }
            onClick={() => {
              setIsActiveTab(tab.id)
            }}
          >
            {tab.title}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <Carousel itemsToShow={3} gap={16}>
          {bestSeller.map(item => (
            <Product product={item} />
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default BestSeller
