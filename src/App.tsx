import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// Importando as páginas que criamos
import { Solucoes } from './pages/solucoes/Solucoes';
import { Oportunidades } from './pages/oportunidades/Oportunidades';

function App() {
  return (
    <BrowserRouter>
      
      <nav className="bg-[#0F172A] p-4 shadow-md border-b border-[#7C3AED]/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <div className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#7C3AED]"></span>
            <span className="text-[#7C3AED]">Atlas6</span>
          </div>


          <div className="flex gap-6">
            <Link 
              to="/solucoes" 
              className="text-[#9CA3AF] hover:text-[#7C3AED] font-medium transition-colors"
            >
              Soluções
            </Link>
            <Link 
              to="/oportunidades" 
              className="text-[#9CA3AF] hover:text-[#7C3AED] font-medium transition-colors"
            >
              Oportunidades
            </Link>
          </div>

        </div>
      </nav>

      {/* Configuração das Rotas */}
      <Routes>
        {/* Quando abrir o site, vai direto para Soluções */}
        <Route path="/" element={<Solucoes />} />
        
        <Route path="/solucoes" element={<Solucoes />} />
        <Route path="/oportunidades" element={<Oportunidades />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;