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

export default useAxios
