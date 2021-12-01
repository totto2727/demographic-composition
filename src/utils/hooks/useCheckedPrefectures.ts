import axios from 'axios'
import { useCallback, useState } from 'react'
import {
  PopulationCompositionPerYear,
  Prefecture,
  RESASResponse,
} from 'utils/resas/types'

import { POPULATION_COMPOSITION_PER_YEAR_FRONTEND_PATH } from './useAxios'

/**
 * 都道府県のチェックボックスの状態を管理するためのカスタムフック
 *
 * return {チェックした都道府県の番号、人口情報、通信中か否か、チェック関数、チェック判定関数}
 */
const useCheckedPrefecture = () => {
  /**
   * チェックした都道府県の番号を記録する配列
   */
  const [checkedPrefectures, setCheckedPrefectures] = useState<
    Prefecture['prefCode'][]
  >([])

  /**
   * 取得した人口情報の格納先
   */
  const [populationCompositionPerYear, setPopulationCompositionPerYear] =
    useState<{ [key: number]: PopulationCompositionPerYear }>({})

  /**
   * 通信の状態
   */
  const [isLoading, setIsLoading] = useState(false)

  /**
   * 引数にとった都道府県がチェックされているか判定する関数
   *
   * @param param.prefCode - 都道府県番号
   * @return 判定結果（checkedPrefecturesに含まれているか）
   */
  const isCheckedPrefecture = useCallback(
    ({ prefCode }: Pick<Prefecture, 'prefCode'>) =>
      checkedPrefectures.includes(prefCode),
    [checkedPrefectures]
  )

  /**
   * 引数にとった都道府県をチェック（アンチェック）する関数
   *
   * checkedPrefecturesに含まれていなければ追加する。
   * 含まれていた場合は削除する。
   *
   * チェックした都道府県の人口情報がなければ、RESAS APIから取得する
   * すでに取得済みの場合は通信は行わない
   *
   * @param param.prefCode - 都道府県番号
   */
  const checkPrefecture = useCallback(
    ({ prefCode }: Pick<Prefecture, 'prefCode'>) =>
      async () => {
        if (isCheckedPrefecture({ prefCode })) {
          setCheckedPrefectures(
            checkedPrefectures.filter((v) => v !== prefCode)
          )
          return
        }

        if (prefCode in populationCompositionPerYear) {
          setCheckedPrefectures([...checkedPrefectures, prefCode].sort())
          return
        }

        setIsLoading(() => true)
        await axios
          .get<RESASResponse<{ [key: number]: PopulationCompositionPerYear }>>(
            POPULATION_COMPOSITION_PER_YEAR_FRONTEND_PATH,
            {
              params: { prefCode: [prefCode] },
            }
          )
          .then((res) => {
            if (res.data.type === 'error') {
              alert('通信エラー：もう一度選択してください')
              return
            }
            setPopulationCompositionPerYear({
              ...populationCompositionPerYear,
              ...res.data.result,
            })
            setCheckedPrefectures([...checkedPrefectures, prefCode].sort())
          })
          .catch(() => {
            alert('通信エラー：もう一度選択してください')
          })
        setIsLoading(() => false)
      },
    [checkedPrefectures, isCheckedPrefecture, populationCompositionPerYear]
  )

  /**
   * チェックしている都道府県の人口情報
   */
  const populationPerYear: { [key: number]: PopulationCompositionPerYear } = {}
  checkedPrefectures.forEach(
    (prefCode) =>
      (populationPerYear[prefCode] = populationCompositionPerYear[prefCode])
  )

  return {
    checkedPrefectures,
    populationPerYear,
    isLoading,
    isCheckedPrefecture,
    checkPrefecture,
  }
}

export default useCheckedPrefecture
