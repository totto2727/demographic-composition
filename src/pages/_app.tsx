import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

import './global.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <div>
        <header className='header'>
          <h1>全国の人口推移</h1>
        </header>

        <main className='main'>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}

export default MyApp
