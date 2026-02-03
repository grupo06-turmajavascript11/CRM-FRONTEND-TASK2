import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WarningCircleIcon, ShoppingCartIcon, CircleNotchIcon } from "@phosphor-icons/react"; 
import { AuthContext } from "@/contexts/AuthContext";
import Produto from "@/models/Produto";
import api from "@/services/Service";

export default function MinhasSolicitacoes() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const [solicitacoes, setSolicitacoes] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function buscarSolicitacoes() {
    if (!usuario.id || usuario.id === 0) return;

    try {
      const header = { headers: { Authorization: usuario.token } };
      const resposta = await api.get(`/produtos/meus-seguros/${usuario.id}`, header);
      setSolicitacoes(resposta.data);
    } catch (error: any) {
      console.error("Erro ao buscar solicitações", error);
      if (error.toString().includes("403")) {
         alert("Sua sessão expirou.");
         navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Função cancelarSolicitacao REMOVIDA

  useEffect(() => {
    buscarSolicitacoes();
  }, [usuario.id]);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark pt-24 px-6 pb-12 transition-colors duration-300">
      <div className="container mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <ShoppingCartIcon size={32} className="text-violet-600" />
            Minhas Solicitações
          </h1>
          
          <Link 
            to="/catalogo" 
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-bold transition-colors shadow-lg hover:shadow-violet-500/30 flex items-center gap-2"
          >
             + Nova Solicitação
          </Link>
        </div>

        {/* LOADING */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
             <CircleNotchIcon size={48} className="animate-spin text-violet-600" weight="bold" />
             <p className="text-slate-500 dark:text-slate-400 font-medium">Carregando seus seguros...</p>
          </div>
        ) : (
          <>
            {solicitacoes.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center flex flex-col items-center shadow-sm border border-slate-200 dark:border-slate-700">
                <WarningCircleIcon size={64} className="text-slate-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Você ainda não tem solicitações.
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Explore nosso catálogo e encontre o seguro ideal para você.
                </p>
                <Link 
                  to="/catalogo"
                  className="text-violet-600 hover:text-violet-500 font-bold underline"
                >
                  Ir para o Catálogo
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solicitacoes.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group flex flex-col"
                  >
                    
                    {/* Header do Card (Categoria e Status) */}
                    <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {item.categoria?.nome || "Serviço"}
                      </span>
                      
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-bold border
                        ${item.status === 'EM_NEGOCIACAO' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : ''}
                        ${item.status === 'FECHADO' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                        ${item.status === 'DISPONIVEL' ? 'bg-blue-100 text-blue-700 border-blue-200' : ''}
                      `}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Corpo do Card */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-violet-600 transition-colors">
                        {item.nome}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
                        {item.descricao}
                      </p>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                         <p className="text-xs text-slate-500 uppercase font-semibold">Valor</p>
                         <p className="text-2xl font-bold text-violet-600">
                           {formatarMoeda(item.preco)}
                         </p>
                      </div>
                    </div>

                    {/* Botão de Cancelar REMOVIDO daqui */}
                    
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}