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

function App() {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
