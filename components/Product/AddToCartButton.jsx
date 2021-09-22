import axios from 'axios'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'
import { useAppContext } from '../../context/state'
import Loading from '../Loading'

function AddToCartButton({ item }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { setCart, cart, order, setOrder } = useAppContext()
  const exists = cart.some((p) => p.id === item.id)
  const handleRemoveOfCart = async () => {
    setLoading(true)
    const { user, userToken } = parseCookies()
    const newCart = cart.filter((p) => p.id !== item.id)
    const body = {
      id: order.id,
      cart: newCart,
      username: user,
      title: order.title,
      description: order.description,
      token: userToken
    }
    const response = await axios.patch('/api/order', body)
    setOrder(response.data)
    setCart(newCart)
    setLoading(false)
  }
  const handleAddToCart = async () => {
    const { user, userToken } = parseCookies()
    if (!user) {
      router.push('/login')
    } else {
      setLoading(true)
      const body = {
        cart: [...cart, item],
        username: user,
        title: order?.title || Date.now(),
        description: order?.description || '',
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
      setLoading(false)
    }
  }
  return (
    <button
      onClick={exists ? handleRemoveOfCart : handleAddToCart}
      type="button"
      className="border border-eden bg-eden hover:underline text-base lg:text-xl text-white rounded-md w-full p-1 my-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
    >
      {exists ? 'Eliminar de Carrito' : 'Agregar al carrito'}
      {loading && <Loading />}
    </button>
  )
}

export default AddToCartButton
