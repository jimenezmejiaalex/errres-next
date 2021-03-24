import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Logo from '../../components/Logo'
import { setCookie } from 'nookies';
import Link from 'next/link';
import Loading from '../../components/Loading';
import useSEO from '../../lib/useSEO';
import { NextSeo } from 'next-seo';

function Login() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChangeUsername = ({ target }) => setUsername(target.value);
    const handleChangePassword = ({ target }) => setPassword(target.value);
    const handleLogin = async (e) => {
        if (username.length > 0 && password.length > 0) {
            e.preventDefault();
            setLoading(true);
            document.documentElement.style.opacity = '0.5';
            try {
                const { data } = await axios.post('/api/auth', {
                    username,
                    password
                })
                if (data.success) {
                    setCookie(null, 'user', data.user.username, {
                        maxAge: 30 * 24 * 60 * 60,
                        path: '/',
                    })
                    setCookie(null, 'userToken', data.user.token, {
                        maxAge: 30 * 24 * 60 * 60,
                        path: '/',
                    })
                    setCookie(null, 'logoutToken', data.user.logoutToken, {
                        maxAge: 30 * 24 * 60 * 60,
                        path: '/',
                    })
                    router.push('/');
                }
            } catch (_) {
                setError('Ocurrio un error en el servidor')
            }
            document.documentElement.style.opacity = '1';
            setLoading(false);
        }
    }
    const seoInfo = useSEO('login');
    return (
        <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <NextSeo
                title={seoInfo.title}
                description={seoInfo.description}
                canonical={seoInfo.url}
                openGraph={{
                    url: seoInfo.url,
                    title: seoInfo.title,
                    description: seoInfo.description,
                    images: [{ url: seoInfo.image },],
                    site_name: 'Errres',
                }}
            />
            <div className="max-w-md w-full space-y-8">
                {loading && <Loading />}
                <div className="flex justify-center">
                    <Logo />
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="user" className="sr-only">Usuario</label>
                            <input value={username} onChange={handleChangeUsername} id="user" name="user" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Usuario" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input value={password} onChange={handleChangePassword} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Contraseña" />
                        </div>
                    </div>
                    {error && <ErrorMessage error={error} />}
                    <div>
                        <button type="button" onClick={handleLogin} className="group flex items-center justify-center space-x-4 border border-eden bg-eden text-base lg:text-xl text-white rounded-md w-full p-1 my-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
                            <span>Entrar</span>
                            <svg width="30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <div className="text-sm">
                            <Link href="/register">
                                <a className="font-medium text-gray-600 hover:text-gray-700 hover:underline">
                                    Crear una cuenta
                                </a>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
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

export default Login
