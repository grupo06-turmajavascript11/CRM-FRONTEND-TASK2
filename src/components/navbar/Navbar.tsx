import { Link, useLocation } from "react-router-dom";
import { ChartBarIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // Inicialmente, verifica localStorage, depois preferência do sistema
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return systemPrefersDark;
    }
    return false;
  });

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

  return (
    <nav className="
        fixed top-0 w-full z-50
        bg-[#F8FAFC] dark:bg-[#0F172A]
        border-b border-[#9CA3AF] dark:border-[#64748B]
        text-[#0F172A] dark:text-[#F8FAFC]
      ">

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center group-hover:bg-violet-700 transition-colors">
              <ChartBarIcon size={24} weight="bold" color="white" />
            </div>

            <span className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-violet-600 transition-colors">
              CRM Atlas 6
            </span>
          </Link>

          
          <div className="flex items-center gap-8">

            {[
              { label: "Home", path: "/" },
              { label: "Sobre Nós", path: "/sobre-nos" },
              { label: "Soluções", path: "/solucoes" },
            ].map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`text-md transition-all ${
                  isActive(path)
                    ? "font-bold text-violet-600"
                    : "font-medium text-slate-500 dark:text-slate-400 hover:text-violet-600"
                }`}
              >
                {label}
              </Link>
            ))}

            <div className="w-px h-6 bg-gray-400 dark:bg-slate-600 mx-2" />

            <Link
              to="/"
              className="font-bold text-slate-900 dark:text-slate-100 hover:text-violet-600 transition-colors"
            >
              Entrar
            </Link>

            
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              aria-label="Alternar tema"
            >
              {darkMode ? (
                <SunIcon size={20} className="text-yellow-400" />
              ) : (
                <MoonIcon size={20} className="text-slate-700" />
              )}
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;