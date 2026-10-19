import { Link } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="brand">
        <img src="/logo.webp" alt="FakeFood.GT" onError={(e) => { e.currentTarget.style.display = 'none' }} />
        <span><b>FakeFood.GT</b><small>รู้ทันอาหารปลอม ปลอดภัยทุกมื้อ</small></span>
      </Link>
      <SearchBar />
    </header>
  )
}
