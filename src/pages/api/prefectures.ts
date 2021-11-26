import { NextApiRequest, NextApiResponse } from 'next'
import { getPrefectures } from 'utils/resas'
import { Prefecture, RESASResponse } from 'utils/resas/types'

/**
 * RESAS APIのapi/v1/prefecturesのラッパー
 *
 * https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
 */
const prefecturesAPI = async (
  _: NextApiRequest,
  res: NextApiResponse<RESASResponse<Prefecture[]>>
) => {
  const prefectures = await getPrefectures()
  res.status(200).json(prefectures)
}

export default prefecturesAPI
