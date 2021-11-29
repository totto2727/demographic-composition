import { NextApiRequest, NextApiResponse } from 'next'
import { getPopulationCompositionPerYear } from 'utils/resas'
import { PopulationCompositionPerYear, RESASResponse } from 'utils/resas/types'

/**
 * RESAS APIのapi/v1/population/composition/perYearのラッパー
 *
 * パスパラメータとして都道府県番号の配列を受け取る
 * 都道府県番号と紐付けたオブジェクトを返す
 *
 * https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
 */
const populationCompositionPerYearAPI = async (
  req: NextApiRequest,
  res: NextApiResponse<
    RESASResponse<{ [key: number]: PopulationCompositionPerYear }>
  >
) => {
  const queryPrefCode = req.query.prefCode ?? req.query['prefCode[]']
  if (!queryPrefCode) {
    res.status(400).json({ type: 'error', isRESASError: false })
    return
  }
  const prefCodes =
    typeof queryPrefCode === 'string'
      ? [Number(queryPrefCode)]
      : queryPrefCode.map(Number)

  const responses: { [key: number]: PopulationCompositionPerYear } = {}

  for (const prefCode of prefCodes) {
    const response = await getPopulationCompositionPerYear(prefCode)
    if (response.type === 'success') {
      responses[prefCode] = response.result
    } else {
      res.status(404).json(response)
      return
    }
  }

  res.status(200).json({ type: 'success', result: responses })
}

export default populationCompositionPerYearAPI
