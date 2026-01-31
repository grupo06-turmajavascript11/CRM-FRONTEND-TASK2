import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Solucoes } from './pages/solucoes/Solucoes';
import { Oportunidades } from './pages/oportunidades/Oportunidades';

function App() {
  return (
    <BrowserRouter>
      
      {/* Navbar com cores do tema */}
      <nav className="bg-dark p-4 shadow-md border-b border-primary/30 font-sans">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo Atlas6 */}
          <div className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            <span className="text-primary font-heading tracking-wide">Atlas6</span>
          </div>

          {/* Links de Navegação */}
          <div className="flex gap-6">
            <Link 
              to="/solucoes" 
              className="text-muted hover:text-primary font-medium transition-colors"
            >
              Soluções
            </Link>
            <Link 
              to="/oportunidades" 
              className="text-muted hover:text-primary font-medium transition-colors"
            >
              Oportunidades
            </Link>
          </div>

        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Solucoes />} />
        <Route path="/solucoes" element={<Solucoes />} />
        <Route path="/oportunidades" element={<Oportunidades />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;