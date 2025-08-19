# Kim Pai Repair Flow

## ระบบจัดการการซ่อมบำรุงเครื่องจักร

ระบบจัดการการซ่อมบำรุงเครื่องจักรแบบครบวงจร สำหรับการติดตาม การจัดการ และการรายงานการซ่อมบำรุง

### เทคโนโลยีที่ใช้
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **State Management**: React Hooks + Context API
- **Deployment**: Vercel

### ฟีเจอร์หลัก
- 📊 Dashboard สำหรับภาพรวมการซ่อมบำรุง
- 🔧 ระบบจัดการข้อมูลหลัก (Master Data)
- 📝 ฟอร์มการแจ้งซ่อม
- 📋 การติดตามสถานะการซ่อม
- 📈 รายงานและสถิติ
- 🔄 ระบบ PM (Preventive Maintenance)

## Project info

**URL**: https://lovable.dev/projects/a295cef3-ccc9-4255-b508-3a898f00246d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a295cef3-ccc9-4255-b508-3a898f00246d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.

## 🚀 การ Deploy ขึ้น Vercel

### วิธีที่ 1: ผ่าน Vercel Dashboard (แนะนำ)
1. ไปที่ [vercel.com](https://vercel.com) และ login
2. คลิก "New Project"
3. เชื่อมต่อกับ GitHub repository นี้
4. Vercel จะ auto-detect เป็น Vite project
5. คลิก "Deploy"

### วิธีที่ 2: ผ่าน Vercel CLI
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

### การตั้งค่าที่สำคัญ
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: 18.x

### ไฟล์ที่เกี่ยวข้อง
- `vercel.json` - การตั้งค่า Vercel
- `DEPLOYMENT.md` - คู่มือการ deploy แบบละเอียด

## 📁 โครงสร้างโปรเจกต์

```
src/
├── components/          # React Components
│   ├── dashboard/       # Dashboard components
│   ├── forms/          # Form components
│   ├── master-data/    # Master data management
│   ├── pm/             # PM management
│   └── ui/             # UI components (shadcn/ui)
├── data/               # Mock data และ types
├── hooks/              # Custom React hooks
├── pages/              # Page components
└── contexts/           # React contexts
```

## 🛠️ คำสั่งที่มีประโยชน์

```bash
# Development
npm run dev              # เริ่ม dev server
npm run build            # Build สำหรับ production
npm run preview          # Preview build ในเครื่อง
npm run lint             # ตรวจสอบ code style

# Deployment
vercel                   # Deploy ขึ้น Vercel
vercel --prod           # Deploy production
vercel logs             # ดู deployment logs
```
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a295cef3-ccc9-4255-b508-3a898f00246d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
