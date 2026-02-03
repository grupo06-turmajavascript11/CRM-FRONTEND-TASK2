import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ShoppingCartIcon, 
  CheckCircleIcon, 
  SpinnerGapIcon, 
  WarningCircleIcon,
  TagIcon
} from "@phosphor-icons/react";

import { AuthContext } from "../contexts/AuthContext";
import api from "../services/Service";
import Produto from "../models/Produto";

export default function Catalogo() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filtros
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [listaCategorias, setListaCategorias] = useState<string[]>(["Todos"]);

  // Carregar Produtos
  async function buscarProdutos() {
    try {
      const header = { headers: { Authorization: usuario.token } };
      const resposta = await api.get("/produtos/catalogo", header);
      
      // Filtra apenas os disponíveis
      const disponiveis = resposta.data.filter((p: Produto) => p.status === "DISPONIVEL");
      setProdutos(disponiveis);

      const categoriasUnicas = new Set(disponiveis.map((p: Produto) => p.categoria?.nome || "Geral"));
      setListaCategorias(["Todos", ...Array.from(categoriasUnicas) as string[]]);

    } catch (error: any) {
      console.error("Erro ao buscar catálogo:", error);
      const status = error.response?.status;
      if (status === 403 || status === 401) {
        alert("Sessão expirada ou sem permissão.");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (usuario.token) {
      buscarProdutos();
    }
  }, [usuario.token]);

  // Lógica de Compra / Interesse
  async function handleAdquirir(produtoOriginal: Produto) {
    if (!confirm(`Deseja demonstrar interesse em "${produtoOriginal.nome}"?`)) return;

    try {
      const header = { headers: { Authorization: usuario.token } };
      
      const body = {
        produtoId: produtoOriginal.id,
        usuarioId: usuario.id
      };

      await api.post("/produtos/adquirir", body, header);
      
      alert("Sucesso! O item foi adicionado às suas solicitações.");
      navigate("/solicitacoes");
      
    } catch (error) {
      console.error(error);
      alert("Erro ao processar solicitação. Tente novamente.");
    }
  }

  // Filtragem no Front-end
  const produtosFiltrados = produtos.filter((produto) => {
    const matchNome = produto.nome.toLowerCase().includes(busca.toLowerCase()) || 
                      produto.descricao.toLowerCase().includes(busca.toLowerCase());
    
    const matchCategoria = categoriaSelecionada === "Todos" || 
                           produto.categoria?.nome === categoriaSelecionada;

    return matchNome && matchCategoria;
  });

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-20 px-4 sm:px-6 transition-colors duration-300">
      <div className="container mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
              <TagIcon size={32} className="text-violet-600" />
              Catálogo de Seguros
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Escolha a melhor proteção para você ou sua empresa.
            </p>
          </div>
        </div>

        {/* Barra de Filtros */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nome ou descrição..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <FunnelIcon size={20} className="text-gray-500 dark:text-gray-400 mr-2 shrink-0" />
            {listaCategorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaSelecionada(cat)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border
                  ${categoriaSelecionada === cat 
                    ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-500/20' 
                    : 'bg-transparent text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
             <SpinnerGapIcon size={48} className="animate-spin text-violet-600" />
             <p className="text-gray-500">Carregando oportunidades...</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && (
          <>
            {produtosFiltrados.length === 0 ? (
              <div className="text-center py-20 opacity-70">
                <WarningCircleIcon size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-600 dark:text-gray-300">Nenhum produto encontrado.</h3>
                <p className="text-gray-500">Tente mudar os filtros de busca.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {produtosFiltrados.map((produto) => (
                  <div 
                    key={produto.id} 
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col transition-all duration-300 group"
                  >
                    
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden shrink-0">
                        <div className="flex items-center justify-center h-full text-gray-400">
                           <ShoppingCartIcon size={48} opacity={0.3} />
                        </div>
                      <div className="absolute top-3 right-3 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {produto.categoria?.nome || "Geral"}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {produto.nome}
                      </h3>
                      
                      {/* AQUI ESTÁ A ALTERAÇÃO: Removi 'line-clamp-3' */}
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">
                        {produto.descricao}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold">Investimento</p>
                          <span className="text-2xl font-bold text-violet-600">
                            {formatarMoeda(produto.preco)}
                          </span>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleAdquirir(produto)}
                        className="w-full mt-4 bg-gray-900 dark:bg-gray-700 hover:bg-violet-600 dark:hover:bg-violet-600 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-violet-500/20"
                      >
                        <CheckCircleIcon size={20} weight="bold" />
                        Tenho Interesse
                      </button>
                    </div>
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