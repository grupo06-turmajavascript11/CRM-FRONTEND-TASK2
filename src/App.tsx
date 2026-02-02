import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Solicitacoes from './pages/Solicitacoes'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Categorias from './pages/Categoria'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
  <>
    <Navbar />

    <main className="
      pt-20 min-h-screen
      bg-gray-50 dark:bg-gray-900
      text-gray-900 dark:text-gray-100
      transition-colors duration-300
    ">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/solicitacoes" element={<Solicitacoes />} />
      <Route path="/categorias" element={<Categorias />} />
    </Routes>
    </main>
    <Footer />

    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
  </>
  )
}

export default App
