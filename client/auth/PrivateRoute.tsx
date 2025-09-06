import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context'

export default function PrivateRoute({ children }: { children: JSX.Element }){
  const { user } = useAuth(); const loc = useLocation();
  if (import.meta.env.VITE_BYPASS_AUTH === 'true') return children
  if(!user){ const redirectTo = encodeURIComponent(loc.pathname + (loc.search || '')); return <Navigate to={`/login?redirectTo=${redirectTo}`} replace /> }
  return children
}
