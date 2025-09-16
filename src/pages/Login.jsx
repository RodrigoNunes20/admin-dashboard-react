import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // Comentário humano: login fake para fins didáticos
    login(email || 'admin@example.com')
    navigate('/')
  }

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-gradient-to-b from-gray-100 to-white dark:from-zinc-950 dark:to-zinc-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-6 w-full max-w-sm space-y-3">
        <h1 className="text-xl font-semibold">Entrar</h1>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Seu e-mail"
          className="w-full border rounded-xl p-2 bg-transparent" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Senha"
          className="w-full border rounded-xl p-2 bg-transparent" />
        <button className="w-full rounded-xl border px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800">Entrar</button>
      </form>
    </div>
  )
}
