import { useSearchParams } from 'react-router-dom'
import { useData } from '../DataContext.jsx'
import Status from '../components/Status.jsx'
import ItemGrid from '../components/ItemGrid.jsx'

function Content({ q }) {
  const { items } = useData()
  const s = q.trim().toLowerCase()
  const list = s ? items.filter((it) => [it.name_th, it.name_en, it.summary, it.description, ...it.tags, ...it.checks].join(' ').toLowerCase().includes(s)) : []
  return (
    <>
      <h1>ผลการค้นหา “{q}”</h1>
      <p className="mute">พบ {list.length} รายการ</p>
      {s ? <ItemGrid items={list} /> : <p className="state">กรุณาพิมพ์คำค้นหา</p>}
    </>
  )
}
export default function SearchResults() { const [p] = useSearchParams(); return <Status><Content q={p.get('q') || ''} /></Status> }
