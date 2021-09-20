import axios from 'axios'
import Link from 'next/link'
import { destroyCookie, parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../context/state'
import Loading from '../Loading'

function UserInfo() {
  const { cart } = useAppContext()
  const cartLength = cart.length
  const cookies = parseCookies()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState(cookies.user)

  const handleLogout = async () => {
    setLoading(true)
    document.documentElement.style.opacity = '0.5'
    const { status } = await axios.post('/api/logout')
    if (status) {
      destroyCookie(null, 'user')
      destroyCookie(null, 'userToken')
      destroyCookie(null, 'logoutToken')
    }
    setLoading(false)
    document.documentElement.style.opacity = '1'
  }

  useEffect(() => {
    setUsername(cookies.user)
  }, [cookies.user])

  return (
    <div>
      {loading && <Loading />}
      {username && (
        <div className="flex space-x-4">
          <Link href="/cart">
            <a className="flex text-leather text-lg space-x-1 hover:text-leather-700 cursor-pointer">
              <svg
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <h5>{cartLength}</h5>
            </a>
          </Link>
          <div className="flex space-x-1 text-eden items-center">
            <h3 className="text-sm text-eden">{username}</h3>
            <svg
              onClick={handleLogout}
              className="hover:text-leather cursor-pointer"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
        </div>
      )}
      {!username && (
        <Link href="/login">
          <a className="flex text-lg cursor-pointer items-center text-eden font-extralight justify-center mt-10 lg:mt-0">
            <svg
              width="17"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="bg-white border-line-bottom">Iniciar</span>
          </a>
        </Link>
      )}
    </div>
  )
}

export default UserInfo
