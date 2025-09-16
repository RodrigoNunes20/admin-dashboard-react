import { Routes, Route, Navigate } from 'react-router-dom'
import Shell from './layouts/Shell'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Products from './pages/Products'
import Settings from './pages/Settings'
import { useAuth } from './store'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  // Comentário humano: protegemos rotas de forma simples e direta.
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<PrivateRoute><Shell><Dashboard/></Shell></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><Shell><Users/></Shell></PrivateRoute>} />
      <Route path="/products" element={<PrivateRoute><Shell><Products/></Shell></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Shell><Settings/></Shell></PrivateRoute>} />
    </Routes>
  )
}
