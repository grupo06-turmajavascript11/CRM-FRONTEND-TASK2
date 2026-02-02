import { MoreHorizontal, Calendar, User, Plus } from 'lucide-react';

export function Oportunidades() {
  const colunas = [
    {
      titulo: "Novos Leads",
      status: "novo",
      total: 2,
      corBola: "bg-blue-500",
      items: [
        { id: 1, cliente: "Tech Softwares", valor: "5.000", data: "30 Jan", user: "Ana" },
        { id: 2, cliente: "Mercado Silva", valor: "2.400", data: "01 Fev", user: "Carlos" },
      ]
    },
    {
      titulo: "Em Negociação",
      status: "negociacao",
      total: 1,
      corBola: "bg-yellow-500",
      items: [
        { id: 3, cliente: "Academia Fit", valor: "12.000", data: "28 Jan", user: "Ana" },
      ]
    },
    {
      titulo: "Contrato Fechado",
      status: "ganho",
      total: 2,
      corBola: "bg-primary", // Usando a variável do tema
      items: [
        { id: 4, cliente: "Padaria Central", valor: "3.500", data: "25 Jan", user: "Roberto" },
        { id: 5, cliente: "Advocacia João", valor: "8.000", data: "20 Jan", user: "Ana" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-light p-8 text-dark font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Topo */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-dark font-heading">CRM Oportunidades</h1>
            <p className="text-secondary">Gerencie seu funil de vendas em tempo real</p>
          </div>
          <button className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-violet-200 transition-all flex items-center gap-2">
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
                  <div className={`w-3 h-3 rounded-full ${coluna.corBola}`}></div>
                  <h3 className="font-bold text-secondary text-sm uppercase tracking-wide font-heading">
                    {coluna.titulo}
                  </h3>
                </div>
                <span className="bg-white border border-muted/30 text-secondary text-xs font-bold px-2 py-1 rounded">
                  {coluna.total}
                </span>
              </div>

              {/* Área de Cards */}
              <div className="bg-gray-100 rounded-xl p-3 h-full border border-muted/10 min-h-100">
                <div className="space-y-3">
                  {coluna.items.map((card) => (
                    <div 
                      key={card.id} 
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md border border-transparent hover:border-primary/30 transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-bold text-dark text-sm">{card.cliente}</span>
                        <button className="text-muted hover:text-primary">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>

                      <div className="flex items-center gap-1 text-dark font-bold text-lg mb-4">
                        <span className="text-primary text-sm">R$</span> {card.valor}
                      </div>

                      <div className="flex items-center justify-between border-t border-light pt-3">
                        <div className="flex items-center gap-1 text-xs text-secondary">
                          <Calendar size={14} /> {card.data}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          <User size={12} /> {card.user}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-3 py-2 border border-dashed border-muted rounded-lg text-muted text-sm hover:border-primary hover:text-primary hover:bg-white transition-all">
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