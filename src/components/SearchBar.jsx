import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function SearchBar() {
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const nav = useNavigate()
  const submit = (e) => { e.preventDefault(); if (q.trim()) nav(`/search?q=${encodeURIComponent(q.trim())}`) }
  return (
    <div className="searchbar" role="search">
      <form onSubmit={submit}>
        <input type="search" placeholder="🔍 ค้นหาอาหารปลอม..." value={q} onChange={(e) => setQ(e.target.value)} aria-label="ค้นหา" />
      </form>
    </div>
  )
}
