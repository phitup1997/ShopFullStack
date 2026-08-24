import { create } from "zustand"
import { AxiosError } from "axios"
import { getProducts } from "@apis/product"
import type { IProduct } from "@/types/product"

type ApiErrorResponse = {
  message?: string
}

export type TabProduct = {
  smartphone: IProduct[]
  tablet: IProduct[]
  laptop: IProduct[]
}

type NewArrivalState = {
  products: TabProduct
  isLoading: boolean
  error?: string
  getNewArrivalProducts: () => Promise<void>
}

export const useNewArrivalStore = create<NewArrivalState>()(set => ({
  products: { smartphone: [], tablet: [], laptop: [] },
  isLoading: true,
  error: undefined,
  getNewArrivalProducts: async () => {
    set({ isLoading: true, error: undefined })

    try {
      const [smartphones, tablets, laptops] = await Promise.all([
        getProducts({ limit: 3, category: "Smartphone" }),
        getProducts({ limit: 3, category: "Tablet" }),
        getProducts({ limit: 3, category: "Laptop" }),
      ])
      set({
        products: {
          smartphone: smartphones.data.products,
          tablet: tablets.data.products,
          laptop: laptops.data.products,
        },
        isLoading: false,
      })
    } catch (error: unknown) {
      let errorMessage = "Something went wrong"

      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ApiErrorResponse>
        const apiMessage = axiosError.response?.data.message

        if (typeof apiMessage === "string") {
          errorMessage = apiMessage
        } else if (axiosError.message) {
          errorMessage = axiosError.message
        }
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      set({
        isLoading: false,
        error: errorMessage,
      })
    }
  },
}))
