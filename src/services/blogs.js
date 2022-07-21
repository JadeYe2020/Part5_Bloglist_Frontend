import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  
  // console.log('token in setToken', token)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  // console.log('token in create', token)
  
  const config = {
    headers: { Authorization: token }
  }

  console.log('config', config)

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { setToken, getAll, create }