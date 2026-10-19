import { Link } from 'react-router-dom'
import { useData } from '../DataContext.jsx'
import { useAuth } from '../AuthContext.jsx'
import Status from '../components/Status.jsx'
import ItemGrid from '../components/ItemGrid.jsx'

function Content() {
  const { items } = useData()
  const { favs } = useAuth()
  const list = items.filter((i) => favs[i.id])
  return list.length ? <ItemGrid items={list} /> : <p className="state">ยังไม่มีรายการโปรด <Link to="/">ไปเลือกดูรายการ</Link></p>
}

export default function Favorites() {
  const { user, ready } = useAuth()
  return (
    <>
      <h1>รายการโปรด</h1>
      {!ready ? <p className="state">กำลังตรวจสอบผู้ใช้...</p>
        : !user ? <p className="state">กรุณา <Link to="/profile">เข้าสู่ระบบ</Link> เพื่อดูรายการโปรดของคุณ</p>
        : <Status><Content /></Status>}
    </>
  )
}
