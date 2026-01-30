import { MoreHorizontal, Calendar, User, Plus } from 'lucide-react';

export function Oportunidades() {
  // Dados Mockados (Colunas do Kanban)
  const colunas = [
    {
      titulo: "Novos Leads",
      status: "novo",
      total: 2,
      cor: "bg-blue-500",
      items: [
        { id: 1, cliente: "Tech Softwares", valor: "5.000", data: "30 Jan", user: "Ana" },
        { id: 2, cliente: "Mercado Silva", valor: "2.400", data: "01 Fev", user: "Carlos" },
      ]
    },
    {
      titulo: "Em Negociação",
      status: "negociacao",
      total: 1,
      cor: "bg-yellow-500",
      items: [
        { id: 3, cliente: "Academia Fit", valor: "12.000", data: "28 Jan", user: "Ana" },
      ]
    },
    {
      titulo: "Contrato Fechado",
      status: "ganho",
      total: 2,
      cor: "bg-[#7C3AED]", // Cor da marca
      items: [
        { id: 4, cliente: "Padaria Central", valor: "3.500", data: "25 Jan", user: "Roberto" },
        { id: 5, cliente: "Advocacia João", valor: "8.000", data: "20 Jan", user: "Ana" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 text-[#0F172A]">
      <div className="max-w-7xl mx-auto">
        
        {/* Topo: Título e Botão de Ação */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">CRM Oportunidades</h1>
            <p className="text-[#64748B]">Gerencie seu funil de vendas em tempo real</p>
          </div>
          <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-violet-200 transition-all flex items-center gap-2">
            <Plus size={20} /> Nova Oportunidade
          </button>
        </div>

        {/* Quadro Kanban */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {colunas.map((coluna, index) => (
            <div key={index} className="flex flex-col">
              
              {/* Cabeçalho da Coluna */}
              <div className="flex justify-between items-center mb-4 px-1">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${coluna.cor}`}></div>
                  <h3 className="font-bold text-[#64748B] text-sm uppercase tracking-wide">
                    {coluna.titulo}
                  </h3>
                </div>
                <span className="bg-white border border-[#9CA3AF]/30 text-[#64748B] text-xs font-bold px-2 py-1 rounded">
                  {coluna.total}
                </span>
              </div>

              {/* Área de Cards (Drop Area Simulada) */}
              <div className="bg-[#F1F5F9] rounded-xl p-3 h-full border border-[#9CA3AF]/10 min-h-[400px]">
                <div className="space-y-3">
                  {coluna.items.map((card) => (
                    <div 
                      key={card.id} 
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md border border-transparent hover:border-[#7C3AED]/30 transition-all cursor-pointer group"
                    >
                      {/* Topo do Card */}
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-bold text-[#0F172A] text-sm">{card.cliente}</span>
                        <button className="text-[#9CA3AF] hover:text-[#7C3AED]">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>

                      {/* Valor em Destaque */}
                      <div className="flex items-center gap-1 text-[#0F172A] font-bold text-lg mb-4">
                        <span className="text-[#7C3AED] text-sm">R$</span> {card.valor}
                      </div>

                      {/* Rodapé do Card */}
                      <div className="flex items-center justify-between border-t border-[#F8FAFC] pt-3">
                        <div className="flex items-center gap-1 text-xs text-[#64748B]">
                          <Calendar size={14} /> {card.data}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-1 rounded">
                          <User size={12} /> {card.user}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão Adicionar Rápido */}
                <button className="w-full mt-3 py-2 border border-dashed border-[#9CA3AF] rounded-lg text-[#9CA3AF] text-sm hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-white transition-all">
                  + Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}