import { useMemo, useState } from 'react'
import { useUsers } from '../store'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export default function Users() {
  const { list, add, update, remove } = useUsers()
  const [q, setQ] = useState('')
  const filtered = useMemo(() => list.filter(u =>
    u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())
  ), [q, list])

  const [form, setForm] = useState({ name: '', email: '', role: 'User' })
  const editing = form.id

  function submit(e){
    e.preventDefault()
    if(editing){
      update(form)
    }else{
      add({ id: uid(), ...form })
    }
    setForm({ name: '', email: '', role: 'User' })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Usuários</h1>

      <div className="flex gap-2">
        <input
          value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar por nome ou e-mail"
          className="border rounded-xl p-2 flex-1 bg-transparent"
        />
      </div>

      <form onSubmit={submit} className="rounded-2xl shadow-sm bg-white dark:bg-zinc-900 p-4 grid md:grid-cols-4 gap-2">
        <input className="border rounded-xl p-2 bg-transparent" placeholder="Nome"
          value={form.name} onChange={(e)=>setForm(s=>({...s,name:e.target.value}))} required />
        <input className="border rounded-xl p-2 bg-transparent" placeholder="E-mail"
          value={form.email} onChange={(e)=>setForm(s=>({...s,email:e.target.value}))} required />
        <select className="border rounded-xl p-2 bg-transparent"
          value={form.role} onChange={(e)=>setForm(s=>({...s,role:e.target.value}))}>
          <option>User</option>
          <option>Admin</option>
        </select>
        <button className="rounded-xl border px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800">
          {editing ? 'Salvar' : 'Adicionar'}
        </button>
      </form>

      <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-200/50 dark:border-zinc-800/50">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-zinc-800/50">
            <tr>
              <th className="text-left p-3">Nome</th>
              <th className="text-left p-3">E-mail</th>
              <th className="text-left p-3">Perfil</th>
              <th className="text-right p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-t border-zinc-200/50 dark:border-zinc-800/50">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3 text-right space-x-2">
                  <button className="rounded-xl border px-2 py-1"
                    onClick={()=>setForm(u)}>Editar</button>
                  <button className="rounded-xl border px-2 py-1"
                    onClick={()=>remove(u.id)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
