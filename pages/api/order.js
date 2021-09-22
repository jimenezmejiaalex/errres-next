import axios from 'axios'
import { parseCookies } from 'nookies'
import { authOBJ, createOrder, createProduct } from '../../lib/utils'

const getCartData = (values) => {
  if (values.length && values.every((v) => v?.data?.length !== 0)) {
    return values.map(({ data }) => ({
      ...data[0],
      image: `${process.env.SERVER_IMAGES}${data[0].image.media_image}`
    }))
  } else return []
}

export default async (req, res) => {
  const { method } = req
  const { cart, username, title, description, token, purchaseInfo } = req.body
  switch (method) {
    case 'POST':
      try {
        const userData = await axios.get(
          `${process.env.SERVER}/users/${username}`
        )
        const order = createOrder(title, description, cart, userData.data[0])
        const response = await axios.post(
          `${process.env.ORIGIN}/node?_format=json`,
          order,
          {
            headers: { 'X-CSRF-Token': token },
            auth: {
              username: process.env.API_USER,
              password: process.env.API_PASS
            }
          }
        )
        const orderData = await axios.get(
          `${process.env.SERVER}/order-by-id/${response.data.nid[0].value}`
        )
        const objectResponse = orderData.data[0]
        delete objectResponse.products
        res.status(200).json(objectResponse)
      } catch (error) {
        console.error(error)
      }
      break
    case 'PATCH':
      {
        const { id } = req.body
        try {
          let orderData = await axios.get(
            `${process.env.SERVER}/order-by-id/${id}`
          )
          const userData = await axios.get(
            `${process.env.SERVER}/users/${username}`
          )
          const order = createOrder(
            title,
            description,
            cart,
            userData.data[0],
            !purchaseInfo,
            purchaseInfo
              ? {
                  id: purchaseInfo.receipt,
                  idRef: purchaseInfo.referenceID
                }
              : null
          )
          if (purchaseInfo) {
            const pendingUnpublishProducts = cart.map((product) =>
              axios.patch(
                `${process.env.ORIGIN}/node/${product.id}?_format=json`,
                createProduct(product.id, product.uid, false),
                {
                  headers: { 'X-CSRF-Token': token },
                  auth: {
                    username: process.env.API_USER,
                    password: process.env.API_PASS
                  }
                }
              )
            )
            const response = await Promise.all(pendingUnpublishProducts).then(
              (values) => values.map(({ data }) => data)
            )
          }
          await axios.patch(
            `${process.env.ORIGIN}/node/${id}?_format=json`,
            order,
            {
              headers: { 'X-CSRF-Token': token },
              auth: {
                username: process.env.API_USER,
                password: process.env.API_PASS
              }
            }
          )
          orderData = await axios.get(`${process.env.SERVER}/order-by-id/${id}`)
          const objectResponse = orderData.data[0]
          delete objectResponse.products
          res.status(200).json(objectResponse)
        } catch (error) {
          const errorMessage =
            error?.response?.data || 'Ocurrio un error en el servidor'
          console.error(error, errorMessage)
          res.status(400).json({ error: 'Error en el servidor' })
        }
      }
      break
    case 'GET':
      try {
        const cookies = parseCookies({ req })
        const { user } = cookies
        const userData = await axios.get(
          `${process.env.SERVER}/users/${user}`,
          authOBJ
        )
        const { id } = userData.data[0]
        const orderData = await axios.get(
          `${process.env.SERVER}/order/${id}`,
          authOBJ
        )
        const promises = orderData.data[0]?.products.map((product) =>
          axios.get(`${process.env.SERVER}/store/${product.id}`, authOBJ)
        )
        const cart = promises
          ? await Promise.all(promises).then(getCartData)
          : []
        res.status(200).json({ ...orderData.data[0], products: cart })
      } catch (error) {
        console.error(error)
        res.status(400).json({ status: 'error', error: 'Error en el servidor' })
      }
      break
    default:
      break
  }
}
