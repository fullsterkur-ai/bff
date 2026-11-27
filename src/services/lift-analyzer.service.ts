import axios from 'axios'

interface ServiceDetails {
  service: string
  version: string
}

interface Health {
  status: string
}

const baseURL = process.env.LIFT_ANALYZER_SERVICE_URI
if (!baseURL) throw new Error('LIFT_ANALYZER_SERVICE_URI is not defined')

const client = axios.create({ baseURL })

const getServiceDetails = async (): Promise<ServiceDetails> => {
  const res = await client.get<ServiceDetails>('/')
  return res.data
}

const getHealth = async (): Promise<Health> => {
  const res = await client.get<Health>('/health')
  return res.data
}

export default {
  getServiceDetails,
  getHealth,
}
