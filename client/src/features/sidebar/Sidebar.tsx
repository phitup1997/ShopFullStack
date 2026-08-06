import { useEffect } from "react"
import { generateSlug } from "../../utils/helpers"
import { NavLink } from "react-router-dom"
import { useSidebarStore } from "./sidebarStore"
import icons from "../../utils/icons"

const { FaList } = icons

const Sidebar = () => {
  const categories = useSidebarStore(state => state.categories)
  const isLoading = useSidebarStore(state => state.isLoading)
  const fetchCategories = useSidebarStore(state => state.fetchCategories)

  useEffect(() => {
    void fetchCategories()
  }, [fetchCategories])

  return (
    <div className="flex flex-col border border-main-border w-[25%] h-fit">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="px-5 py-[10px] text-sm text-tertiary animate-pulse"
          >
            Loading...
          </div>
        ))
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 py-[15px] px-5 bg-main">
            <FaList color="white" size={17} />
            <span className="text-white text-[16px] font-main">
              ALL COLLECTIONS
            </span>
          </div>
          {categories.map(category => (
            <NavLink
              key={category._id}
              to={`/${generateSlug(category.title)}`}
              className={({ isActive }) =>
                isActive
                  ? "bg-main text-white text-sm"
                  : "text-sm text-tertiary hover:text-main"
              }
            >
              <div className="flex items-center gap-2 py-[15px] px-5">
                <img
                  src={category.icon}
                  className="w-[25px] h-[25px] object-contain"
                />
                <span>{`${category.title} (${category.brand.length.toString()})`}</span>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default Sidebar
