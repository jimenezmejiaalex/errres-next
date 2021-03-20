import Link from 'next/link';
import { useAppContext } from '../context/state';
function Footer() {
    const {general} = useAppContext();
    return (
        <div>
            <footer className="bg-gray-900 pt-10 sm:mt-10">
                <div className="flex justify-center">
                    <svg onClick={()=> window.scrollTo({top: 0, left: 0, behavior: 'smooth' })} className="text-white cursor-pointer" width="30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                    </svg>
                </div>
                <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
                    {/* Col-1 */}
                    <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
                    {/* Col Title */}
                    <div className="text-xs uppercase text-gray-400 font-medium mb-6">
                        Errres
                    </div>
                    {/* Links */}
                    <Link href={'/'}>
                        <img src={`${process.env.NEXT_PUBLIC_SERVER_IMAGES}${general.logo.media_image}`} alt="Inicio"/>
                    </Link>
                    </div>
                    {/* Col-2 */}
                    <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
                    {/* Col Title */}
                    <div className="text-xs uppercase text-gray-400 font-medium mb-6">
                        Social
                    </div>
                    {/* Links */}
                    <a href={general.facebook_url} className="text-xs cursor-pointer text-gray-400 font-medium mb-6 flex items-center space-x-2">
                        <img width="30" src="/facebook.svg" alt=""/>
                        <span className="text-eden font-semibold">@errres.cr</span>
                    </a>
                    <a href={general.instagram_url} className="text-xs cursor-pointer text-gray-400 font-medium mb-6 flex items-center space-x-2">
                        <img width="30" src="/instagram.svg" alt=""/>
                        <span className="text-eden font-semibold">Errres® CR</span>
                    </a>
                    <a href={general.whatsapp_url} className="text-xs cursor-pointer text-gray-400 font-medium mb-6 flex items-center space-x-2">
                        <img width="30" src="/whatsapp.svg" alt=""/>
                        <span className="text-eden font-semibold">Errres</span>
                    </a>
                    </div>
                    <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
                    {/* Col Title */}
                    <div className="text-xs uppercase text-gray-400 font-medium mb-6">
                        Productos
                    </div>
                    {/* Links */}
                    <Link href="/tienda" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <svg className="text-white" width="30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-eden cursor-pointer hover:underline">Tienda en Linea</span>
                        </div>
                    </Link>
                    </div>
                </div>
                {/* Copyright Bar */}
                <div className="pt-2">
                    <div className="flex pb-5 px-3 m-auto pt-5 
                    border-t border-gray-500 text-gray-400 text-sm 
                    flex-col md:flex-row max-w-6xl">
                    <div className="mt-2">
                        © Copyright 2021. All Rights Reserved.
                    </div>
                </div>
            </div>
            </footer>
        </div>
    )
}

export default Footer
