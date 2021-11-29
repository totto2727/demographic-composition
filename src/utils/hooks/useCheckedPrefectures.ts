import { useCallback, useState } from 'react'
import { Prefecture } from 'utils/resas/types'

/**
 * 都道府県のチェックボックスの状態を管理するためのカスタムフック
 *
 * return {チェックした都道府県の番号、チェック関数、チェック判定関数}
 */
const useCheckedPrefecture = () => {
  /**
   * チェックした都道府県の番号を記録する配列
   */
  const [checkedPrefectures, setCheckedPrefectures] = useState<
    Prefecture['prefCode'][]
  >([])

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
   * @param param.prefCode - 都道府県番号
   */
  const checkPrefecture = useCallback(
    ({ prefCode }: Pick<Prefecture, 'prefCode'>) => {
      if (isCheckedPrefecture({ prefCode })) {
        setCheckedPrefectures(checkedPrefectures.filter((v) => v !== prefCode))
      } else {
        setCheckedPrefectures([...checkedPrefectures, prefCode])
      }
    },
    [checkedPrefectures, isCheckedPrefecture]
  )

  return {
    checkedPrefectures,
    isCheckedPrefecture,
    checkPrefecture,
  }
}

export default useCheckedPrefecture
