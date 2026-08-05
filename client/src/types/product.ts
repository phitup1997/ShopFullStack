export type ICategory = {
  brand: string[]
  icon: string
  title: string
  _id: string
}

export type IProductCategory = {
  categories: ICategory[]
}
