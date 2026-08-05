import { useEffect } from "react"
import { generateSlug } from "../../utils/helpers"
import { NavLink } from "react-router-dom"
import { useSidebarStore } from "./sidebarStore"

const Sidebar = () => {
  const categories = useSidebarStore(state => state.categories)
  const isLoading = useSidebarStore(state => state.isLoading)
  const fetchCategories = useSidebarStore(state => state.fetchCategories)

  useEffect(() => {
    void fetchCategories()
  }, [fetchCategories])

  return (
    <div className="flex flex-col border border-main-border">
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="px-5 py-[10px] text-sm text-tertiary animate-pulse"
            >
              Loading...
            </div>
          ))
        : categories.map(category => (
            <NavLink
              key={category._id}
              to={`/${generateSlug(category.title)}`}
              className={({ isActive }) =>
                isActive
                  ? "bg-main text-white px-5 py-[10px] text-sm"
                  : "px-5 py-[10px] text-sm text-tertiary hover:bg-main hover:text-white"
              }
            >
              <img
                src="https://digital-world-2.myshopify.com/cdn/shop/t/26/assets/smartphone.gif?v=50314805719429045871750775446"
                className="w-[30px] h-[30px]"
              />
              {category.title}
            </NavLink>
          ))}
    </div>
  )
}

export default Sidebar
