import '../styles/globals.css'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import axios from 'axios'
import React, { useState } from 'react'
import Router from 'next/router'
import { AppWrapper } from '../context/state'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import { authOBJ } from '../lib/utils'

function MyApp({ Component, pageProps, general }) {
  const [loading, setLoading] = useState(false)

  Router.events.on('routeChangeStart', () => setLoading(true))
  Router.events.on('routeChangeComplete', () => setLoading(false))
  Router.events.on('routeChangeError', () => setLoading(false))

  return (
    <AppWrapper general={general} loading={loading} setLoading={setLoading}>
      <div
        style={{
          backgroundImage: general.background
            ? `url(${process.env.NEXT_PUBLIC_SERVER_IMAGES}${general.background.media_image})`
            : 'white'
        }}
      >
        <div className="sticky top-0 z-50" style={{ backgroundColor: 'white' }}>
          <div className="flex place-content-between items-center my-10 mx-8 md:mx-12 lg:mx-32 xl:mx-56">
            <Logo />
            <div className="flex items-baseline lg:space-x-16">
              <Header />
            </div>
          </div>
        </div>
        {loading && <Loading />}
        <div className={`my-10 overflow-hidden ${loading ? 'opacity-75' : ''}`}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </AppWrapper>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { data } = await axios.get(`${process.env.SERVER}/general`, authOBJ)
  const currencydata = await axios.get('https://tipodecambio.paginasweb.cr/api')
  const initialProps = {
    ...data[0],
    tipoCambio: currencydata.data
  }
  return {
    general: initialProps
  }
}
export default MyApp
