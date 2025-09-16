import { useTheme } from '../store'

export default function Settings() {
  const { theme, toggle } = useTheme()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Configurações</h1>
      <div className="rounded-2xl shadow-sm bg-white dark:bg-zinc-900 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Tema</div>
            <div className="text-sm opacity-70">Alterne entre claro e escuro</div>
          </div>
          <button onClick={toggle} className="rounded-xl border px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800">
            Atual: {theme}
          </button>
        </div>
      </div>
    </div>
  )
}
