import axios from 'axios'
import { authOBJ } from '../../lib/utils'

export default async (req, res) => {
  const { method } = req
  try {
    switch (method) {
      case 'POST':
        {
          const { username, password } = req.body
          if (!username || !password) {
            return res.status(400).json({
              status: 'error',
              error: 'Error faltan campos por llenar'
            })
          }
          // Exist User
          const userData = await axios.get(
            `${process.env.SERVER}/users/${username}`,
            authOBJ
          )
          if (userData.data.length === 0) {
            res
              .status(400)
              .json({ status: 'error', error: 'Usuario no encontrado' })
          }
          // /user/login?_format=json&token=logout_token
          axios.defaults.withCredentials = true
          const { data } = await axios.post(
            `${process.env.ORIGIN}/user/login?_format=json&token=logout_token`,
            {
              name: username,
              pass: password
            }
          )
          if (!data.csrf_token) {
            res.status(400).json({
              status: 'error',
              error: 'Usuario o contraseñas incorrectos'
            })
          } else {
            res.status(200).json({
              success: true,
              user: {
                username: data.current_user.name,
                token: data.csrf_token,
                logoutToken: data.logout_token
              }
            })
          }
        }
        break
      default:
        break
    }
  } catch (error) {
    console.error(error)
  }
}
