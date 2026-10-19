import { useParams, Link } from 'react-router-dom'
import { useData } from '../DataContext.jsx'
import Status from '../components/Status.jsx'
import Img from '../components/Img.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'

function Content({ id }) {
  const { items, categories } = useData()
  const it = items.find((x) => x.id === id)
  if (!it) return <p className="state">ไม่พบรายการนี้ <Link to="/">กลับหน้าหลัก</Link></p>
  const c = categories[it.category_id]
  return (
    <article className="detail">
      <Link to={c ? `/categories/${it.category_id}` : '/'}>← กลับ</Link>
      <div className="dimg"><Img src={it.detailImg} alt={it.name_th} /><FavoriteButton id={it.id} /></div>
      <h1>{it.name_th}</h1><small>{it.name_en}</small>
      {c && <p><b>หมวด:</b> <Link to={`/categories/${it.category_id}`}>{c.name}</Link></p>}
      <p>{it.description}</p>
      {it.checks.length > 0 && (
        <section className="checks">
          <h2>วิธีสังเกตและป้องกัน</h2>
          <ol>{it.checks.map((c) => <li key={c}>{c}</li>)}</ol>
        </section>
      )}
      <div className="tags">{(it.tags || []).map((t) => <span key={t}>{t}</span>)}</div>
      {c && <p className="note">{c.description}</p>}
    </article>
  )
}
export default function ItemDetail() { const { id } = useParams(); return <Status><Content id={id} /></Status> }
