import { NavLink } from "react-router-dom"
import { paths } from "../../../config/paths"
import { GiHamburgerMenu } from "react-icons/gi"

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
    <nav className="flex px-3 justify-center items-center mb-6">
      <div className="flex w-main h-full border-y border-main-border text-sm items-center justify-between">
        {/* Navigation */}
        <div className="w-full py-3 items-center">
          <div className="hidden md:block w-full items-center">
            {navigation.map(el => (
              <NavLink
                to={el.path}
                key={el.id}
                className={({ isActive }) =>
                  isActive
                    ? "pr-12 text-main py-1.25"
                    : "pr-12 hover:text-main py-1.25"
                }
              >
                {el.value}
              </NavLink>
            ))}
          </div>
          <div className="block md:hidden">
            <GiHamburgerMenu size={20} />
          </div>
        </div>

        {/* Search */}
        <div className="border-x border-main">
          <input
            type="Search"
            className="h-full py-3 px-2.5 focus:outline-none focus:ring-0 [&::-webkit-search-cancel-button]:appearance-none"
            placeholder="Search something"
            autoComplete="off"
            aria-label="Search something"
          />
        </div>
      </div>
    </nav>
  )
}

export default Navigation
