# การ Deploy โปรเจกต์ขึ้น Vercel

## ขั้นตอนการ Deploy

### 1. เตรียมโปรเจกต์
```bash
# ติดตั้ง dependencies
npm install

# ทดสอบ build ในเครื่อง
npm run build

# ทดสอบ preview
npm run preview
```

### 2. Deploy ผ่าน Vercel CLI
```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Login เข้า Vercel
vercel login

# Deploy โปรเจกต์
vercel

# หรือ deploy production
vercel --prod
```

### 3. Deploy ผ่าน Vercel Dashboard
1. ไปที่ [vercel.com](https://vercel.com)
2. เชื่อมต่อกับ GitHub repository
3. เลือกโปรเจกต์นี้
4. Vercel จะ auto-detect เป็น Vite project
5. คลิก Deploy

## การตั้งค่า

### Environment Variables (ถ้ามี)
```bash
# ใน Vercel Dashboard > Settings > Environment Variables
VITE_API_URL=https://your-api-url.com
VITE_APP_NAME=Kim Pai Repair Flow
```

### Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## ไฟล์ที่สำคัญ

### vercel.json
ไฟล์นี้กำหนดการตั้งค่าสำหรับ Vercel:
- SPA routing support
- CORS headers สำหรับ API
- Build configuration

### package.json scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

## การแก้ปัญหา

### 1. Build Error
```bash
# ตรวจสอบ TypeScript errors
npm run type-check

# ตรวจสอบ ESLint errors
npm run lint
```

### 2. Routing ไม่ทำงาน
- ตรวจสอบว่ามี `rewrites` ใน `vercel.json`
- ใช้ React Router สำหรับ client-side routing

### 3. Environment Variables
- ตรวจสอบว่าขึ้นต้นด้วย `VITE_`
- ตั้งค่าใน Vercel Dashboard

## URL ตัวอย่าง
หลังจาก deploy สำเร็จ:
- Production: `https://your-project.vercel.app`
- Preview: `https://your-project-git-branch.vercel.app`

## คำสั่งที่มีประโยชน์
```bash
# ดู deployment logs
vercel logs

# ดู domain ที่ใช้งาน
vercel domains

# ลบ deployment
vercel remove
```