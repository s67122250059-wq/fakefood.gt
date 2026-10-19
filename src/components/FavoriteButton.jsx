import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'

export default function FavoriteButton({ id, className = 'fav' }) {
  const { user, favs, toggleFav } = useAuth()
  const nav = useNavigate()
  const on = !!favs[id]
  const click = (e) => {
    e.preventDefault(); e.stopPropagation()
    if (!user) { nav('/profile', { state: { msg: 'กรุณาเข้าสู่ระบบเพื่อบันทึกรายการโปรด' } }); return }
    toggleFav(id)
  }
  return <button className={className} onClick={click} aria-label={on ? 'เอาออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}>{on ? '♥' : '♡'}</button>
}
