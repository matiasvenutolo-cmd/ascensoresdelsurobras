import { getPayload as getPayloadInstance } from 'payload'
import config from '@payload-config'

let cached: ReturnType<typeof getPayloadInstance> | null = null

export const getPayload = () => {
  if (!cached) {
    cached = getPayloadInstance({ config })
  }
  return cached
}
