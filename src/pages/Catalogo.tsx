import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ShoppingCartIcon, 
  CheckCircleIcon, 
  SpinnerGapIcon, 
  WarningCircleIcon,
  TagIcon,
  CaretRightIcon
} from "@phosphor-icons/react";

import { AuthContext } from "../contexts/AuthContext";
import api from "../services/Service";
import Produto from "../models/Produto";

export default function Catalogo() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados de Filtro
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [listaCategorias, setListaCategorias] = useState<string[]>(["Todos"]);

  // --- LÓGICA DE NEGÓCIO (Mantida igual ao anterior, pois funciona) ---
  
  async function buscarProdutos() {
    try {
      const header = { headers: { Authorization: usuario.token } };
      const resposta = await api.get("/produtos/catalogo", header);
      
      const disponiveis = resposta.data.filter((p: Produto) => p.status === "DISPONIVEL");
      setProdutos(disponiveis);

      const categoriasUnicas = new Set(disponiveis.map((p: Produto) => p.categoria?.nome || "Geral"));
      setListaCategorias(["Todos", ...Array.from(categoriasUnicas) as string[]]);

    } catch (error: any) {
      console.error("Erro ao buscar catálogo:", error);
      const status = error.response?.status;
      if (status === 403 || status === 401) {
        alert("Sessão expirada.");
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
      navigate("/cliente/solicitacoes");
      
    } catch (error) {
      console.error(error);
      alert("Erro ao processar solicitação.");
    }
  }

  // Filtragem
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

  // --- RENDERIZAÇÃO (Adaptada para o Layout do Colega: Sidebar + Grid) ---

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4 bg-gray-50 dark:bg-gray-900">
         <SpinnerGapIcon size={48} className="animate-spin text-violet-600" />
         <p className="text-gray-500">Carregando catálogo...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 transition-colors duration-300">
      <div className="container mx-auto">
        
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
               <TagIcon size={32} className="text-violet-600" /> Catálogo
            </h1>
        </div>

        {/* LAYOUT GRID: Sidebar (280px) + Conteúdo (1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            
            {/* COLUNA DA ESQUERDA: FILTROS (Sidebar) */}
            <aside className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 h-fit sticky top-24">
                <div className="flex items-center gap-2 mb-6 text-gray-800 dark:text-gray-100 font-bold border-b border-gray-100 dark:border-gray-700 pb-4">
                    <FunnelIcon size={24} />
                    <h2>Filtros</h2>
                </div>

                {/* Busca */}
                <div className="mb-6">
                    <label className="text-sm font-semibold text-gray-500 mb-2 block">Buscar</label>
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Nome do produto..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                </div>

                {/* Lista Vertical de Categorias */}
                <div>
                    <label className="text-sm font-semibold text-gray-500 mb-3 block">Categorias</label>
                    <div className="flex flex-col gap-2">
                        {listaCategorias.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategoriaSelecionada(cat)}
                                className={`
                                    flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all
                                    ${categoriaSelecionada === cat 
                                        ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 font-bold' 
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}
                                `}
                            >
                                <span>{cat}</span>
                                {categoriaSelecionada === cat && <CaretRightIcon size={16} weight="bold"/>}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* COLUNA DA DIREITA: GRID DE PRODUTOS */}
            <main>
                {produtosFiltrados.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 border-dashed">
                        <WarningCircleIcon size={48} className="text-gray-400 mb-2" />
                        <p className="text-gray-500">Nenhum produto encontrado com esses filtros.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {produtosFiltrados.map((produto) => (
                            <div 
                                key={produto.id} 
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
                            >
                                {/* Imagem */}
                                <div className="h-40 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                           <ShoppingCartIcon size={32} opacity={0.3} />
                                        </div>
                                      <div className="absolute top-2 right-2 bg-violet-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                                        {produto.categoria?.nome || "Geral"}
                                      </div>
                                </div>

                                {/* Conteúdo do Card */}
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg mb-1 leading-tight">
                                        {produto.nome}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
                                        {produto.descricao}
                                    </p>
                                    
                                    <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                                        <p className="text-xs text-gray-400 uppercase">Investimento</p>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-xl font-bold text-violet-600">
                                                {formatarMoeda(produto.preco)}
                                            </span>
                                        </div>
                                        
                                        <button 
                                            onClick={() => handleAdquirir(produto)}
                                            className="w-full mt-3 bg-gray-900 dark:bg-gray-700 hover:bg-violet-600 dark:hover:bg-violet-600 text-white text-sm font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            <CheckCircleIcon size={18} weight="bold" />
                                            Tenho Interesse
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

        </div>
      </div>
    </div>
  );
}