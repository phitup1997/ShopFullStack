import { create } from "zustand"
import { IProduct } from "../../types/product"
import { getProducts } from "../../apis/product"
import { AxiosError } from "axios"

type ApiErrorResponse = {
  message?: string
}

type FeatureProductState = {
  products: IProduct[]
  isLoading: boolean
  error?: string
  fetchFeatureProducts: () => Promise<void>
}

export const useFeatureProductStore = create<FeatureProductState>()(set => ({
  products: [],
  isLoading: false,
  error: undefined,
  fetchFeatureProducts: async () => {
    set({ isLoading: true, error: undefined })

    try {
      const response = await getProducts({ limit: 9, totalRatings: 5 })
      set({ products: response.data.products, isLoading: false })
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
