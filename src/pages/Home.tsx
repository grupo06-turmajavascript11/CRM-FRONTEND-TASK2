const Home = () => {
  return (
    // 1. Fundo Geral (bg-light) e Fonte Padrão (font-sans/Inter)
    <div className="min-h-screen bg-light font-sans selection:bg-primary selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="w-full border-b border-muted/20 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-heading font-bold text-2xl text-primary">
            LogoBrand
          </div>
          <div className="hidden md:flex space-x-8 text-secondary text-sm font-medium">
            <a href="#" className="hover:text-primary transition-colors">Início</a>
            <a href="#" className="hover:text-primary transition-colors">Sobre</a>
            <a href="#" className="hover:text-primary transition-colors">Serviços</a>
          </div>
          <button className="px-4 py-2 rounded-lg border border-muted text-dark text-sm hover:bg-gray-50 transition-colors">
            Login
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        
        {/* Badge de novidade (Testando borda e cor primária suave) */}
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-6">
          NOVA VERSÃO DO TAILWIND v4.0
        </span>

        {/* Título Principal (Testando font-heading e text-dark) */}
        <h1 className="font-heading text-5xl md:text-6xl font-bold text-dark mb-6 leading-tight">
          Construindo interfaces <br />
          com <span className="text-primary">nossas cores</span> personalizadas
        </h1>

        {/* Subtítulo (Testando text-secondary) */}
        <p className="text-secondary text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Este é um componente de teste para validar se o Tailwind está carregando a fonte <strong className="text-dark">Inter</strong> para textos e <strong className="text-dark">Poppins</strong> para títulos, além da nossa paleta Roxa e Cinza.
        </p>

        {/* Botões de Ação (Testando bg-primary e hover) */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-lg font-semibold shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-1">
            Começar Agora
          </button>
          
          <button className="bg-white text-dark border border-muted hover:border-dark px-8 py-3.5 rounded-lg font-semibold transition-colors">
            Documentação
          </button>
        </div>
      </main>

      {/* --- FEATURE CARDS (Testando background branco vs bg-light) --- */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white p-8 rounded-2xl border border-muted/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-primary text-xl font-bold">#{item}</span>
            </div>
            <h3 className="font-heading font-bold text-xl text-dark mb-2">
              Feature de Teste
            </h3>
            <p className="text-secondary text-sm leading-relaxed">
              Aqui testamos a legibilidade da cor "Secondary" (Slate Grey) sobre o fundo branco, garantindo contraste suficiente para leitura.
            </p>
          </div>
        ))}
      </section>

    </div>
  );
};

export default Home;