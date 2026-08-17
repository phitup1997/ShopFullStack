import type { AxiosResponse } from "axios"
import type {
  IProductCategory,
  IProductDailyDeal,
  IProductPagination,
} from "../types/product"
import axios from "./api-client"

export const getProducts = async (
  params: Record<string, unknown>,
): Promise<AxiosResponse<IProductPagination>> =>
  axios({
    url: "product/products",
    method: "GET",
    params,
  })

export const getProductCategories = (): Promise<
  AxiosResponse<IProductCategory>
> => axios.get<IProductCategory>("/product-category")

export const getProductDailyDeal = (): Promise<
  AxiosResponse<IProductDailyDeal>
> => axios.get<IProductDailyDeal>("/product/daily-deal")
