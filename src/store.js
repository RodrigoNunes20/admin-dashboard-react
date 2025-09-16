import { create } from 'zustand'

// Comentário humano: estado global simples e legível, sem abstrações desnecessárias.
export const useAuth = create((set) => ({
  user: null,
  login: (email) => set({ user: { email, name: 'Admin' } }),
  logout: () => set({ user: null })
}))

export const useTheme = create((set) => ({
  theme: 'light',
  toggle: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' }))
}))

const seedUsers = [
  { id: 'u1', name: 'Ana Clara', email: 'ana@example.com', role: 'Admin' },
  { id: 'u2', name: 'Bruno Lima', email: 'bruno@example.com', role: 'User' }
]

const seedProducts = [
  { id: 'p1', name: 'Mouse Pro', price: 129.9, stock: 30 },
  { id: 'p2', name: 'Teclado Slim', price: 199.0, stock: 18 }
]

function getLS(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export const useUsers = create((set) => ({
  list: getLS('users', seedUsers),
  add: (u) => set((s) => {
    const list = [...s.list, u]
    localStorage.setItem('users', JSON.stringify(list))
    return { list }
  }),
  update: (u) => set((s) => {
    const list = s.list.map(x => x.id === u.id ? u : x)
    localStorage.setItem('users', JSON.stringify(list))
    return { list }
  }),
  remove: (id) => set((s) => {
    const list = s.list.filter(x => x.id !== id)
    localStorage.setItem('users', JSON.stringify(list))
    return { list }
  })
}))

export const useProducts = create((set) => ({
  list: getLS('products', seedProducts),
  add: (p) => set((s) => {
    const list = [...s.list, p]
    localStorage.setItem('products', JSON.stringify(list))
    return { list }
  }),
  update: (p) => set((s) => {
    const list = s.list.map(x => x.id === p.id ? p : x)
    localStorage.setItem('products', JSON.stringify(list))
    return { list }
  }),
  remove: (id) => set((s) => {
    const list = s.list.filter(x => x.id !== id)
    localStorage.setItem('products', JSON.stringify(list))
    return { list }
  })
}))
