import { Link } from 'react-router-dom'
import Img from './Img.jsx'

const EMO = ['🍚', '🥚', '🥩', '🦐', '🧂']
export default function CategoryCard({ id, cat, index = 0 }) {
  return (
    <Link to={`/categories/${id}`} className="catcard">
      <div className="ci"><Img src={cat.image_path || cat.image_url} alt={cat.name} fallback={EMO[index % 5]} /></div>
      <span>{cat.name}</span>
    </Link>
  )
}
