import axios from 'axios'

export const useOrder = async (user) => {
  const { data } = user ? await axios.get('/api/order', { user }) : {}
  return data
}
