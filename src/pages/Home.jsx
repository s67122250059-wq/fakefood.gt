import { Link } from 'react-router-dom'
import { useData } from '../DataContext.jsx'
import Status from '../components/Status.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import ItemGrid from '../components/ItemGrid.jsx'

function Content() {
  const { categories, items } = useData()
  const featured = items.filter((i) => i.is_recommended)
  return (
    <>
      <section className="hero">
        <div><h1>รู้จักอาหารปลอม<br />และวิธีสังเกตอาหาร</h1><p>รวมข้อมูลอาหารที่พบบ่อย พร้อมวิธีสังเกตอย่างง่าย</p></div>
        <span className="heroic">🔍🍳</span>
      </section>
      <div className="sec"><h2>หมวดหมู่อาหารปลอม</h2><Link to="/categories">ดูทั้งหมด</Link></div>
      <div className="cats">{Object.entries(categories).map(([id, c], i) => <CategoryCard key={id} id={id} cat={c} index={i} />)}</div>
      <div className="sec"><h2>รายการแนะนำ</h2></div>
      <ItemGrid items={featured} />
    </>
  )
}
export default function Home() { return <Status><Content /></Status> }
