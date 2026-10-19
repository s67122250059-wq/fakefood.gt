import { useData } from '../DataContext.jsx'

export default function Status({ children }) {
  const { loading, error, reload } = useData()
  if (loading) return <p className="state">กำลังโหลดข้อมูล...</p>
  if (error) return (
    <div className="state err">
      <p>เกิดข้อผิดพลาด: {error}</p>
      <button className="btn" onClick={reload}>ลองอีกครั้ง</button>
    </div>
  )
  return children
}
