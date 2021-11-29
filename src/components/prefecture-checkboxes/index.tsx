import { useCallback, useState } from 'react'
import useCheckedPrefecture from 'utils/hooks/useCheckedPrefectures'
import { Prefecture } from 'utils/resas/types'

import styles from './index.module.css'

/**
 * 都道府県のチェックボックス
 *
 * @param props
 * @param props.prefecture - 都道府県
 * @param props.isChecked - チェック済みか否か
 * @param props.checkPrefecture - useCheckedPrefectureから生成されたチェック関数
 */
const PrefectureCheckbox: React.FC<{
  prefecture: Prefecture
  isChecked: boolean
  checkPrefecture: ReturnType<typeof useCheckedPrefecture>['checkPrefecture']
}> = ({ prefecture, isChecked, checkPrefecture }) => {
  const [disabled, setDisabled] = useState(false)

  const id = `input-${prefecture.prefCode}-${prefecture.prefName}`

  const handleChange = useCallback(() => {
    setDisabled(true)
    checkPrefecture(prefecture)
    setDisabled(false)
  }, [checkPrefecture, prefecture])

  return (
    <div>
      <input
        id={id}
        type='checkbox'
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
      />
      <label
        className={`${styles['prefecture-checkbox-label']}`}
        htmlFor={id}
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        {prefecture.prefName}
      </label>
    </div>
  )
}

/**
 * 都道府県のチェックボックス
 *
 * @param props
 * @param props.prefectures - 都道府県の配列
 * @param props.isCheckedPrefecture - useCheckedPrefectureから生成されたチェック判定関数
 * @param props.checkPrefecture - useCheckedPrefectureから生成されたチェック関数
 */
const PrefectureCheckboxes: React.FC<
  {
    prefectures: Prefecture[]
  } & Pick<
    ReturnType<typeof useCheckedPrefecture>,
    'checkPrefecture' | 'isCheckedPrefecture'
  >
> = ({ prefectures, checkPrefecture, isCheckedPrefecture }) => {
  const checkboxes = prefectures.map((prefecture) => (
    <PrefectureCheckbox
      prefecture={prefecture}
      checkPrefecture={checkPrefecture}
      isChecked={isCheckedPrefecture(prefecture)}
      key={prefecture.prefCode}
    />
  ))

  return <div className={styles['prefecture-checkboxes']}>{checkboxes}</div>
}

export default PrefectureCheckboxes
