import { parseCookies } from 'nookies'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import useBreakpoint from 'use-breakpoint'
import { useOrder } from '../lib/useOrder'

const BREAKPOINTS = { mobile: 0, tablet: 768, large: 1024, desktop: 1280 }
const AppContext = createContext()

export function AppWrapper({ children, general, loading, setLoading }) {
  const cookies = parseCookies()
  function ease(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b
  }
  const breakpointData = useBreakpoint(BREAKPOINTS, 'desktop')
  const height = (screen) =>
    ({ desktop: 700, large: 600, tablet: 500, mobile: 400 }[screen])
  const [cart, setCart] = useState([])
  const [order, setOrder] = useState({})
  const [user, setUser] = useState(cookies.user)
  const sharedState = {
    breakpointData,
    general,
    height,
    ease,
    user,
    setUser,
    cart,
    setCart,
    order,
    setOrder,
    loading,
    setLoading
  }

  const requestOrder = useCallback(async () => {
    setLoading(true)
    const order = await useOrder(user)
    setOrder(order)
    setCart(order?.products || [])
    setLoading(false)
  }, [user])

  useEffect(() => requestOrder(), [requestOrder])

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
