import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

import {
  PopulationCompositionPerYear,
  Prefecture,
  RESASErrorResponse,
  RESASRawResponse,
  RESASResponse,
  isRESASErrorRawResponse,
  isRESASSuccessRawResponse,
} from './types'

/**
 * RESAS APIのエンドポイント
 */
export const RESAS_ENDPOINT = 'https://opendata.resas-portal.go.jp'

/**
 * RESAS API用のAxios Instance
 *
 * 設定
 * ・Base URLをRESAS APIのエンドポイントに固定した。
 * ・Headerに環境変数から読み込んだAPI Keyを追加した。
 *
 * 注：環境変数の関係上、このインスタンスを利用した関数はNode.js上でしか動作せず、フロントエンド側から利用できない。
 */
export const resasAxiosInstanse: AxiosInstance = axios.create({
  baseURL: RESAS_ENDPOINT,
  headers: {
    'X-API-KEY': process.env.RESAS_API_KRY || '',
  },
})

/**
 * RESAS APIにリクエスト送る関数
 *
 * リクエストの例外処理について
 * ・RESAS APIが処理に失敗した場合、isRESASErrorはtrueとなる。
 * ・RESAS APIの結果に関わらず、例外が投げられた場合、isRESASErrorはfalseとなる。
 *
 * 注：RESAS APIの仕様では処理結果に関わらず、サーバーへのアクセスに成功すれば、レスポンスヘッダーは200 OKとなる。そのため、処理に失敗した場合でもAxiosの例外は発生しないことがある。
 *
 * @async
 * @template T - 取得したい情報のJsonの型
 * @param path - APIのリクエスト先（Endpointは省略）
 * @param params - 省略可：Axiosの設定（クエリパラメータなど）
 * @return リクエストの結果
 */
const getRESAS = <T>(
  path: string,
  params?: AxiosRequestConfig
): Promise<RESASResponse<T>> =>
  resasAxiosInstanse
    .get<RESASRawResponse<T>>(path, params)
    .then((res): RESASResponse<T> => {
      const data = res.data
      if (isRESASSuccessRawResponse(data)) {
        return {
          type: 'success',
          message: data.message || undefined,
          result: data.result,
        }
      } else if (isRESASErrorRawResponse(data)) {
        return {
          type: 'error',
          isRESASError: true,
          status: Number(typeof data === 'string' ? data : data.statusCode),
        }
      }
      return { type: 'error', isRESASError: true, status: undefined }
    })
    .catch(
      (err: AxiosError): RESASErrorResponse => ({
        type: 'error',
        isRESASError: false,
        status: err.response?.status,
      })
    )

/**
 * 都道府県一覧を取得するためのPath
 */
export const PREFECTURE_PATH = 'api/v1/prefectures'

/**
 * RESAS APIから都道府県一覧を取得するための関数
 *
 * @async
 * @return 都道府県一覧
 */
export const getPrefectures = () => getRESAS<Prefecture[]>(PREFECTURE_PATH)

/**
 * 都道府県の人口情報を取得するためのPath
 */
export const POPULATION_COMPOSITION_PER_YEAR_PATH =
  'api/v1/population/composition/perYear'

/**
 * RESAS APIから各都道府県の人口情報を取得するための関数
 *
 * @async
 * @param prefCode - 都道府県番号
 * @return 引数で指定した都道府県の人口情報
 */
export const getPopulationCompositionPerYear: (
  prefCode: Prefecture['prefCode']
) => Promise<RESASResponse<PopulationCompositionPerYear>> = (prefCode) =>
  getRESAS<PopulationCompositionPerYear>(POPULATION_COMPOSITION_PER_YEAR_PATH, {
    params: { prefCode, cityCode: '-' },
  })
