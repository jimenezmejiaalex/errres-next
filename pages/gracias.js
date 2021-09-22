import { useAppContext } from '../context/state'
import useSEO from '../lib/useSEO'
import { NextSeo } from 'next-seo'

function Gracias() {
  const { general } = useAppContext()
  const { thanksTitle, thanksSubtitle } = general
  const seoInfo = useSEO('thanks')
  return (
    <main className="text-center my-40 mx-8 md:mx-12 lg:mx-32 xl:mx-56">
      <NextSeo
        title={seoInfo.title}
        description={seoInfo.description}
        canonical={seoInfo.url}
        openGraph={{
          url: seoInfo.url,
          title: seoInfo.title,
          description: seoInfo.description,
          images: [{ url: seoInfo.image }],
          site_name: 'Errres'
        }}
      />
      <h1 className="text-6xl text-eden pb-16">{thanksTitle}</h1>
      <p className="text-leather">{thanksSubtitle}</p>
    </main>
  )
}

export const getStaticProps = async (ctx) => {
  return {
    props: {
      data: null
    }
  }
}

export default Gracias
