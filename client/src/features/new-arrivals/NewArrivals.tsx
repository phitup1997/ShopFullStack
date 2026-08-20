const TABS_PRODUCT = [
  {
    key: "Tabs_Product_SmartPhone",
    title: "SmartPhone",
    href: "",
  },
  {
    key: "Tabs_Product_Tablet",
    title: "Tablet",
    href: "",
  },
  {
    key: "Tabs_Product_Laptop",
    title: "Laptop",
    href: "",
  },
]

const NewArrivals = () => {
  return (
    <div className="flex flex-col mt-5">
      <div className="flex w-full justify-between mb-5 py-3.75 border-b-2 border-main">
        <span className="text-[20px] font-semibold text-accent font-main">
          NEW ARRIVALS
        </span>
        <div className="flex main items-end divide-x gap-5 divide-main-border">
          {TABS_PRODUCT.map((tab, idx) => (
            <span
              key={tab.key}
              className={`text-gray text-[14px] cursor-pointer ${idx === TABS_PRODUCT.length - 1 ? "" : "pr-5"} font-main hover:text-main`}
            >
              <a href={tab.href}>{tab.title}</a>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewArrivals
