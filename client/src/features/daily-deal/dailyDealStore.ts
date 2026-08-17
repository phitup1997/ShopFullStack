import { create } from "zustand"
import { AxiosError } from "axios"
import { getProductDailyDeal } from "../../apis/product"
import type { IProduct } from "../../types/product"

type ApiErrorResponse = {
  message?: string
}

type DailyDealState = {
  product?: IProduct
  isLoading: boolean
  error?: string
  fetchDailyDeal: () => Promise<void>
}

export const useDailyDealStore = create<DailyDealState>()(set => ({
  product: undefined,
  isLoading: false,
  error: undefined,
  fetchDailyDeal: async () => {
    set({ isLoading: true, error: undefined })

    try {
      const response = await getProductDailyDeal()
      console.log(`response : ${JSON.stringify(response)}`)
      set({ product: response.data.product, isLoading: false })
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
