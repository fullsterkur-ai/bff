import axios from 'axios'

const client = axios.create({
  baseURL: process.env.LIFT_ANALYZER_SERVICE_URI,
})

const getServiceDetails = async () => {
  const res = await client.get('/')
  return res.data
}

const getHealth = async () => {
  const res = await client.get('/health')
  return res.data
}

export default {
  getServiceDetails,
  getHealth,
}
