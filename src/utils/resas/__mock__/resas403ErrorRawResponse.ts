import { RESASErrorRawResponse } from '../types'

const RESAS_403_ERROR_RAW_RESPONSE: Exclude<RESASErrorRawResponse, string> = {
  statusCode: '403',
  message: 'Forbidden.',
  description: '',
}

export default RESAS_403_ERROR_RAW_RESPONSE
