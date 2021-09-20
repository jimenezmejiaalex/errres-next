import axios from 'axios'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'
import { useAppContext } from '../../context/state'
import Loading from '../Loading'

function AddToCartButton({ item, deleteMe }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { setCart, cart, general, order, setOrder } = useAppContext()
  const handleAddToCart = async () => {
    const { user, userToken } = parseCookies()
    if (!user) {
      router.push('/login')
    } else {
      setLoading(true)
      document.documentElement.style.opacity = '0.5'
      const body = {
        cart: [...cart, item],
        username: user,
        title: general.order.title,
        description: general.order.description,
        token: userToken
      }
      let response
      if (order.id) {
        body.id = order.id
        response = await axios.patch('/api/order', body)
      } else {
        response = await axios.post('/api/order', body)
      }
      setOrder(response.data)
      setCart([...cart, item])
      deleteMe(item.id)
      document.documentElement.style.opacity = '1'
      setLoading(false)
    }
  }
  return (
    <button
      onClick={handleAddToCart}
      type="button"
      className="border border-eden bg-eden hover:underline text-base lg:text-xl text-white rounded-md w-full p-1 my-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
    >
      {' '}
      Agregar al carrito
      {loading && <Loading />}
    </button>
  )
}

export default AddToCartButton
