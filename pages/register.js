import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react'
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import Logo from '../components/Logo';
import useSEO from '../lib/useSEO';
import { NextSeo } from 'next-seo';

function Register() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const handleChangeEmail = ({ target }) => setEmail(target.value);
    const handleChangeUsername = ({ target }) => setUsername(target.value);
    const handleChangePassword = ({ target }) => setPassword(target.value);
    const handleRegister = async (e) => {
        if (username.length > 0 && password.length > 0 && email.length > 0) {
            setLoading(true);
            document.documentElement.style.opacity = '0.5';
            try {

                e.preventDefault();
                const { data } = await axios.post('/api/register', {
                    username,
                    password,
                    email
                });
                if (data.success) {
                    router.push('/login');
                }
            } catch (_) {
                setError('Ocurrio un error en el servidor')
            }
            document.documentElement.style.opacity = '1';
            setLoading(false);
        }
    }
    const seoInfo = useSEO('register');
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
                            <label htmlFor="email" className="sr-only">Correo</label>
                            <input value={email} onChange={handleChangeEmail} id="email" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Correo" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input value={password} onChange={handleChangePassword} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Contraseña" />
                        </div>
                    </div>
                    {error && <ErrorMessage error={error} />}
                    <div>
                        <button type="button" onClick={handleRegister} className="group flex items-center justify-center space-x-4 border border-eden bg-eden text-base lg:text-xl text-white rounded-md w-full p-1 my-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
                            <span>Crear una cuenta</span>
                        </button>
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

export default Register
