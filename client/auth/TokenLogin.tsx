import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from './context'

export default function TokenLogin(){
  const [search] = useSearchParams(); const { loginWithToken } = useAuth(); const nav = useNavigate()
  const sanitize = (u: string | null | undefined) => { if(!u) return '/'; if(!u.startsWith('/')) return '/'; if(u.startsWith('//')) return '/'; if(u.includes('://')) return '/'; return u }
  useEffect(()=>{ const t = search.get('token'); const redirectTo = sanitize(search.get('redirectTo')); if(!t){ nav('/login',{ replace:true }); return } try{ loginWithToken(t,{ remember:true }); nav(redirectTo,{ replace:true }) } catch { nav('/login',{ replace:true }) } },[loginWithToken, nav, search])
  return <div style={{ padding:24, fontFamily:'sans-serif' }}>Signing in...</div>
}
