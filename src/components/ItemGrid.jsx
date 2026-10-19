import ItemCard from './ItemCard.jsx'

export default function ItemGrid({ items }) {
  if (!items.length) return <p className="state">ไม่พบข้อมูลที่ตรงกับเงื่อนไข</p>
  return <div className="grid">{items.map((it) => <ItemCard key={it.id} item={it} />)}</div>
}
