export type ICategory = {
  brand: string[]
  icon: string
  title: string
  _id: string
}

export type IProductCategory = {
  categories: ICategory[]
}

export interface IProductDailyDeal {
  product: IProduct
}

interface IPagination {
  count: number
  isSuccess: boolean
  limit: number
  page: number
}

export interface IProduct {
  _id: string
  brand: string
  category: string
  color: string
  images: string[]
  price: number
  quantity: number
  rating: string[]
  slug: string
  sold: number
  thumb: string
  title: string
  totalRatings: number
  updatedAt: string
  createdAt: string
}

export interface IProductPagination extends IPagination {
  products: IProduct[]
}
