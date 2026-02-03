import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react";
import { AuthContext } from "@/contexts/AuthContext";
import Logo from "@/assets/logo.svg";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const { usuario, handleLogout } = useContext(AuthContext);
  const isLoggedIn = usuario.token !== "";

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return systemPrefersDark;
    }
    return false;
  });

  const destinoLogo = isLoggedIn 
    ? (usuario.tipo === "ADMIN" ? "/admin/oportunidades" : "/cliente/solicitacoes") 
    : "/";

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  function logout() {
    handleLogout();
    navigate("/login");
  }

  // Lógica dos Links
  let navLinks: any[] = [];

  if (!isLoggedIn) {
    // VISITANTE
    navLinks = [
      { label: "Home", path: "/" },
      { label: "Sobre Nós", path: "/sobre" },
    ];
  } else if (usuario.tipo === "CLIENTE") {
    navLinks = [
      { label: "Catálogo", path: "/cliente/catalogo" },
      { label: "Minhas Solicitações", path: "/cliente/solicitacoes" },
    ];
  } else if (usuario.tipo === "ADMIN") {
    navLinks = [
      { label: "Oportunidades", path: "/admin/oportunidades" },
      { label: "Produtos", path: "/admin/produtos" },
      { label: "Categorias", path: "/admin/categorias" },
    ];
  }

  return (
    <nav className="
        fixed top-0 w-full z-50
        bg-light dark:bg-dark
        border-b border-muted dark:border-secondary
        text-dark dark:text-light
        backdrop-blur-md bg-opacity-90 dark:bg-opacity-90
      ">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          <Link to={destinoLogo} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center group-hover:bg-violet-700 transition-colors">
              <img src={Logo} alt="Logo" className="p-1" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-violet-600 transition-colors">
              CRM Atlas 6
            </span>
          </Link>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6">
              {navLinks.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-md transition-all ${
                    isActive(path)
                      ? "font-bold text-violet-600"
                      : "font-medium text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="w-px h-6 bg-gray-400 dark:bg-slate-600 mx-2 hidden md:block" />
            {isLoggedIn ? (
              <div className="flex items-center gap-5">
                
                {/* Link apenas com a Foto/Ícone */}
                <Link 
                  to={`/${(usuario.tipo || "").toLowerCase()}/perfil`} 
                  className="relative group outline-none"
                  title={`Perfil de ${usuario.nome}`} // Tooltip nativo para acessibilidade
                >
                  {usuario.foto ? (
                    <img 
                      src={usuario.foto} 
                      alt="Perfil" 
                      className="w-10 h-10 rounded-full border-2 border-violet-600 object-cover shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300" 
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-violet-600 shadow-md hover:scale-105 transition-all duration-300">
                      <UserIcon size={22} className="text-violet-600" weight="bold" />
                    </div>
                  )}
                </Link>

                {/* Separador Vertical (opcional, mas ajuda na organização visual) */}
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />

                {/* Botão Sair */}
                <button 
                  onClick={logout} 
                  className="group flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                  title="Sair da conta"
                >
                  <SignOutIcon size={24} weight="regular" className="group-hover:scale-110 transition-transform" />
                </button>

              </div>
            ) : (
              <Link
                to="/login"
                className="font-bold text-slate-900 dark:text-slate-100 hover:text-violet-600 transition-colors"
              >
                Entrar
              </Link>
            )}

            {/* <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              aria-label="Alternar tema"
            >
              {darkMode ? (
                <SunIcon size={20} className="text-yellow-400" />
              ) : (
                <MoonIcon size={20} className="text-slate-700" />
              )}
            </button> */}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;