import axios from 'axios'
import { authOBJ } from '../../lib/utils'

export default async (req, res) => {
  try {
    axios.defaults.withCredentials = true
    await axios.get(`${process.env.ORIGIN}/user/logout?_format=json`, authOBJ)
    res.status(200).json({ success: true })
    // if (status === 200 && statusText === 'OK') {

    // } else {
    //   res.status(400).json({
    //     status: 'error',
    //     error: 'Error de servidor al salir de la cuenta'
    //   })
    // }
  } catch (error) {
    const errorMessage =
      error?.response?.data || 'Error de servidor al salir de la cuenta'
    console.error(error, errorMessage)
    res.status(200).json({ success: true })
  }
}
