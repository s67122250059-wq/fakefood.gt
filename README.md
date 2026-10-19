# FakeFood.GT — รู้ทันอาหารปลอม (React + Vite + Firebase)

## ชื่อและวัตถุประสงค์
เว็บแอปรวมข้อมูลอาหารปลอมและวิธีสังเกต ให้ผู้บริโภคค้นหา เรียกดูตามหมวดหมู่ และบันทึกรายการโปรด

## ฟังก์ชัน
Home (Hero, หมวดหมู่, รายการแนะนำ) · Categories → Item List → Item Detail · Search → Search Results · Favorites (ต้องล็อกอิน) · Profile (สมัคร/เข้าสู่ระบบ/ออกจากระบบ) · แสดงสถานะ loading / empty / error · Responsive

## Route
`/` · `/categories` · `/categories/:id` · `/search?q=` · `/item/:id` · `/favorites` · `/profile`

## Component
Header, Navigation, SearchBar, CategoryCard, ItemCard, ItemGrid, FavoriteButton, Footer, Status, Img

## โครงสร้างข้อมูล Firebase
- `categories/{id}`: name, description, image_url
- `items/{id}`: name_th, name_en, category_id, summary, description, how_to_check[], tags[], thumbnail_url, detail_image_url, is_recommended
- `settings`: site_name, site_description, image_format
- `users/{uid}`: name, email, created_at
- `favorites/{uid}/{itemId}`: true

## วิธีติดตั้ง
1. `npm install`
2. สร้าง Firebase Project > เปิด Realtime Database และ Authentication (Email/Password)
3. Realtime Database > ⋮ > Import JSON > `firebase/master_dataset.json` (การ Import ที่ราก จะแทนที่ข้อมูลเดิมทั้งหมด)
4. วาง Rules จาก `database.rules.json`
5. คัดลอก `.env.example` เป็น `.env` แล้วใส่ค่าจาก Project settings (ห้าม commit `.env`)
6. `npm run dev` / `npm run build`

## Deploy
`firebase login` > `firebase init hosting` (public = dist, SPA = yes, ไม่ overwrite index.html) > `npm run build` > `firebase deploy`
เพิ่มโดเมนที่ deploy ใน Authentication > Settings > Authorized domains

## หมายเหตุ
รูปใน `public/images` เป็นภาพประกอบ (illustration) ที่สร้างขึ้นเองสำหรับโครงงาน ไม่ใช่ภาพถ่ายจริง หากต้องการใช้ภาพถ่าย ให้ใช้ภาพที่มีสิทธิ์ใช้งานและตั้งชื่อไฟล์เดิม
