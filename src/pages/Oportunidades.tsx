import { useState, useContext, useEffect } from 'react';
import { 
  CalendarIcon, 
  UserIcon, 
  CircleNotchIcon, 
  CheckCircleIcon,
  EnvelopeSimpleIcon,
  TrendUpIcon,
  PhoneIcon
} from '@phosphor-icons/react'; 

import { AuthContext } from '../contexts/AuthContext';
import api from '../services/Service';
import Produto from '../models/Produto';

export function Oportunidades() {
  const { usuario } = useContext(AuthContext);
  const [oportunidades, setOportunidades] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. BUSCAR DADOS ---
  async function buscarOportunidades() {
    try {
      const header = { headers: { Authorization: usuario.token } };
      const resposta = await api.get("/produtos", header);
      setOportunidades(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar oportunidades", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (usuario.token) {
      buscarOportunidades();
    }
  }, [usuario.token]);

  // --- 2. FECHAR NEGÓCIO ---
  async function handleFecharNegocio(produto: Produto) {
    if (!confirm(`Confirmar venda do seguro "${produto.nome}" para ${produto.usuario?.nome}?`)) return;

    try {
      const header = { headers: { Authorization: usuario.token } };

      const produtoAtualizado = {
        id: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
        preco: Number(produto.preco),
        status: "FECHADO",
        categoria: { id: produto.categoria.id },
      };

      await api.put('/produtos', produtoAtualizado, header);
      
      alert("Sucesso! Contrato fechado e registrado.");
      buscarOportunidades(); 

    } catch (error) {
      console.error("Erro ao fechar negócio:", error);
      alert("Erro ao atualizar status.");
    }
  }

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  const formatarData = (dataIso?: string) => {
    if (!dataIso) return new Date().toLocaleDateString('pt-BR');
    return new Date(dataIso).toLocaleDateString('pt-BR');
  };

  // --- 3. COLUNAS ---
  const leadsEmNegociacao = oportunidades.filter(o => o.status === "EM_NEGOCIACAO");
  const contratosFechados = oportunidades.filter(o => o.status === "FECHADO");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <CircleNotchIcon size={48} className="animate-spin text-violet-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-8 pt-24 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* TOPO */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white font-heading flex items-center gap-3">
            <TrendUpIcon className="text-violet-600" />
            CRM de Vendas
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Gerencie leads e feche contratos.</p>
        </div>

        {/* GRID DE 2 COLUNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* === COLUNA 1: EM NEGOCIAÇÃO === */}
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 px-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
                <h3 className="font-bold text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wide">
                  Em Negociação (Leads)
                </h3>
              </div>
              <span className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-3 py-1 rounded-full">
                {leadsEmNegociacao.length}
              </span>
            </div>

            <div className="bg-gray-100/50 dark:bg-gray-800/30 rounded-2xl p-4 h-full border border-dashed border-gray-300 dark:border-gray-700 min-h-125">
              <div className="space-y-4">
                {leadsEmNegociacao.map((card) => (
                  <div 
                    key={card.id} 
                    className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border-l-4 border-l-yellow-500 hover:shadow-lg transition-all group border-y border-r border-gray-100 dark:border-gray-700"
                  >
                    {/* Dados do Produto */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-xs font-bold text-yellow-600 dark:text-yellow-500 uppercase mb-1 block">
                          {card.categoria?.nome || "Serviço"}
                        </span>
                        <span className="font-bold text-gray-800 dark:text-white text-lg block leading-tight line-clamp-1">
                          {card.nome}
                        </span>
                      </div>
                      <div className="font-bold text-violet-600 bg-violet-50 dark:bg-violet-900/30 px-2 py-1 rounded text-sm whitespace-nowrap">
                        {formatarMoeda(card.preco)}
                      </div>
                    </div>

                    {/* === DADOS DO LEAD (COM FOTO E TELEFONE) === */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 mb-4 border border-gray-100 dark:border-gray-700">
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-3 tracking-wider">
                        Contato do Cliente
                      </p>
                      
                      <div className="flex items-start gap-3">
                        
                        {/* FOTO DO CLIENTE */}
                        <div className="shrink-0">
                          {card.usuario?.foto ? (
                            <img 
                              src={card.usuario.foto} 
                              alt={card.usuario.nome} 
                              className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600" 
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                              <UserIcon size={20} weight="fill" />
                            </div>
                          )}
                        </div>

                        {/* INFO DO CLIENTE */}
                        <div className="flex flex-col gap-1 overflow-hidden">
                          <span className="font-bold text-sm text-gray-700 dark:text-gray-200 truncate">
                            {card.usuario?.nome || "Nome não informado"}
                          </span>
                          
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 truncate" title={card.usuario?.email}>
                            <EnvelopeSimpleIcon size={14} weight="bold" />
                            <span className="truncate">{card.usuario?.email || "Email oculto"}</span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 truncate">
                             <PhoneIcon size={14} weight="bold" />
                             <span className="truncate">{card.usuario?.telefone || "Sem telefone cadastrado"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ações e Data */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <CalendarIcon size={14} /> Entrada: {formatarData()}
                      </div>
                      
                      <button 
                        onClick={() => handleFecharNegocio(card)}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center gap-1.5 transition-colors shadow-md hover:shadow-green-500/20"
                      >
                        <CheckCircleIcon size={16} weight="bold" />
                        Fechar Negócio
                      </button>
                    </div>
                  </div>
                ))}
                
                {leadsEmNegociacao.length === 0 && (
                   <p className="text-center text-gray-400 text-sm mt-10">Nenhuma oportunidade em aberto.</p>
                )}
              </div>
            </div>
          </div>

          {/* === COLUNA 2: FECHADOS === */}
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 px-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <h3 className="font-bold text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wide">
                  Contratos Fechados
                </h3>
              </div>
              <span className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-3 py-1 rounded-full">
                {contratosFechados.length}
              </span>
            </div>

            <div className="bg-gray-100/50 dark:bg-gray-800/30 rounded-2xl p-4 h-full border border-dashed border-gray-300 dark:border-gray-700 min-h-125">
              <div className="space-y-3">
                {contratosFechados.map((card) => (
                  <div 
                    key={card.id} 
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-700 dark:text-gray-200 text-sm line-clamp-1">{card.nome}</span>
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded border border-green-100 dark:border-green-800">
                        VENDIDO
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                       <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          {/* Mini Avatar no Fechado também fica legal */}
                          {card.usuario?.foto ? (
                             <img src={card.usuario.foto} className="w-5 h-5 rounded-full object-cover" alt="" />
                          ) : (
                             <UserIcon size={14} />
                          )}
                          <span className="truncate max-w-30">{card.usuario?.nome}</span>
                       </div>
                       <span className="font-bold text-gray-800 dark:text-gray-100">
                         {formatarMoeda(card.preco)}
                       </span>
                    </div>
                  </div>
                ))}

                {contratosFechados.length === 0 && (
                   <p className="text-center text-gray-400 text-sm mt-10">Nenhum contrato fechado ainda.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}