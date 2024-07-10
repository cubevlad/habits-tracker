import type { InternalAxiosRequestConfig } from 'axios'

import { getAccessToken } from './getAccessToken'

export const tokenInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getAccessToken()

  if (token != null && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}
