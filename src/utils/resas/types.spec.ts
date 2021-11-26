import RESAS_403_ERROR_RAW_RESPONSE from './__mock__/resas403ErrorRawResponse'
import RESAS_SUCCESS_RAW_RESPONSE from './__mock__/resasSuccessRawResponse'
import { isRESASErrorRawResponse, isRESASSuccessRawResponse } from './types'

describe('RESAS Type Guard', () => {
  it('RESASSuccessRawResponse Testcase', () => {
    const arg = RESAS_SUCCESS_RAW_RESPONSE
    expect(isRESASSuccessRawResponse(arg)).toBe(true)
    expect(isRESASErrorRawResponse(arg)).toBe(false)
  })

  it('RESAS403ErrorRawResponse Testcase', () => {
    const arg = RESAS_403_ERROR_RAW_RESPONSE
    expect(isRESASSuccessRawResponse(arg)).toBe(false)
    expect(isRESASErrorRawResponse(arg)).toBe(true)
  })
})
