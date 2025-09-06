# กติกาการทำงาน (Project Rules) — Kim Pai Repair Flow

เอกสารนี้สรุปกติกาและแนวปฏิบัติในการพัฒนา ดูแล และปล่อยระบบให้ทีมทำงานไปในทิศทางเดียวกัน

## 1) Workflow และ Branching

-   main: โค้ดที่พร้อมใช้งานจริงและตรงกับ Production เท่านั้น (Protected)
-   feature/*, fix/*, chore/*: งานใหม่/แก้บั๊ก/งานดูแลระบบ พัฒนาแยกสาขาแล้วเปิด PR เข้าสู่ main
-   ขนาด PR: เล็ก กระชับ โฟกัสงานเดียวต่อครั้ง เพื่อง่ายต่อรีวิวและลดความเสี่ยง

## 2) Commit Message (Conventional Commits)

ใช้รูปแบบ: <type>(scope?): <subject>

-   type ที่ใช้: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
-   ตัวอย่าง:
    -   feat(repair-form): เพิ่มการเลือกอะไหล่หลายรายการ
    -   fix(reports): แก้ total ผิดเมื่อกรองตามวันที่

## 3) Pull Request (PR) Checklist

ก่อนกดสร้าง/ขอรีวิว PR ต้องตรวจสอบว่า:

-   ผ่าน `npm run lint` และ `npm run build`
-   อัปเดตเอกสารที่เกี่ยวข้อง (เช่น README/DEPLOYMENT/คู่มือฟีเจอร์)
-   แนบภาพ/วิดีโอ หรือคำอธิบายวิธีทดสอบแบบสั้น ๆ
-   ระบุ Issue ที่เกี่ยวข้อง (ถ้ามี) และสCOPEของผลกระทบ
-   PR ขนาดเล็ก อ่านง่าย แยก commit เป็นเหตุเป็นผล

## 4) Code Style & Patterns (TypeScript + React + Tailwind + shadcn/ui)

-   TypeScript: หลีกเลี่ยง `any`, ใส่ type/return type ชัดเจน, ใช้ `zod` สำหรับ schema/validation เมื่อเหมาะสม
-   React: ใช้ Functional Components + Hooks, แยก logic เป็น custom hooks ใน `src/hooks`, ใช้ `useMemo/useCallback` เท่าที่จำเป็น
-   Forms (react-hook-form):
    -   ใช้ `react-hook-form` สำหรับการทำฟอร์มทั้งหมด
    -   ถ้าหน้าจอมี component ลูกหลายชิ้น ให้ห่อด้วย `FormProvider` ที่ parent และให้ component ลูกใช้ `useFormContext()` เพื่อเข้าถึง methods/values เดียวกัน
    -   ตัวอย่างโครงสร้างสั้น ๆ:

```tsx
import { useForm, FormProvider, useFormContext } from "react-hook-form";

type FormValues = { name: string };

function ChildInput() {
    const {
        register,
        formState: { errors },
    } = useFormContext<FormValues>();
    return (
        <div>
            <input {...register("name", { required: true })} />
            {errors.name && <span>Required</span>}
        </div>
    );
}

export default function ParentForm() {
    const methods = useForm<FormValues>({ defaultValues: { name: "" } });
    const onSubmit = methods.handleSubmit((data) => console.log(data));

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <ChildInput />
                <button type="submit">Save</button>
            </form>
        </FormProvider>
    );
}
```

-   Data/State (Redux Toolkit + RTK Query):
    -   มาตรฐานสำหรับเรียก API ให้ใช้ RTK Query จาก `@reduxjs/toolkit/query/react`
    -   สร้าง `api` กลางและ hook อัตโนมัติจาก endpoint ต่าง ๆ และใช้ในหน้า/คอมโพเนนต์
    -   ต้องแสดงสถานะกำลังโหลดแบบหน้าเต็ม (Page Loader) เมื่อ `isLoading`/`isFetching` เป็นจริงในทุกหน้า
    -   โครงสร้างตัวอย่างอย่างย่อ:

```ts
// src/store/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: ["Repair", "User"],
    endpoints: (builder) => ({
        getRepairs: builder.query<any[], void>({
            query: () => "/repairs",
            providesTags: ["Repair"],
        }),
    }),
});

export const { useGetRepairsQuery } = api;
```

```ts
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (gDM) => gDM().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

```tsx
// src/main.tsx (ห่อ Provider รอบแอป)
import { Provider } from 'react-redux'
import { store } from './store'

<Provider store={store}>
  <App />
</Provider>
```

```tsx
// ตัวอย่างในหน้าใดหน้าหนึ่ง
import { useGetRepairsQuery } from '@/store/api'

function PageLoader() {
  return <div className="flex h-screen items-center justify-center">Loading...</div>
}

export default function RepairsPage() {
  const { data, isLoading, isFetching, isError } = useGetRepairsQuery()
  if (isLoading || isFetching) return <PageLoader />
  if (isError) return <div>เกิดข้อผิดพลาด</div>
  return <div>{/* แสดงผลข้อมูล */}</div>
}
```

## 5) Lint, Build และ Commands หลัก

-   Lint: `npm run lint` ต้องผ่านก่อนเปิด PR
-   Build: `npm run build` ต้องสำเร็จ (Vite)
-   Dev: `npm run dev` เพื่อพัฒนา
-   Preview: `npm run preview` ตรวจสอบ build ในเครื่อง

## 6) Environment & Secrets

-   ห้าม commit ไฟล์ `.env*` ใด ๆ ที่มีค่าใช้งานจริง
-   เพิ่ม/อัปเดตตัวแปรใหม่ใน `.env.example` หรือ `.env.sample` พร้อมคำอธิบาย
-   ใช้ `.env.local` สำหรับเครื่องนักพัฒนา (ไม่ commit)
-   ฝั่ง Frontend หลีกเลี่ยงการใส่คีย์ลับที่ต้องป้องกัน (เพราะถูก expose ได้)

## 7) UI/UX, A11y และ i18n

-   ใช้โครงสร้าง HTML เชิงความหมายและ aria-* ที่จำเป็น
-   รองรับ responsive ทุกหน้าจอ (mobile-first) และทดสอบ breakpoint หลัก
-   ใช้ helper วันที่ไทยจาก `src/lib/thaiDate.ts` เมื่อต้องแสดงวันที่แบบไทย

## 8) Performance & Assets

-   แยกส่วน (code-splitting) เฉพาะหน้าที่มี payload ใหญ่หรือเส้นทางที่โหลดช้า
-   ภาพ/ไอคอน: เก็บไว้ที่ `public/` เมื่อเป็น asset สาธารณะ ใช้ขนาดพอดี ลดไฟล์ใหญ่เกินจำเป็น
-   หลีกเลี่ยง re-render ไม่จำเป็น: ตรวจสอบ key, memoization และโครงสร้าง state

## 9) Dependencies

-   เพิ่มแพ็กเกจเมื่อจำเป็นจริง ๆ และมีการประเมินผลกระทบด้านขนาด bundle
-   เลี่ยงแพ็กเกจที่ซ้ำหน้าที่กับของเดิม (เช่น utility ซ้ำ Tailwind/shadcn/ui)

## 10) Testing

-   ตอนนี้ยังไม่มี test suite กลาง: เมื่อเพิ่ม logic สำคัญ ควรแนบ test plan/manual steps ใน PR
-   หากเริ่มเพิ่ม unit/integration tests ให้คงรูปแบบเครื่องมือและโครงสร้างโฟลเดอร์ให้ชัดเจนก่อนทั้งทีม

## 11) Review & SLA

-   ผู้ขอรีวิวระบุ points ที่อยากได้คำแนะนำชัดเจน
-   ผู้รีวิวโฟกัส: ความถูกต้อง, ความเรียบง่าย, ผลกระทบ, ความปลอดภัย, ความสม่ำเสมอของโค้ด
-   SLA การรีวิว: ภายใน 1 วันทำการสำหรับ PR ปกติ (ถ้าเร่งด่วนให้แท็ก)

## 12) Release & Deployment

-   main = Production; deploy อัตโนมัติผ่าน Vercel/Netlify ตามการตั้งค่า (`vercel.json`, `netlify.toml`)
-   ใช้ tag เวอร์ชัน `vX.Y.Z` เมื่อมี release สำคัญ และสรุป change logs จาก commit messages
-   อัปเดต `DEPLOYMENT.md` เมื่อมีการเปลี่ยนแปลงขั้นตอน/ค่า config ที่สำคัญ

## 13) ความปลอดภัย (Security)

-   หลีกเลี่ยง `eval`, การประกอบ HTML ที่ไม่ปลอดภัย, และการใส่ข้อมูลผู้ใช้ลงใน DOM โดยไม่ sanitize
-   ตรวจสอบ input ฝั่งคลายเอนต์ และป้องกันข้อมูลสำคัญไม่ให้ hardcode ใน repo

## 14) เอกสารอ้างอิง

-   README.md: ภาพรวมโปรเจกต์ วิธีเริ่มต้นใช้งาน
-   DEPLOYMENT.md: แนวทาง deploy และ config ที่เกี่ยวข้อง
-   CONTRIBUTING.md: แนวทางการมีส่วนร่วมโดยละเอียด

ปรับปรุงกติกานี้ร่วมกันได้เสมอผ่าน PR — เน้น “เข้าใจง่าย ปฏิบัติได้จริง และสอดคล้องกับของที่ทีมใช้อยู่”

## 15) Adding Features (แนวทางเพิ่มฟีเจอร์)

-   Theme Colors:

    -   เพิ่มสีใหม่ใน `client/global.css` และ `tailwind.config.ts` เท่านั้น เพื่อคงความสม่ำเสมอของธีม

-   New API Route (Express, prefix `/api`):

    1. ตัวเลือกแนะนำ: สร้าง interface ร่วมใน `shared/api.ts`

    ```ts
    export interface MyRouteResponse {
        message: string;
    }
    ```

    2. เพิ่มตัวจัดการเส้นทางใน `server/routes/my-route.ts`

    ```ts
    import { RequestHandler } from "express";
    import { MyRouteResponse } from "@shared/api";

    export const handleMyRoute: RequestHandler = (req, res) => {
        const response: MyRouteResponse = {
            message: "Hello from my endpoint!",
        };
        res.json(response);
    };
    ```

    3. ลงทะเบียนใน `server/index.ts`

    ```ts
    import { handleMyRoute } from "./routes/my-route";
    app.get("/api/my-endpoint", handleMyRoute);
    ```

    4. การใช้งานฝั่ง React (type-safe)

    ```ts
    import { MyRouteResponse } from "@shared/api";
    const res = await fetch("/api/my-endpoint");
    const data: MyRouteResponse = await res.json();
    ```

-   New Page Route (React SPA):
    1. สร้างคอมโพเนนต์หน้าใหม่ที่ `client/pages/MyPage.tsx`
    2. ลงทะเบียนเส้นทางใน `client/App.tsx`
    ```tsx
    <Route path="/my-page" element={<MyPage />} />
    ```

## 16) Project Structure (Client / Server / Shared)

โครงสร้างมาตรฐานของโปรเจกต์ (แยก client, server, และ shared):

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx               # App entry point and with SPA routing setup
└── global.css            # TailwindCSS 3 theming and global styles

server/                   # Express API backend
├── index.ts              # Main server setup (express config + routes)
└── routes/               # API handlers

shared/                   # Types used by both client & server
└── api.ts                # Example of how to share api interfaces
```

