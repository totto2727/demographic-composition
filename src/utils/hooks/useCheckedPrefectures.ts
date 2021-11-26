import { useState } from 'react'
import { Prefecture } from 'utils/resas/types'

/**
 * 都道府県のチェックボックスの状態を管理するためのカスタムフック
 *
 * return {チェックした都道府県の番号、チェック関数、アンチェック関数、チェック確認関数}
 */
const useCheckedPrefecture = () => {
  const [checkedPrefectures, setCheckedPrefectures] = useState<
    Prefecture['prefCode'][]
  >([])

  const checkPrefectures = ({ prefCode }: Prefecture) =>
    setCheckedPrefectures([...checkedPrefectures, prefCode])

  const unCheckedPrefectures = ({ prefCode }: Prefecture) =>
    setCheckedPrefectures(checkedPrefectures.filter((v) => v !== prefCode))

  const isCheckedPrefecture = ({ prefCode }: Prefecture) =>
    prefCode in checkedPrefectures

  return {
    checkedPrefectures,
    isCheckedPrefecture,
    checkPrefectures,
    unCheckedPrefectures,
  }
}

export default useCheckedPrefecture
