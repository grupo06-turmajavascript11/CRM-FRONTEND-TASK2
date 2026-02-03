import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Contextos e Utils
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ui/ScrollTop';
import Layout from './components/layout/Layout';

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Sobre from './pages/Sobre';
import { Oportunidades } from './pages/Oportunidades';
import Produtos from './pages/Produtos';
import Solicitacoes from './pages/Solicitacoes';
import PerfilAdmin from './pages/PerfilAdmin';
import PerfilCliente from './pages/PerfilCliente';
import Catalogo from './pages/Catalogo';
import Categorias from './pages/Categoria';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        
        <Routes>
          <Route path="/" element={<Layout />}>
            
            {/* Rotas Públicas */}
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/sobre" element={<Sobre />} />

            {/* Rotas Protegidas / Funcionais */}
            <Route path="admin/oportunidades" element={<Oportunidades />} />
            <Route path="cliente/solicitacoes" element={<Solicitacoes />} />
            <Route path="cliente/catalogo" element={<Catalogo />} />
            
            {/* Perfis */}
            <Route path="admin/perfil" element={<PerfilAdmin />} />
            <Route path="cliente/perfil" element={<PerfilCliente />} />
            <Route path="admin/categorias" element={<Categorias />} />
            <Route path="admin/produtos" element={<Produtos />} />
            
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