### Express Server Integration

-   Development: ใช้พอร์ตเดียว (8080) สำหรับทั้ง frontend/backend
-   Hot reload: ทั้งโค้ดฝั่ง client และ server
-   API endpoints: ต้องมี prefix `/api/`

ตัวอย่างเส้นทาง API

-   `GET /api/ping` - Simple ping api
-   `GET /api/demo` - Demo endpoint

### Shared Types

การใช้งาน type ร่วมกันในทั้ง client และ server:

```ts
import { DemoResponse } from "@shared/api";
```

Path aliases

-   `@shared/*` - โฟลเดอร์ `shared`
-   `@/*` - โฟลเดอร์ `client`

## 17) Authentication (Login Rule)

- โครงสร้างแยกไฟล์ภายใต้ `client/auth/` (แนะนำให้แยกหน้าที่ชัดเจน):
  - `tokens.ts`: ช่วยจัดการ token (เก็บ/อ่าน/ถอดรหัส/ตรวจหมดอายุ)
  - `api.ts`: สร้าง axios instance + interceptors (แนบ Authorization header, จัดการ 401 -> redirect `/login`)
  - `context.tsx`: `AuthProvider`, `useAuth` สำหรับเก็บ `user` และ `token`, `loginWithToken`, `logout`
  - `PrivateRoute.tsx`: Guard สำหรับหน้า protected
  - `LoginPage.tsx`: ล็อกอินด้วย username/password (POST -> JWT token)
  - `TokenLogin.tsx`: ล็อกอินด้วย token ผ่าน URL (`?token=...`)
  - `index.ts`: รวม re-exports เพื่อให้นำเข้าใช้งานได้ง่าย

