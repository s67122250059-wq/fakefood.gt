import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { ref, get } from 'firebase/database'
import { db } from './firebase.js'

const DataContext = createContext(null)
export const useData = () => useContext(DataContext)

// รองรับทั้งชื่อฟิลด์ *_path (ตาม Data Dictionary) และ *_url
const norm = (id, v) => ({
  id, ...v,
  thumb: v.thumbnail_path || v.thumbnail_url || '',
  detailImg: v.detail_image_path || v.detail_image_url || '',
  tags: Object.values(v.tags || {}),
  checks: Object.values(v.how_to_check || {}),
  summary: v.summary || v.description || '',
})

export function DataProvider({ children }) {
  const [categories, setCategories] = useState({})
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const [c, i] = await Promise.all([get(ref(db, 'categories')), get(ref(db, 'items'))])
      setCategories(c.val() || {})
      setItems(Object.entries(i.val() || {}).map(([id, v]) => norm(id, v)))
    } catch (e) {
      setError(e.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล')
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  return <DataContext.Provider value={{ categories, items, loading, error, reload: load }}>{children}</DataContext.Provider>
}
