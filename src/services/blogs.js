import axios from 'axios'
const baseUrl = '/api/blogs'

let currentToken

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: currentToken
    }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const putBlog = async (blog) => {
  const id = blog._id
  const config = {
    headers: {
      Authorization: currentToken
    }
  }
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)

  return response.data
}

const setNewToken = (token) => {
  currentToken = 'Bearer ' + token
  console.log('Token configurado en el servicio de Blogs: ', currentToken)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setNewToken, getAll, postBlog, putBlog }