- Dependencies (ติดตั้งในโปรเจกต์): `npm i axios jwt-decode react-router-dom`
- Env vars: เพิ่ม `VITE_API_AUTH_URL=https://your-auth-domain` ใน `.env`

- การใช้งานกับ Router (ตัวอย่าง):

```tsx
import {
  AuthProvider,
  PrivateRoute,
  LoginPage,
  TokenLogin,
} from '@/auth'

<AuthProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/authen" element={<TokenLogin />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
</AuthProvider>
```

- ข้อกำหนดเพิ่มเติม:
  - ทุกหน้า protected ต้องห่อด้วย `PrivateRoute`
  - เมื่อได้รับ 401 จาก API ให้ redirect ไป `/login?redirectTo=...` โดยอัตโนมัติ
  - ค่า token ควรเก็บใน `localStorage` เป็นค่าเริ่มต้น หรือ `sessionStorage` เมื่อผู้ใช้ไม่เลือกจำการเข้าสู่ระบบ

- โครงสร้างไฟล์และตัวอย่างโค้ดย่อ:

```ts
// client/auth/tokens.ts
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
```

```ts
// client/auth/api.ts
import axios from 'axios'
import { clearToken, getToken } from './tokens'

export const api = axios.create({ baseURL: import.meta.env.VITE_API_AUTH_URL })

api.interceptors.request.use(cfg => { const t = getToken(); if (t) cfg.headers.Authorization = `Bearer ${t}`; return cfg })
api.interceptors.response.use(r=>r, err => { const st = err?.response?.status; if (st === 401 && typeof window !== 'undefined'){ try{ clearToken() }catch{} const cur = `${window.location.pathname}${window.location.search || ''}`; const redirectTo = encodeURIComponent(cur || '/'); window.location.replace(`/login?redirectTo=${redirectTo}`) } return Promise.reject(err) })
```

