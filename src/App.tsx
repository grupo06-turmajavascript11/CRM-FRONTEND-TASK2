import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Contextos e Utils
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ui/ScrollTop';
import Layout from './components/layout/Layout'; // Importe o Layout criado acima

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Sobre from './pages/Sobre';
import { Oportunidades } from './pages/Oportunidades';
import { Solucoes } from './pages/Solucoes';
import Solicitacoes from './pages/Solicitacoes';
import PerfilAdmin from './pages/PerfilAdmin';
import PerfilCliente from './pages/PerfilCliente';

// Paginas Comentadas (mantidas conforme pedido)
import Catalogo from './pages/Catalogo';
// import Categorias from './pages/Categoria';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        
        <Routes>
          {/* O Layout envolve todas as rotas */}
          <Route path="/" element={<Layout />}>
            
            {/* Rotas Públicas */}
            <Route index element={<Home />} /> {/* Rota raiz "/" */}
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/solucoes" element={<Solucoes />} />

            {/* Rotas Protegidas / Funcionais */}
            <Route path="/oportunidades" element={<Oportunidades />} />
            <Route path="/solicitacoes" element={<Solicitacoes />} />
            
            {/* Perfis */}
            <Route path="/admin/perfil" element={<PerfilAdmin />} />
            <Route path="/cliente/perfil" element={<PerfilCliente />} />

            {/* Rotas Futuras */}
            <Route path="/catalogo" element={<Catalogo />} />
            {/* <Route path="/categorias" element={<Categorias />} /> */}
            
          </Route>
        </Routes>

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
    </AuthProvider>
  );
}

export default App;