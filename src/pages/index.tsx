import PopulationPerYearChart from 'components/population-per-year-chart'
import PrefectureCheckboxes from 'components/prefecture-checkboxes'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import useAxios, { PREFETURES_FRONTEND_PATH } from 'utils/hooks/useAxios'
import useCheckedPrefectures from 'utils/hooks/useCheckedPrefectures'
import { Prefecture, RESASSuccessResponse } from 'utils/resas/types'

import styles from './index.module.css'

const Home: NextPage = () => {
  const { populationPerYear, ...func } = useCheckedPrefectures()

  const { data, isLoading } = useAxios<RESASSuccessResponse<Prefecture[]>>(
    PREFETURES_FRONTEND_PATH
  )

  const prefectures = data ? data.result : []

  return (
    <>
      <Head>
        <title>全国の人口推移</title>
        <meta
          name='description'
          content='全国の人口推移をグラフで比較できます。'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles.container}>
        <div className={styles.checkboxes}>
          {data ? (
            <PrefectureCheckboxes prefectures={data.result} {...func} />
          ) : isLoading ? (
            <>読込中</>
          ) : (
            <>エラー</>
          )}
        </div>

        <div className={styles.chart}>
          <PopulationPerYearChart
            populationPerYear={populationPerYear}
            prefectures={prefectures}
          />
        </div>
      </div>
    </>
  )
}

export default Home
