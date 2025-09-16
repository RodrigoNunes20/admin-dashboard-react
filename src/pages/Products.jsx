import { useMemo, useState } from 'react'
import { useProducts } from '../store'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export default function Products() {
  const { list, add, update, remove } = useProducts()
  const [q, setQ] = useState('')
  const filtered = useMemo(() => list.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase())
  ), [q, list])

  const [form, setForm] = useState({ name: '', price: 0, stock: 0 })
  const editing = form.id

  function submit(e){
    e.preventDefault()
    const data = { ...form, price: Number(form.price), stock: Number(form.stock) }
    if(editing){
      update(data)
    }else{
      add({ id: uid(), ...data })
    }
    setForm({ name: '', price: 0, stock: 0 })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Produtos</h1>

      <div className="flex gap-2">
        <input
          value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar por nome"
          className="border rounded-xl p-2 flex-1 bg-transparent"
        />
      </div>

      <form onSubmit={submit} className="rounded-2xl shadow-sm bg-white dark:bg-zinc-900 p-4 grid md:grid-cols-4 gap-2">
        <input className="border rounded-xl p-2 bg-transparent" placeholder="Nome"
          value={form.name} onChange={(e)=>setForm(s=>({...s,name:e.target.value}))} required />
        <input className="border rounded-xl p-2 bg-transparent" placeholder="Preço" type="number" step="0.01"
          value={form.price} onChange={(e)=>setForm(s=>({...s,price:e.target.value}))} required />
        <input className="border rounded-xl p-2 bg-transparent" placeholder="Estoque" type="number"
          value={form.stock} onChange={(e)=>setForm(s=>({...s,stock:e.target.value}))} required />
        <button className="rounded-xl border px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800">
          {editing ? 'Salvar' : 'Adicionar'}
        </button>
      </form>

      <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-200/50 dark:border-zinc-800/50">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-zinc-800/50">
            <tr>
              <th className="text-left p-3">Nome</th>
              <th className="text-left p-3">Preço</th>
              <th className="text-left p-3">Estoque</th>
              <th className="text-right p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-t border-zinc-200/50 dark:border-zinc-800/50">
                <td className="p-3">{p.name}</td>
                <td className="p-3">R$ {p.price.toFixed(2)}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 text-right space-x-2">
                  <button className="rounded-xl border px-2 py-1"
                    onClick={()=>setForm(p)}>Editar</button>
                  <button className="rounded-xl border px-2 py-1"
                    onClick={()=>remove(p.id)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
