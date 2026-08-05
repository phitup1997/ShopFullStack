export const paths = {
  public: {
    path: "/",
    getHref: () => "/",
  },
  home: {
    path: "",
    getHref: () => "/",
  },
  products: {
    path: "products",
    getHref: () => "/products",
  },
  blogs: {
    path: "blogs",
    getHref: () => "/blogs",
  },
  services: {
    path: "services",
    getHref: () => "/services",
  },
  faq: {
    path: "faq",
    getHref: () => "/faq",
  },
} as const
