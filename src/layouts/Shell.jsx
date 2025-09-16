import { Link, NavLink } from 'react-router-dom'
import { useAuth, useTheme } from '../store'

export default function Shell({ children }) {
  const { user, logout } = useAuth()
  const { theme, toggle } = useTheme()

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100">
        <aside className="fixed inset-y-0 w-64 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border-r border-zinc-200/50 dark:border-zinc-800/50 p-4 hidden md:block">
          <Link to="/" className="block text-xl font-bold mb-6">Admin</Link>
          <nav className="space-y-1">
            {['/', '/users', '/products', '/settings'].map((p, i) => (
              <NavLink key={p} to={p} end={p==='/'}
                className={({isActive}) => `block rounded-xl px-3 py-2 ${isActive ? 'bg-gray-200 dark:bg-zinc-800' : 'hover:bg-gray-100 dark:hover:bg-zinc-900'}`}>
                {['Dashboard','Usuários','Produtos','Configurações'][i]}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="md:pl-64">
          <header className="flex items-center justify-between p-4 sticky top-0 bg-white/60 dark:bg-zinc-900/60 backdrop-blur border-b border-zinc-200/50 dark:border-zinc-800/50">
            <div className="md:hidden"><Link to="/" className="font-semibold">Admin</Link></div>
            <div className="flex items-center gap-3">
              <button onClick={toggle} className="rounded-xl border px-3 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800">
                Tema: {theme}
              </button>
              {user && (
                <>
                  <span className="text-sm opacity-70">{user.email}</span>
                  <button onClick={logout} className="rounded-xl border px-3 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800">
                    Sair
                  </button>
                </>
              )}
            </div>
          </header>
          <div className="p-4 max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
