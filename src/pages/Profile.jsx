import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'

const MSG = {
  'auth/invalid-credential': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
  'auth/invalid-email': 'รูปแบบอีเมลไม่ถูกต้อง',
  'auth/email-already-in-use': 'อีเมลนี้ถูกใช้งานแล้ว',
  'auth/weak-password': 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร',
  'auth/network-request-failed': 'เชื่อมต่อเครือข่ายไม่ได้',
}

export default function Profile() {
  const { user, ready, login, register, logout, favs } = useAuth()
  const loc = useLocation(); const nav = useNavigate()
  const [mode, setMode] = useState('login')
  const [f, setF] = useState({ name: '', email: '', pw: '' })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault(); setErr('')
    if (!f.email.trim() || !f.pw) { setErr('กรุณากรอกอีเมลและรหัสผ่าน'); return }
    if (mode === 'register' && f.pw.length < 6) { setErr(MSG['auth/weak-password']); return }
    setBusy(true)
    try {
      mode === 'login' ? await login(f.email.trim(), f.pw) : await register(f.name.trim(), f.email.trim(), f.pw)
      nav('/favorites')
    } catch (ex) { setErr(MSG[ex.code] || 'เกิดข้อผิดพลาด กรุณาลองใหม่') }
    finally { setBusy(false) }
  }

  if (!ready) return <p className="state">กำลังตรวจสอบผู้ใช้...</p>
  if (user) return (
    <div className="box">
      <h1>โปรไฟล์</h1>
      <p><b>ชื่อ:</b> {user.displayName || '-'}</p>
      <p><b>อีเมล:</b> {user.email}</p>
      <p><b>รายการโปรด:</b> {Object.keys(favs).length} รายการ</p>
      <button className="btn" onClick={logout}>ออกจากระบบ</button>
    </div>
  )
  return (
    <form className="box" onSubmit={submit} noValidate>
      <h1>{mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</h1>
      {loc.state?.msg && <p className="note">{loc.state.msg}</p>}
      {mode === 'register' && <label>ชื่อที่แสดง<input value={f.name} onChange={set('name')} /></label>}
      <label>อีเมล<input type="email" value={f.email} onChange={set('email')} autoComplete="email" /></label>
      <label>รหัสผ่าน<input type="password" value={f.pw} onChange={set('pw')} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></label>
      {err && <p className="err">{err}</p>}
      <button className="btn" disabled={busy}>{busy ? 'กำลังดำเนินการ...' : mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</button>
      <button type="button" className="link" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErr('') }}>
        {mode === 'login' ? 'ยังไม่มีบัญชี? สมัครสมาชิก' : 'มีบัญชีแล้ว? เข้าสู่ระบบ'}
      </button>
    </form>
  )
}