```tsx
// client/auth/context.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { decodeUser, DecodedUser, getToken, isExpired, saveToken, clearToken } from './tokens'

type AuthContextType = { user: DecodedUser | null; token: string | null; loginWithToken: (t: string, opts?: { remember?: boolean }) => void; logout: () => void }
const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }){
  const [token, setToken] = useState<string|null>(null)
  const [user, setUser] = useState<DecodedUser|null>(null)
  useEffect(()=>{ const t = getToken(); if(!t) return; const u = decodeUser(t); if(isExpired(u)){ clearToken(); return } setToken(t); setUser(u) },[])
  const loginWithToken = (t: string, opts?: { remember?: boolean }) => { const u = decodeUser(t); if(!u || isExpired(u)) throw new Error('Invalid or expired token'); saveToken(t, opts?.remember ?? true); setToken(t); setUser(u) }
  const logout = () => { clearToken(); setToken(null); setUser(null) }
  const value = useMemo(()=>({ user, token, loginWithToken, logout }),[user, token])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){ const ctx = useContext(AuthContext); if(!ctx) throw new Error('useAuth must be used within AuthProvider'); return ctx }
```

```tsx
// client/auth/PrivateRoute.tsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context'

export default function PrivateRoute({ children }: { children: JSX.Element }){
  const { user } = useAuth(); const loc = useLocation();
  if(!user){ const redirectTo = encodeURIComponent(loc.pathname); return <Navigate to={`/login?redirectTo=${redirectTo}`} replace /> }
  return children
}
```

