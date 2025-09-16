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
    login(email || 'admin@example.com') // login simulado
    navigate('/')
  }

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-gradient-to-b from-gray-100 to-white dark:from-zinc-950 dark:to-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl shadow-lg border border-gray-200/70 dark:border-zinc-800/60 bg-white/90 dark:bg-zinc-900/80 backdrop-blur p-6 space-y-4"
      >
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold">Bem-vindo</h1>
          <p className="text-sm text-gray-600 dark:text-zinc-400">Entre para acessar o painel administrativo.</p>
        </header>

        <label className="block">
          <span className="text-sm font-medium">E-mail</span>
          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            className="mt-1 w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-zinc-100 placeholder-gray-500"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Senha</span>
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1 w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-zinc-100 placeholder-gray-500"
          />
        </label>

        <button
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 transition-colors"
        >
          Entrar
        </button>

        <p className="text-xs text-gray-500 dark:text-zinc-400">
          Dica: o login é simulado. Basta informar um e-mail qualquer para continuar.
        </p>
      </form>
    </div>
  )
}
