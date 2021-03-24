import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SEO from '../components/SEO';
import { useAppContext } from '../context/state'
import useSEO from '../lib/useSEO';

function Gracias() {
    const { general } = useAppContext();
    const { thanksTitle, thanksSubtitle } = general;
    const seoInfo = useSEO('thanks');
    return (
        <main className="text-center my-40 mx-8 md:mx-12 lg:mx-32 xl:mx-56">
            <Head>
                <SEO
                    title={seoInfo.title}
                    description={seoInfo.description}
                    imageUrl={seoInfo.image}
                    url={seoInfo.url}
                />
            </Head>
            <h1 className="text-6xl text-eden pb-16">{thanksTitle}</h1>
            <p className="text-leather">{thanksSubtitle}</p>
        </main>
    )
}

export const getServerSideProps = async (ctx) => {


    return {
        props: {
            data: null
        }
    }
}

export default Gracias
