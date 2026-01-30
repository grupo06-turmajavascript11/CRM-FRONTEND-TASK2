import { ShoppingCart, CheckCircle } from 'lucide-react';

export function Solucoes() {
  // Dados Mockados
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
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      
      {/* Header da Página */}
      <div className="bg-[#0F172A] py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Nossas <span className="text-[#7C3AED]">Soluções</span>
        </h1>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto text-lg">
          Ferramentas estratégicas para escalar o seu negócio com tecnologia e inteligência.
        </p>
      </div>

      {/* Grid de Cards */}
      <div className="max-w-6xl mx-auto p-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solucoes.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-xl border border-[#9CA3AF]/20 overflow-hidden hover:border-[#7C3AED] transition-all duration-300 group hover:-translate-y-2">
              
              {/* Corpo do Card */}
              <div className="p-8">
                <span className="bg-[#F8FAFC] text-[#7C3AED] text-xs font-bold px-3 py-1 rounded-full border border-[#7C3AED]/20 uppercase tracking-wider mb-4 inline-block">
                  {item.categoria}
                </span>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-[#7C3AED] transition-colors">
                  {item.titulo}
                </h3>
                <p className="text-[#64748B] mb-6 text-sm leading-relaxed">
                  {item.descricao}
                </p>

                {/* Lista de Features */}
                <ul className="space-y-3 mb-8">
                  {item.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#64748B]">
                      <CheckCircle size={16} className="text-[#7C3AED]" /> {feat}
                    </li>
                  ))}
                </ul>

                {/* Preço e Botão */}
                <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-6">
                  <div>
                    <span className="text-xs text-[#9CA3AF] block">Investimento</span>
                    <span className="text-xl font-bold text-[#0F172A]">{item.preco}</span>
                  </div>
                  <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white p-3 rounded-xl shadow-lg shadow-violet-200 transition-all active:scale-95">
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