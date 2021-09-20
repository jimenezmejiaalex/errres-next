import axios from 'axios'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    }
  }
}

export default async (req, res) => {
  const { binary, name } = req.body
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_ORIGIN}/file/upload/node/order/field_voucher?_format=json`,
      binary,
      {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `file; filename="${name}"`
        },
        auth: {
          username: process.env.NEXT_PUBLIC_API_USER,
          password: process.env.NEXT_PUBLIC_API_PASS
        }
      }
    )
    res.status(200).json(data)
  } catch (error) {
    const errorMessage =
      error?.response?.data || 'Ocurrio un error en el servidor'
    console.error(error, errorMessage)
    return res.status(400).end()
  }
}
