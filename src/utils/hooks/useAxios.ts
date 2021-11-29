import axios, { AxiosError, AxiosResponse } from 'axios'
import useSWRImmutable from 'swr/immutable'

/**
 * Axios実行用のカスタムフック
 *
 * @template T - 取得したいオブジェクトの型
 * @param url - APIのURL（Path）
 * @return - {データ、ローディングの状態、エラー}
 */
const useAxios = <T>(url: string) => {
  const { data, error } = useSWRImmutable<AxiosResponse<T>, AxiosError>(
    url,
    async (url: string) => await axios.get(url)
  )

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  }
}

/**
 * 都道府県一覧をリクエストするためのフロントエンド用APIのPath
 */
export const PREFETURES_FRONTEND_PATH = '/api/prefectures'

/**
 * 都道府県の人口情報をリクエストするためのフロントエンド用APIのPath
 *
 * 利用する際はこのパスに、都道府県番号を付け加える
 * 例：/api/populationCompositionPerYear/1000
 */
export const POPULATION_COMPOSITION_PER_YEAR_FRONTEND_PATH =
  '/api/populationCompositionPerYear/'

export default useAxios
