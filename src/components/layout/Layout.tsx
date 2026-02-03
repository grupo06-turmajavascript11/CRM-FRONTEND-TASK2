import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

export default function Layout() {
  const location = useLocation();

  // Lista de rotas onde Navbar e Footer NÃO devem aparecer
  const rotasEscondidas = ["/login", "/cadastro"];
  const deveEsconder = rotasEscondidas.includes(location.pathname);

  return (
    <>
      {/* Renderiza Navbar apenas se NÃO deve esconder */}
      {!deveEsconder && <Navbar />}

      {/* Conteúdo Principal */}
      <div className={`
        min-h-screen
        bg-gray-50 dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        transition-colors duration-300
        ${!deveEsconder ? 'pt-20' : ''} 
      `}>
        {/* ^ A classe 'pt-20' (padding-top) só é aplicada se tiver Navbar. 
           Assim, o Login/Cadastro ocupa a tela toda sem buraco em cima.
        */}
        <Outlet />
      </div>

      {/* Renderiza Footer apenas se NÃO deve esconder */}
      {!deveEsconder && <Footer />}
    </>
  );
}