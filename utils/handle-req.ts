import { customAPIError } from "./custom-api-status"

export const handleReq = async (promise: Promise<any>) => {
  try {
    const response = await promise

    if (response?.data?.ok === false) {
      throw new Error(response.data.message)
    }

    return response?.data
  } catch (err) {
    return customAPIError(err)
  }
}
