import { useState } from 'react'

export default function Img({ src, alt, fallback = '🍽️' }) {
  const [ok, setOk] = useState(!!src)
  return ok ? <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} /> : <span className="fb">{fallback}</span>
}
