import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Solicitacoes from './pages/Solicitacoes'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/solicitacoes" element={<Solicitacoes />} />
    </Routes>
  )
}

export default App
