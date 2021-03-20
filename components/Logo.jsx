import Link from 'next/link';
import React from 'react'
import { useAppContext } from '../context/state'

function Logo() {
    const {general} = useAppContext();
    const {logo} = general;
    return (
        <Link href="/">
            <div className=" w-32 lg:w-48 cursor-pointer">
                <img 
                    src={`${process.env.NEXT_PUBLIC_SERVER_IMAGES}${logo.media_image}`} 
                    alt={`${logo.title}`}/>
            </div>
        </Link>
    )
}

export default Logo
