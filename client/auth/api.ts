import axios from 'axios'
import { clearToken, getToken } from './tokens'

export const api = axios.create({ baseURL: import.meta.env.VITE_API_AUTH_URL })

api.interceptors.request.use(cfg => { const t = getToken(); if (t) cfg.headers.Authorization = `Bearer ${t}`; return cfg })
api.interceptors.response.use(
  r=>r,
  err => {
    const st = err?.response?.status
    if (st === 401 && typeof window !== 'undefined'){
      clearToken()
      const cur = `${window.location.pathname}${window.location.search || ''}`
      const redirectTo = encodeURIComponent(cur || '/')
      window.location.replace(`/login?redirectTo=${redirectTo}`)
    }
    return Promise.reject(err)
  }
)
