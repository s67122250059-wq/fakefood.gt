import { Link } from 'react-router-dom'
import Img from './Img.jsx'
import FavoriteButton from './FavoriteButton.jsx'

export default function ItemCard({ item }) {
  return (
    <article className="card">
      <Link to={`/item/${item.id}`} className="thumb">
        <Img src={item.thumb} alt={item.name_th} />
        {item.is_recommended && <em className="rec">แนะนำ</em>}
      </Link>
      <FavoriteButton id={item.id} />
      <div className="body">
        <Link to={`/item/${item.id}`}><h3>{item.name_th}</h3></Link>
        <small>{item.name_en}</small>
        <p className="sum">{item.summary}</p>
        <div className="tags">{(item.tags || []).map((t) => <span key={t}>{t}</span>)}</div>
      </div>
    </article>
  )
}
