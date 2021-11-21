export type Prefecture = {
  prefCode: number
  prefName: string
}

export type PrefecturesResponse = {
  message?: string
  result: Prefecture[]
}

export type APIFailResponse = {
  statusCode: string
  message: string
  description: string
}
