/**
 * RESAS APIのレスポンス（成功時）の型
 *
 * @template T - 取得したい情報のJsonの型
 */
export type RESASSuccessRawResponse<T = void> = {
  message: string | null
  result: T
}

/**
 * RESAS APIのレスポンス（成功時）の型
 *
 * APIのレスポンス（RESASSuccessRawResponse）は直接扱わず、この型で処理を行う。
 *
 * @template T - 取得したい情報のJsonの型
 */
export type RESASSuccessResponse<T = void> = Omit<
  RESASSuccessRawResponse<T>,
  'message'
> & {
  type: 'success'
  message?: string
}

/**
 * RESAS APIのレスポンス（失敗時）の型
 */
export type RESASErrorRawResponse =
  | {
      statusCode?: string
      message: string | null
      description?: string
    }
  | string

/**
 * RESAS APIのレスポンス（失敗時）の型からnullを削除しundifinedに変更した型
 */
export type RESASErrorRawResponseRemovedNull =
  | (Omit<Exclude<RESASErrorRawResponse, string>, 'message'> & {
      message?: string
    })
  | string

/**
 * 429 Too Many Requestsや通信の失敗によるエラーを含んだRESAS APIのレスポンス（失敗時）の型
 *
 * APIのレスポンス（RESASErrorRawResponse）は直接扱わず、この型で処理を行う。
 *
 * isRESASErrorはRESAS APIの処理に失敗（API KeyやPathが正しくない）した場合trueとする。
 * 一方で429 Too Many Requestsや通信の失敗によるエラーはfalseとなる。
 */
export type RESASErrorResponse = {
  type: 'error'
  isRESASError: boolean
  response?: RESASErrorRawResponseRemovedNull
}

/**
 * RESAS APIのレスポンスの型
 *
 * @template T - 取得したい情報のJsonの型
 */
export type RESASRawResponse<T = void> =
  | RESASSuccessRawResponse<T>
  | RESASErrorRawResponse

/**
 * RESAS APIのレスポンス取得に成功した場合の型ガード
 *
 * @template T - 取得したい情報のJsonの型
 * @param res - RESAS APIのレスポンス
 * @return 型ガードの結果
 */
export const isRESASSuccessRawResponse = <T = void>(
  res: RESASRawResponse<T>
): res is RESASSuccessRawResponse<T> => {
  return typeof res === 'object' && 'message' in res && 'result' in res
}

/**
 * RESAS APIのレスポンス取得に失敗した場合の型ガード
 *
 * @param res - RESAS APIのレスポンス
 * @return 型ガードの結果
 */
export const isRESASErrorRawResponse = (
  res: RESASRawResponse
): res is RESASErrorRawResponse => {
  return (
    typeof res === 'string' ||
    (typeof res === 'object' &&
      'message' in res &&
      !isRESASSuccessRawResponse(res))
  )
}

/**
 * 429 Too Many Requestsや通信の失敗によるエラーを含んだRESAS APIのレスポンスの型
 * @template T - 取得したい情報のJsonの型
 */
export type RESASResponse<T = void> =
  | RESASSuccessResponse<T>
  | RESASErrorResponse

/**
 * 都道府県情報の型
 * @property prefCode - RESAS APIで各都道府県の情報をリクエストするためのID
 * @property prefCode - 都道府県名
 */
export type Prefecture = {
  prefCode: number
  prefName: string
}
