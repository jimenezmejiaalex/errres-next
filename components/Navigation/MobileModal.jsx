import Link from 'next/link'
import React from 'react'
import UserInfo from '../User/UserInfo'

function MobileModal({setshow}) { 
    return (
        <div style={{backgroundColor: "white"}} className="h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-white">
            <div className="absolute top-10 right-10 text-eden cursor-pointer hover:text-leather" onClick={()=> setshow(false)}>
                <svg width="40px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <ul className="h-48 text-center space-y-4">
                <li onClick={()=> setshow(false)} className="cursor-pointer text-2xl text-eden hover:text-leather">
                    <Link href="/">
                        <a>Inicio</a>
                    </Link>
                </li>
                <li onClick={()=> setshow(false)} className="cursor-pointer text-2xl text-eden hover:text-leather">
                    <Link href="/tienda">
                        <a>Tienda</a>
                    </Link>
                </li>
                <li onClick={()=> setshow(false)} className="cursor-pointer text-2xl text-eden hover:text-leather">
                    <Link href="/blog">
                        <a>Blog</a>
                    </Link>
                </li>
                <li onClick={()=> setshow(false)} className="cursor-pointer text-2xl text-eden hover:text-leather">
                    <Link href="/informacion">
                        <a>Información</a>
                    </Link>
                </li>
                <li>
                    {/* <Link href="/login">
                        <a className="flex text-lg cursor-pointer items-center text-eden font-extralight justify-center pt-6">
                            <svg width="17" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="bg-white">Iniciar</span>
                        </a>
                    </Link> */}
                    <UserInfo/>
                </li>
                    
            </ul>
        </div>
    )
}

export default MobileModal
