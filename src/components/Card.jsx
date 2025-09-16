export default function Card({ title, value, children }) {
  return (
    <div className="rounded-2xl shadow-sm bg-white dark:bg-zinc-900 p-4">
      <div className="text-sm opacity-60">{title}</div>
      <div className="text-2xl font-semibold mb-2">{value}</div>
      {children}
    </div>
  )
}
