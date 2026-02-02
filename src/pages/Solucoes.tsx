import { ShoppingCart, CheckCircle } from 'lucide-react';

export function Solucoes() {
  const solucoes = [
    {
      id: 1,
      titulo: "Consultoria CRM",
      descricao: "Implementação completa do sistema de gestão para sua empresa.",
      preco: "R$ 1.500",
      categoria: "Serviço",
      features: ["Setup Inicial", "Treinamento", "Suporte 30 dias"]
    },
    {
      id: 2,
      titulo: "Licença Enterprise",
      descricao: "Acesso total a todas as ferramentas de automação e IA.",
      preco: "R$ 299/mês",
      categoria: "Assinatura",
      features: ["Usuários Ilimitados", "Dashboard IA", "API Aberta"]
    },
    {
      id: 3,
      titulo: "Mentoria de Vendas",
      descricao: "Aumente a conversão do seu time com nossa metodologia ágil.",
      preco: "R$ 800",
      categoria: "Mentoria",
      features: ["4 Encontros", "Material PDF", "Certificado"]
    }
  ];

  return (
    <div className="min-h-screen bg-light font-sans text-dark">
      
      {/* Header com bg-dark e fonte heading */}
      <div className="bg-dark py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-4 font-heading">
          Nossas <span className="text-primary">Soluções</span>
        </h1>
        <p className="text-muted max-w-2xl mx-auto text-lg">
          Ferramentas estratégicas para escalar o seu negócio com tecnologia e inteligência.
        </p>
      </div>

      {/* Grid de Cards */}
      <div className="max-w-6xl mx-auto p-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solucoes.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-xl border border-muted/20 overflow-hidden hover:border-primary transition-all duration-300 group hover:-translate-y-2">
              
              <div className="p-8">
                {/* Badge usando cores do tema */}
                <span className="bg-light text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20 uppercase tracking-wider mb-4 inline-block">
                  {item.categoria}
                </span>
                
                <h3 className="text-2xl font-bold mb-2 font-heading group-hover:text-primary transition-colors">
                  {item.titulo}
                </h3>
                
                <p className="text-secondary mb-6 text-sm leading-relaxed">
                  {item.descricao}
                </p>

                {/* Lista de Features */}
                <ul className="space-y-3 mb-8">
                  {item.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-secondary">
                      <CheckCircle size={16} className="text-primary" /> {feat}
                    </li>
                  ))}
                </ul>

                {/* Preço e Botão */}
                <div className="flex items-center justify-between border-t border-muted/10 pt-6">
                  <div>
                    <span className="text-xs text-muted block">Investimento</span>
                    <span className="text-xl font-bold text-dark">{item.preco}</span>
                  </div>
                  <button className="bg-primary hover:bg-primary-hover text-white p-3 rounded-xl shadow-lg shadow-violet-200 transition-all active:scale-95">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}