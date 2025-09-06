import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { decodeUser, DecodedUser, getToken, isExpired, saveToken, clearToken } from './tokens'

type AuthContextType = { user: DecodedUser | null; token: string | null; loginWithToken: (t: string, opts?: { remember?: boolean }) => void; logout: () => void }
const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }){
  const [token, setToken] = useState<string|null>(null)
  const [user, setUser] = useState<DecodedUser|null>(null)
  useEffect(()=>{
    if (import.meta.env.VITE_BYPASS_AUTH === 'true'){
      const mock: DecodedUser = { UserName:'dev', UserType:'DEV', UnitId:'0', ORG:'DEV', nameid:'0', TrackingStatus:'F' }
      setToken('dev')
      setUser(mock)
      return
    }
    const t = getToken(); if(!t) return; const u = decodeUser(t); if(isExpired(u)){ clearToken(); return } setToken(t); setUser(u)
  },[])
  const loginWithToken = (t: string, opts?: { remember?: boolean }) => { const u = decodeUser(t); if(!u || isExpired(u)) throw new Error('Invalid or expired token'); saveToken(t, opts?.remember ?? true); setToken(t); setUser(u) }
  const logout = () => { clearToken(); setToken(null); setUser(null) }
  const value = useMemo(()=>({ user, token, loginWithToken, logout }),[user, token])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){ const ctx = useContext(AuthContext); if(!ctx) throw new Error('useAuth must be used within AuthProvider'); return ctx }
