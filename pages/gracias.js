import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/state'

function Gracias() {
    const { general } = useAppContext();
    const { thanksTitle, thanksSubtitle } = general;
    return (
        <div className="text-center my-40 mx-8 md:mx-12 lg:mx-32 xl:mx-56">
            <h1 className="text-6xl text-eden pb-16">{thanksTitle}</h1>
            <p className="text-leather">{thanksSubtitle}</p>
        </div>
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
