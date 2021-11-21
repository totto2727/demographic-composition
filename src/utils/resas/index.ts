import axios, { AxiosError } from 'axios'

export type Prefecture = {
  prefCode: number
  prefName: string
}

export type PrefecturesResponse = {
  message?: string
  result: Prefecture[]
}

export type APIFailResponse =
  | {
      statusCode: string
      message?: string
      description?: string
    }
  | string
  | undefined

const RESAS_ENDPOINT = 'https://opendata.resas-portal.go.jp'

const resasAxiosInstanse = axios.create({
  baseURL: RESAS_ENDPOINT,
  headers: {
    'X-API-KEY': process.env.RESAS_API_KRY || '',
  },
})

export const getPrefectures: () => Promise<
  PrefecturesResponse | APIFailResponse
> = async () => {
  const path = 'api/v1/prefectures'
  try {
    const response = await resasAxiosInstanse.get<PrefecturesResponse>(path)
    return response.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return (e as AxiosError<APIFailResponse>).response?.data
    }
    return undefined
  }
}
