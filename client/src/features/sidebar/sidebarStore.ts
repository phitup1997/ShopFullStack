import { create } from "zustand"
import { AxiosError } from "axios"
import { getProductCategories } from "../../apis/product"
import type { ICategory } from "../../types/product"

type ApiErrorResponse = {
  message?: string
}

type SidebarState = {
  categories: ICategory[]
  isLoading: boolean
  error?: string
  fetchCategories: () => Promise<void>
}

export const useSidebarStore = create<SidebarState>()(set => ({
  categories: [],
  isLoading: false,
  error: undefined,
  fetchCategories: async () => {
    set({ isLoading: true, error: undefined })

    try {
      const response = await getProductCategories()
      set({ categories: response.data.categories, isLoading: false })
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
