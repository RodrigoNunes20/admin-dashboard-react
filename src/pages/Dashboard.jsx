import Card from '../components/Card'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie } from 'recharts'

const sales = [
  { month: 'Jan', value: 1200 },
  { month: 'Fev', value: 1500 },
  { month: 'Mar', value: 1800 },
  { month: 'Abr', value: 1600 },
  { month: 'Mai', value: 2100 },
  { month: 'Jun', value: 2400 },
]

const pie = [
  { name: 'Mouse', value: 400 },
  { name: 'Teclado', value: 300 },
  { name: 'Headset', value: 300 }
]

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Faturamento (30d)" value="R$ 12.450" />
        <Card title="Pedidos" value="328" />
        <Card title="Clientes" value="1.092" />
        <Card title="Ticket Médio" value="R$ 37,95" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl shadow-sm bg-white dark:bg-zinc-900 p-4 lg:col-span-2">
          <div className="text-sm opacity-60 mb-2">Vendas por mês</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl shadow-sm bg-white dark:bg-zinc-900 p-4">
          <div className="text-sm opacity-60 mb-2">Mix de produtos</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pie} dataKey="value" nameKey="name" outerRadius={80} label />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