```tsx
// client/auth/LoginPage.tsx
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from './api'
import { useAuth } from './context'

export default function LoginPage({ org = 'OPP', trackingStatus = 'F', title = 'Login' }:{ org?: string; trackingStatus?: string; title?: string }){
  const [userId, setUserId] = useState(''); const [password, setPassword] = useState(''); const [remember, setRemember] = useState(true); const [errorMsg, setErrorMsg] = useState<string|null>(null)
  const { loginWithToken } = useAuth(); const nav = useNavigate(); const [search] = useSearchParams()
  const sanitize = (u: string | null | undefined) => { if(!u) return '/'; if(!u.startsWith('/')) return '/'; if(u.startsWith('//')) return '/'; if(u.includes('://')) return '/'; return u }
  const onSubmit = async (e: React.FormEvent) => { e.preventDefault(); setErrorMsg(null); try{ const res = await api.post('/api/user/login',{ UserId:userId, Password:password, Org:org, TrackingStatus:trackingStatus }); const token = res.data?.token as string; if(!token) throw new Error('No token'); loginWithToken(token,{ remember }); const redirectTo = sanitize(search.get('redirectTo')); nav(redirectTo,{ replace:true }) } catch(err:any){ const msg = err?.response?.data?.message || err?.message || 'Login failed'; setErrorMsg(typeof msg==='string'?msg:JSON.stringify(msg)) } }
  return (
    <div style={{ maxWidth: 360, margin: '48px auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: 16 }}>{title}</h2>
      <form onSubmit={onSubmit} style={{ display:'grid', gap:12 }}>
        <input value={userId} onChange={e=>setUserId(e.target.value)} placeholder='User' autoComplete='username' />
        <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' autoComplete='current-password' />
        <label style={{ display:'flex', alignItems:'center', gap:8 }}>
          <input type='checkbox' checked={remember} onChange={e=>setRemember(e.target.checked)} /> Remember me
        </label>
        <button type='submit' style={{ padding:'8px 12px' }}>Login</button>
        {errorMsg && <div style={{ color:'red' }}>{errorMsg}</div>}
      </form>
    </div>
  )
}
```

```tsx
// client/auth/TokenLogin.tsx
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from './context'

export default function TokenLogin(){
  const [search] = useSearchParams(); const { loginWithToken } = useAuth(); const nav = useNavigate()
  const sanitize = (u: string | null | undefined) => { if(!u) return '/'; if(!u.startsWith('/')) return '/'; if(u.startsWith('//')) return '/'; if(u.includes('://')) return '/'; return u }
  useEffect(()=>{ const t = search.get('token'); const redirectTo = sanitize(search.get('redirectTo')); if(!t){ nav('/login',{ replace:true }); return } try{ loginWithToken(t,{ remember:true }); nav(redirectTo,{ replace:true }) } catch { nav('/login',{ replace:true }) } },[])
  return <div style={{ padding:24, fontFamily:'sans-serif' }}>Signing in...</div>
}
```

```ts
// client/auth/index.ts
export * from './tokens'
export * from './context'
export { default as PrivateRoute } from './PrivateRoute'
export { default as LoginPage } from './LoginPage'
export { default as TokenLogin } from './TokenLogin'
```
