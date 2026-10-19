import { useParams, Link } from 'react-router-dom'
import { useData } from '../DataContext.jsx'
import Status from '../components/Status.jsx'
import ItemGrid from '../components/ItemGrid.jsx'

function Content({ id }) {
  const { categories, items } = useData()
  const c = categories[id]
  if (!c) return <p className="state">ไม่พบหมวดหมู่นี้ <Link to="/categories">กลับ</Link></p>
  return (
    <>
      <Link to="/categories">← หมวดหมู่ทั้งหมด</Link>
      <h1>{c.name}</h1><p className="mute">{c.description}</p>
      <ItemGrid items={items.filter((i) => i.category_id === id)} />
    </>
  )
}
export default function ItemList() { const { id } = useParams(); return <Status><Content id={id} /></Status> }
