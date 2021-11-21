import type { AppProps } from 'next/app'
import React from 'react'

import './_app.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <header>
        {/* TODO ヘッダーを実装*/}
        ヘッダー
      </header>

      <Component {...pageProps} />

      <footer>{/* TODO フッターを実装 */}</footer>
    </>
  )
}

export default MyApp
