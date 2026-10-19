import { useData } from '../DataContext.jsx'
import Status from '../components/Status.jsx'
import CategoryCard from '../components/CategoryCard.jsx'

function Content() {
  const { categories, items } = useData()
  return (
    <>
      <h1>หมวดหมู่</h1>
      <div className="cats big">
        {Object.entries(categories).map(([id, c], i) => (
          <div key={id}><CategoryCard id={id} cat={c} index={i} /><small className="mute">{items.filter((x) => x.category_id === id).length} รายการ</small></div>
        ))}
      </div>
    </>
  )
}
export default function Categories() { return <Status><Content /></Status> }
