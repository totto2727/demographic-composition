import React from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PopulationCompositionPerYear, Prefecture } from 'utils/resas/types'

/**
 * 都道府県人口情報の折れ線グラフ
 *
 * @param props
 * @param props.prefectures - 都道府県
 * @param props.populationPerYear - RESAS APIから取得した人口情報
 */
const PopulationPerYearChart: React.FC<{
  populationPerYear: { [key in number]: PopulationCompositionPerYear }
  prefectures: Prefecture[]
}> = ({ populationPerYear, prefectures }) => {
  /**
   * 引数のオブジェクトのキーから都道府県番号の配列を取得
   */
  const checkedPrefectures = Object.keys(populationPerYear).map(Number)

  /**
   * グラフの横軸とする年度の配列
   */
  const years =
    checkedPrefectures.length !== 0
      ? populationPerYear[checkedPrefectures[0]].data[0].data.map((v) => v.year)
      : []

  /**
   * 都道府県番号をキーとする都道府県名のオブジェクト
   */
  const prefNameFromPrefCode = Object.fromEntries(
    prefectures.map(({ prefCode, prefName }) => [prefCode, prefName])
  )

  /**
   * 都道府県と年をキーとした全人口オブジェクト
   */
  const totalPoplations: {
    // キーは都道府県コード
    [key in number]: {
      // キーは年度
      [key in number]: number
    }
  } = Object.fromEntries(
    checkedPrefectures.map((prefCode) => [
      prefCode,
      Object.fromEntries(
        populationPerYear[prefCode].data[0].data.map((v) => [v.year, v.value])
      ),
    ])
  )

  /**
   * グラフプロット用のデータ
   *
   * 年度ごとに各県の全人口を格納したオブジェクトの配列
   */
  const plotDatas: { year: number; [key: string]: number }[] = years.map(
    (year) => {
      const plotData: { year: number; [key: string]: number } = {
        year,
        ...Object.fromEntries(
          checkedPrefectures.map((prefCode) => {
            const prefectureName = prefNameFromPrefCode[prefCode]
            return [prefectureName, totalPoplations[prefCode][year]]
          })
        ),
      }
      return plotData
    }
  )

  /**
   * グラフ用の9色のカラーコード
   */
  const colors = [
    '#332288',
    '#88CCEE',
    '#44AA99',
    '#117733',
    '#999933',
    '#DDCC77',
    '#CC6677',
    '#882255',
    '#AA4499',
  ]

  /**
   * 各都道府県の折れ線コンポーネントの配列
   *
   * 色は都道府県コードをカラーコードの個数で割った余りで指定
   */
  const lines = checkedPrefectures.map((prefCode) => (
    <Line
      type='monotone'
      dataKey={prefNameFromPrefCode[prefCode]}
      stroke={colors[prefCode % colors.length]}
      key={prefCode}
    />
  ))

  return (
    <ResponsiveContainer minWidth={300} minHeight={300} width='95%'>
      <LineChart
        data={plotDatas}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <XAxis dataKey='year' tick={{ fontSize: '.7rem' }} unit='年度' />
        <YAxis tick={{ fontSize: '.7rem' }} unit='人' />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray='3 3' />
        {lines}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default PopulationPerYearChart
