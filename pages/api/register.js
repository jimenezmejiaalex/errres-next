import axios from 'axios'
import { authOBJ } from '../../lib/utils'

export default async (req, res) => {
  try {
    const { username, email, password } = req.body
    const userData = await axios.get(
      `${process.env.SERVER}/users/${username}`,
      authOBJ
    )
    if (userData.data.length !== 0) {
      return res
        .status(400)
        .json({ status: 'error', error: 'El usuario ya existe' })
    }
    const userDataEmail = await axios.get(
      `${process.env.SERVER}/users/email/${email}`,
      authOBJ
    )
    if (userDataEmail.data.length !== 0) {
      return res
        .status(400)
        .json({ status: 'error', error: 'El correo ya existe' })
    }
    const { status, statusText } = await axios.post(
      `${process.env.ORIGIN}/user/register?_format=json`,
      {
        name: { value: username },
        mail: { value: email },
        pass: { value: password }
      },
      authOBJ
    )
    if (status === 200 && statusText === 'OK') {
      res.status(200).json({ success: true })
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({ status: 'error', error: 'Error en el servidor' })
  }
}
