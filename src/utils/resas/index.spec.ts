import MockAdapter from 'axios-mock-adapter'

import {
  POPULATION_COMPOSITION_PER_YEAR_PATH,
  PREFECTURE_PATH,
  getPopulationCompositionPerYear,
  getPrefectures,
  resasAxiosInstanse,
} from '.'
import POPULATION_COMPOSITION_PER_YEAR from './__mock__/populationCompositionPerYear'
import RESAS_403_ERROR_RAW_RESPONSE from './__mock__/resas403ErrorRawResponse'
import RESAS_429_ERROR_RAW_RESPONSE from './__mock__/resas429ErrorRawResponse'
import RESAS_SUCCESS_RAW_RESPONSE from './__mock__/resasSuccessRawResponse'
import {
  PopulationCompositionPerYear,
  Prefecture,
  RESASErrorResponse,
  RESASSuccessResponse,
} from './types'

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

    mock.onGet(PREFECTURE_PATH).replyOnce(200, data)

    const result = await getPrefectures()
    expect(result).toStrictEqual(expectResult)
  })

  it('Succeeded to access the server:Request Prefectures Forbidden Error Testcase', async () => {
    const data = RESAS_403_ERROR_RAW_RESPONSE
    const expectResult: RESASErrorResponse = {
      type: 'error',
      isRESASError: true,
      status: Number(data.statusCode),
    }

    // RESAS APIのAPI Keyを間違えてた場合でも、レスポンスヘッダーは200 OKとなる
    mock.onGet(PREFECTURE_PATH).replyOnce(200, data)

    const result = await getPrefectures()
    expect(result).toStrictEqual(expectResult)
  })

  it('Failed to access the server:429 Too Many Requests Error Testcase', async () => {
    const data = RESAS_429_ERROR_RAW_RESPONSE
    const expectResult: RESASErrorResponse = {
      type: 'error',
      isRESASError: false,
      status: 429,
    }

    // 429 Too Many Requests Errorの場合は、レスポンスヘッダーは429 Too Many Requestsとなる
    mock.onGet(PREFECTURE_PATH).replyOnce(429, data)

    const result = await getPrefectures()
    expect(result).toStrictEqual(expectResult)
  })

  it('Succeeded to access the server:Request Population Composition Per Year Success Testcase', async () => {
    const data = POPULATION_COMPOSITION_PER_YEAR
    const expectResult: RESASSuccessResponse<PopulationCompositionPerYear> = {
      type: 'success',
      ...data,
      message: undefined,
    }

    mock
      .onGet(POPULATION_COMPOSITION_PER_YEAR_PATH, {
        params: {
          prefCode: 1,
          cityCode: '-',
        },
      })
      .replyOnce(200, data)

    const result = await getPopulationCompositionPerYear(1)
    expect(result).toStrictEqual(expectResult)
  })
})
