import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/login'

const login = async (credentials) => {
  // console.log('Credenciales recibidas: ', credentials)
  const response = await axios.post(baseUrl, credentials)
  // console.log('Respuesta del servidor: ', response.data)
  // return 'Hola desde servicio de login'
  return response.data
}

export default login