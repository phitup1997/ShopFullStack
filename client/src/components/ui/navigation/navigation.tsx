import { NavLink } from "react-router-dom"
import { paths } from "../../../config/paths"

const navigation = [
  {
    id: 1,
    value: "HOME",
    path: paths.home.getHref(),
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: paths.products.getHref(),
  },
  {
    id: 3,
    value: "BLOGS",
    path: paths.blogs.getHref(),
  },
  {
    id: 4,
    value: "OUR SERVICES",
    path: paths.services.getHref(),
  },
  {
    id: 5,
    value: "FAQ",
    path: paths.faq.getHref(),
  },
]

const Navigation = () => {
  return (
    <div className="w-main h-[48px] py-2 border-y border-main-border text-sm flex items-center mb-6">
      {navigation.map(el => (
        <NavLink
          to={el.path}
          key={el.id}
          className={({ isActive }) =>
            isActive ? "pr-12 text-main" : "pr-12 hover:text-main"
          }
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  )
}

export default Navigation
