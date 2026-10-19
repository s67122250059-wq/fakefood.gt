import { NavLink } from 'react-router-dom'

const tabs = [['/', '🏠', 'Home'], ['/categories', '▦', 'Categories'], ['/favorites', '♥', 'Favorites'], ['/profile', '👤', 'Profile']]

export default function Navigation() {
  return (
    <nav className="nav">
      {tabs.map(([to, ic, label]) => (
        <NavLink key={to} to={to} end={to === '/'}><span>{ic}</span>{label}</NavLink>
      ))}
    </nav>
  )
}
