import MockAdapter from 'axios-mock-adapter'

import {
  PREFECTURE_PATH,
  RESAS_ENDPOINT,
  getPrefectures,
  removeNullFromErrorMessage,
  resasAxiosInstanse,
} from '.'
import RESAS_403_ERROR_RAW_RESPONSE from './__mock__/resas403ErrorRawResponse'
import RESAS_429_ERROR_RAW_RESPONSE from './__mock__/resas429ErrorRawResponse'
import RESAS_SUCCESS_RAW_RESPONSE from './__mock__/resasSuccessRawResponse'
import { Prefecture, RESASErrorResponse, RESASSuccessResponse } from './types'
import { uriJoin } from './uriJoin'

describe('RESAS API Request', () => {
  let mock: MockAdapter

  beforeAll(() => {
    mock = new MockAdapter(resasAxiosInstanse)
  })

  afterEach(() => {
    mock.reset()
  })

  it('Succeeded to access the server:Request Prefectures Success Testcase', async () => {
    const data = RESAS_SUCCESS_RAW_RESPONSE
    const expectResult: RESASSuccessResponse<Prefecture[]> = {
      type: 'success',
      ...data,
      message: undefined,
    }

    mock.onGet(uriJoin(RESAS_ENDPOINT, PREFECTURE_PATH)).replyOnce(200, data)

    const result = await getPrefectures()
    expect(result).toStrictEqual(expectResult)
  })

  it('Succeeded to access the server:Request Prefectures Forbidden Error Testcase', async () => {
    const data = RESAS_403_ERROR_RAW_RESPONSE
    const expectResult: RESASErrorResponse = {
      type: 'error',
      isRESASError: true,
      response: removeNullFromErrorMessage(data),
    }

    // RESAS APIのAPI Keyを間違えてた場合でも、レスポンスヘッダーは200 OKとなる
    mock.onGet(uriJoin(RESAS_ENDPOINT, PREFECTURE_PATH)).replyOnce(200, data)

    const result = await getPrefectures()
    expect(result).toStrictEqual(expectResult)
  })

  it('Failed to access the server:429 Too Many Requests Error Testcase', async () => {
    const data = RESAS_429_ERROR_RAW_RESPONSE
    const expectResult: RESASErrorResponse = {
      type: 'error',
      isRESASError: false,
      response: removeNullFromErrorMessage(data),
    }

    // 429 Too Many Requests Errorの場合は、レスポンスヘッダーは429 Too Many Requestsとなる
    mock.onGet(uriJoin(RESAS_ENDPOINT, PREFECTURE_PATH)).replyOnce(429, data)

    const result = await getPrefectures()
    expect(result).toStrictEqual(expectResult)
  })
})

// TODO エラー時のテスト追加
