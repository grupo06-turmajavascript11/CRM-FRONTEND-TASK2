import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import { Oportunidades } from './pages/Oportunidades';
import { Solucoes } from './pages/Solucoes';
import PerfilAdmin from './pages/PerfilAdmin';
import PerfilCliente from './pages/PerfilCliente';
import Solicitacoes from './pages/Solicitacoes';
import Catalogo from './pages/Catalogo';
import Sobre from './pages/Sobre';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Categorias from './pages/Categoria';

function App() {
  return (
    <>
    <Navbar />
    <ToastContainer />
    <BrowserRouter>
    <div className="
      pt-20 min-h-screen
      bg-gray-50 dark:bg-gray-900
      text-gray-900 dark:text-gray-100
      transition-colors duration-300
    ">
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sobre-nos" element={<Sobre />} />
        <Route path="/solucoes" element={<Solucoes />} />
        <Route path="/oportunidades" element={<Oportunidades />} />
        <Route path="/perfil/admin" element={<PerfilAdmin />} />
        <Route path="/perfil/cliente" element={<PerfilCliente />} />
        <Route path="/solicitacoes" element={<Solicitacoes />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/categorias" element={<Categorias />} />
      </Routes>
    </div>
    <Footer />
    </BrowserRouter>
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
  );
}

export default App;
