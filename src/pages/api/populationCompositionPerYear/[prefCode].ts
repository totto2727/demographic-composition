import { NextApiRequest, NextApiResponse } from 'next'
import { getPopulationCompositionPerYear } from 'utils/resas'
import { PopulationCompositionPerYear, RESASResponse } from 'utils/resas/types'

/**
 * RESAS APIのapi/v1/population/composition/perYearのラッパー
 *
 * パスパラメータとして都道府県番号を受け取る
 *
 * https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
 */
const populationCompositionPerYearAPI = async (
  req: NextApiRequest,
  res: NextApiResponse<RESASResponse<PopulationCompositionPerYear>>
) => {
  const populationCompositionPerYear = await getPopulationCompositionPerYear(
    Number(req.query.prefCode)
  )
  res.status(200).json(populationCompositionPerYear)
}

export default populationCompositionPerYearAPI
