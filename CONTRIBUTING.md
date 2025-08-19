# 🤝 การมีส่วนร่วมในโปรเจกต์ Kim Pai Repair Flow

ขอบคุณที่สนใจมีส่วนร่วมในการพัฒนาโปรเจกต์! คู่มือนี้จะช่วยให้คุณเริ่มต้นได้อย่างง่ายดาย

## 📋 ก่อนเริ่มต้น

### ความต้องการของระบบ
- Node.js 18+ 
- npm หรือ yarn
- Git
- Editor ที่รองรับ TypeScript (แนะนำ VS Code)

### การตั้งค่าโปรเจกต์

1. **Fork และ Clone โปรเจกต์**
```bash
git clone https://github.com/your-username/kim-pai-repair-flow.git
cd kim-pai-repair-flow
```

2. **ติดตั้ง Dependencies**
```bash
npm install
```

3. **สร้าง Environment File**
```bash
cp .env.example .env.local
```

4. **เริ่มต้น Development Server**
```bash
npm run dev
```

## 🔄 ขั้นตอนการ Contribute

### 1. สร้าง Branch ใหม่
```bash
git checkout -b feature/your-feature-name
# หรือ
git checkout -b fix/your-bug-fix
```

### 2. ทำการเปลี่ยนแปลง
- เขียนโค้ดตาม coding standards
- เพิ่ม comments ที่จำเป็น
- ทดสอบการทำงาน

### 3. ตรวจสอบโค้ด
```bash
# ตรวจสอบ linting
npm run lint

# Build โปรเจกต์
npm run build

# ทดสอบ (ถ้ามี)
npm test
```

### 4. Commit การเปลี่ยนแปลง
```bash
git add .
git commit -m "feat: เพิ่มฟีเจอร์ใหม่"
```

### 5. Push และสร้าง Pull Request
```bash
git push origin feature/your-feature-name
```

## 📝 Coding Standards

### TypeScript
- ใช้ TypeScript อย่างเคร่งครัด
- กำหนด types ให้ชัดเจน
- หลีกเลี่ยงการใช้ `any`

### React Components
- ใช้ Functional Components + Hooks
- แยก logic ออกเป็น custom hooks
- ใช้ TypeScript interfaces สำหรับ props

### File Structure
```
src/
├── components/
│   ├── ComponentName/
│   │   ├── index.tsx
│   │   ├── ComponentName.tsx
│   │   └── ComponentName.types.ts
├── hooks/
├── types/
└── utils/
```

### Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Files**: camelCase (`userUtils.ts`)
- **Variables**: camelCase (`userName`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🎨 UI/UX Guidelines

### Design System
- ใช้ shadcn/ui components
- ใช้ Tailwind CSS สำหรับ styling
- รักษา consistency ในการออกแบบ

### Responsive Design
- Mobile-first approach
- ทดสอบใน screen sizes ต่างๆ
- ใช้ Tailwind responsive utilities

## 🐛 การรายงาน Bug

### ข้อมูลที่ต้องการ
- **Browser และ Version**
- **ขั้นตอนการทำซ้ำ**
- **ผลลัพธ์ที่คาดหวัง vs ผลลัพธ์จริง**
- **Screenshots หรือ Videos**
- **Console errors**

### Template สำหรับ Bug Report
```markdown
## Bug Description
[อธิบาย bug ที่พบ]

## Steps to Reproduce
1. ไปที่หน้า...
2. คลิกที่...
3. เห็น error...

## Expected Behavior
[สิ่งที่ควรจะเกิดขึ้น]

## Actual Behavior
[สิ่งที่เกิดขึ้นจริง]

## Environment
- Browser: [Chrome 120]
- OS: [macOS 14]
- Screen Size: [1920x1080]
```

## ✨ การเสนอ Feature ใหม่

### ข้อมูลที่ต้องการ
- **ปัญหาที่ feature นี้จะแก้ไข**
- **วิธีการใช้งานที่เสนอ**
- **ทางเลือกอื่นที่พิจารณาแล้ว**
- **ผลกระทบต่อ performance**

## 🔍 Code Review Process

### สิ่งที่ Reviewer จะดู
- **Functionality**: โค้ดทำงานตามที่ต้องการหรือไม่
- **Code Quality**: โค้ดอ่านง่าย maintainable หรือไม่
- **Performance**: มีผลกระทบต่อ performance หรือไม่
- **Security**: มีช่องโหว่ด้านความปลอดภัยหรือไม่
- **Testing**: มีการทดสอบเพียงพอหรือไม่

### การตอบกลับ Review Comments
- ตอบกลับทุก comment
- อธิบายเหตุผลถ้าไม่เห็นด้วย
- ขอความช่วยเหลือถ้าไม่เข้าใจ

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

### Tools
- [VS Code Extensions](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

## 🤔 ต้องการความช่วยเหลือ?

- สร้าง Issue ใน GitHub
- ติดต่อผ่าน Discussion
- อ่าน existing issues และ PRs

## 📄 License

การมีส่วนร่วมในโปรเจกต์นี้ หมายความว่าคุณยอมรับให้โค้ดของคุณอยู่ภายใต้ license เดียวกันกับโปรเจกต์