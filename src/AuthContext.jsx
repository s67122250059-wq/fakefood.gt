import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { ref, onValue, set, remove } from 'firebase/database'
import { auth, db } from './firebase.js'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  const [favs, setFavs] = useState({})

  useEffect(() => onAuthStateChanged(auth, (u) => { setUser(u); setReady(true) }), [])

  useEffect(() => {
    if (!user) { setFavs({}); return }
    return onValue(ref(db, `favorites/${user.uid}`), (s) => setFavs(s.val() || {}), () => setFavs({}))
  }, [user])

  const login = (email, pw) => signInWithEmailAndPassword(auth, email, pw)
  const register = async (name, email, pw) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pw)
    if (name) await updateProfile(cred.user, { displayName: name })
    await set(ref(db, `users/${cred.user.uid}`), { name: name || '', email, created_at: Date.now() })
  }
  const logout = () => signOut(auth)
  const toggleFav = (id) => {
    if (!user) return false
    const r = ref(db, `favorites/${user.uid}/${id}`)
    favs[id] ? remove(r) : set(r, true)
    return true
  }

  return <AuthContext.Provider value={{ user, ready, favs, login, register, logout, toggleFav }}>{children}</AuthContext.Provider>
}
