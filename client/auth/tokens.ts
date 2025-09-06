import { jwtDecode } from 'jwt-decode'

const TOKEN_KEY = 'serviceToken'
const STORAGE_HINT_KEY = 'serviceTokenStorage' // 'local' | 'session'
type StorageKind = 'local' | 'session'

export type DecodedUser = {
  UserName: string; UserType: string; UnitId: string; ORG: string; nameid: string; TrackingStatus: string; exp?: number
}

function getStorage(kind: StorageKind){ return kind === 'local' ? localStorage : sessionStorage }
export function saveToken(token: string, remember = true){ const target:StorageKind = remember?'local':'session'; const other:StorageKind = remember?'session':'local'; getStorage(target).setItem(TOKEN_KEY, token); getStorage(other).removeItem(TOKEN_KEY); localStorage.setItem(STORAGE_HINT_KEY, target) }
export function getToken(){ const hint = (localStorage.getItem(STORAGE_HINT_KEY) as StorageKind | null) ?? null; const first = hint ? getStorage(hint).getItem(TOKEN_KEY) : null; return first || localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) }
export function clearToken(){ localStorage.removeItem(TOKEN_KEY); sessionStorage.removeItem(TOKEN_KEY) }
export function decodeUser(token: string){ try { return jwtDecode<DecodedUser>(token) } catch { return null } }
export function isExpired(decoded: DecodedUser | null){ if(!decoded?.exp) return false; return Date.now() >= decoded.exp * 1000 }

