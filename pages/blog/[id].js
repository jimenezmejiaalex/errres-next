import axios from 'axios'
import React from 'react'
import { useAppContext } from '../../context/state'
import { NextSeo } from 'next-seo'
import useSEO from '../../lib/useSEO'
import { authOBJ } from '../../lib/utils'

function BlogItem({ image, images = [], title, body = '' }) {
  const { breakpointData, height } = useAppContext()
  const { breakpoint } = breakpointData
  const seoInfo = useSEO('blog')
  return (
    <main className="flex flex-col justify-center items-center mx-8 md:mx-12 lg:mx-32 xl:mx-56 my-4 shadow bg-gray-100 rounded">
      <NextSeo
        title={title}
        description={`${body.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 150)}${
          body.length > 150 ? '...' : ''
        }`}
        canonical={seoInfo.url}
        openGraph={{
          url: seoInfo.url,
          title: title,
          description: `${body
            .replace(/<\/?[^>]+(>|$)/g, '')
            .substring(0, 150)}${body.length > 150 ? '...' : ''}`,
          images: [
            {
              url: image
                ? `${process.env.NEXT_PUBLIC_SERVER_IMAGES}${
                    image?.media_image || ''
                  }`
                : ''
            }
          ],
          site_name: 'Errres'
        }}
      />
      <img
        className="max-w-4xl w-full object-cover object-center pb-4 h-64 m-2"
        style={{ height: `${height(breakpoint)}px` }}
        src={`${process.env.NEXT_PUBLIC_SERVER_IMAGES}${
          image?.media_image || ''
        }`}
        alt={title}
      />
      <div className="mx-6 md:mx-20 lg:mx-40 flex flex-col justify-center items-center">
        <h2 className=" text-3xl lg:text-4xl text-eden py-4">{title}</h2>
        <div
          className="text-leather"
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
        <div className="flex flex-wrap -mx-4">
          {images.map((item) => (
            <img
              key={item.id}
              alt={item.title}
              className="p-4"
              src={`${process.env.NEXT_PUBLIC_SERVER_IMAGES}${
                item?.media_image || ''
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export const getStaticPaths = async () => {
  const { data } = await axios.get(`${process.env.SERVER}/blog/all`)
  const paths = data.map((item) => ({
    params: { id: item.id }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const { data } = await axios.get(
    `${process.env.SERVER}/blog/${params.id}`,
    authOBJ
  )
  if (data && data.length) {
    return {
      props: {
        ...data[0]
      },
      revalidate: 60
    }
  } else {
    return {
      notFound: true
    }
  }
}

export default BlogItem
