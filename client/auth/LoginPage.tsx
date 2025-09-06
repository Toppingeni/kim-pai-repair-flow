import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from './api'
import { useAuth } from './context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'

const schema = z.object({
  userId: z.string().min(1, 'กรุณากรอกชื่อผู้ใช้'),
  password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
  remember: z.boolean().default(true),
})
type FormValues = z.infer<typeof schema>

export default function LoginPage({ org = 'OPP', trackingStatus = 'F', title = 'เข้าสู่ระบบ' }:{ org?: string; trackingStatus?: string; title?: string }){
  const [search] = useSearchParams()
  const nav = useNavigate()
  const { loginWithToken } = useAuth()
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  React.useEffect(()=>{
    if (import.meta.env.VITE_BYPASS_AUTH === 'true'){
      const sanitize = (u: string | null | undefined) => {
        if (!u) return '/'
        if (!u.startsWith('/')) return '/'
        if (u.startsWith('//')) return '/'
        if (u.includes('://')) return '/'
        return u
      }
      const redirectTo = sanitize(search.get('redirectTo'))
      nav(redirectTo, { replace: true })
    }
  },[nav, search])

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { userId: '', password: '', remember: true },
    mode: 'onSubmit',
  })

  const sanitize = (u: string | null | undefined) => {
    if (!u) return '/'
    if (!u.startsWith('/')) return '/'
    if (u.startsWith('//')) return '/'
    if (u.includes('://')) return '/'
    return u
  }

  const onSubmit = async (values: FormValues) => {
    setErrorMsg(null)
    setSubmitting(true)
    try {
      const res = await api.post('/api/user/login', {
        UserId: values.userId,
        Password: values.password,
        Org: org,
        TrackingStatus: trackingStatus,
      })
      const token = res.data?.token as string | undefined
      if (!token) throw new Error('No token')
      loginWithToken(token, { remember: values.remember })
      const redirectTo = sanitize(search.get('redirectTo'))
      nav(redirectTo, { replace: true })
    } catch (err: unknown) {
      let msg: string = 'เข้าสู่ระบบไม่สำเร็จ'
      if (typeof err === 'object' && err && 'response' in err) {
        // @ts-expect-error axios-like object
        msg = (err.response?.data?.message as string) ?? msg
      } else if (err instanceof Error) {
        msg = err.message
      }
      setErrorMsg(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 grid place-items-center px-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
          <CardDescription>กรอกข้อมูลเพื่อเข้าสู่ระบบ</CardDescription>
        </CardHeader>
        <CardContent>
          {errorMsg && (
            <Alert className="mb-4" variant="destructive">
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}

          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="userId">ชื่อผู้ใช้</Label>
              <Input id="userId" autoComplete="username" placeholder="user"
                     {...form.register('userId')} />
              {form.formState.errors.userId && (
                <p className="text-sm text-destructive">{form.formState.errors.userId.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <Input id="password" type="password" autoComplete="current-password" placeholder="••••••••"
                     {...form.register('password')} />
              {form.formState.errors.password && (
                <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" checked={form.watch('remember')} onCheckedChange={(v)=>form.setValue('remember', Boolean(v))} />
              <Label htmlFor="remember">จำการเข้าสู่ระบบ</Label>
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
