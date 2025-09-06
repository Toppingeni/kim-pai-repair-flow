import React, { createContext, useContext, useMemo, useRef, useState } from 'react'

type LoadingContextType = { setSource: (id: string, active: boolean) => void; isLoading: boolean }
const LoadingContext = createContext<LoadingContextType | null>(null)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [, force] = useState({})
  const sourcesRef = useRef(new Map<string, boolean>())
  const setSource = (id: string, active: boolean) => {
    if (active) sourcesRef.current.set(id, true)
    else sourcesRef.current.delete(id)
    force({})
  }
  const value = useMemo(() => ({ setSource, isLoading: false }), [])
  return (
    <LoadingContext.Provider value={{ setSource, isLoading: sourcesRef.current.size > 0 }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading(id: string, flags?: Array<boolean>) {
  const ctx = useContext(LoadingContext)
  if (!ctx) throw new Error('useLoading must be used within LoadingProvider')
  const active = Array.isArray(flags) ? flags.some(Boolean) : false
  React.useEffect(() => {
    ctx.setSource(id, active)
    return () => ctx.setSource(id, false)
  }, [id, active, ctx])
  return ctx
}

export function GlobalLoadingOverlay() {
  const ctx = useContext(LoadingContext)
  if (!ctx?.isLoading) return null
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-black/40">
      <div className="rounded-md bg-white px-4 py-3 shadow">Loading...</div>
    </div>
  )
}
