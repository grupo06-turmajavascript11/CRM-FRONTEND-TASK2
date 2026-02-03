import { useState, useEffect, useContext, FormEvent } from "react";
import { 
  PencilSimpleIcon, 
  TrashIcon, 
  PlusIcon, 
  XIcon, 
  TagIcon,
  StorefrontIcon,
  CurrencyDollarIcon
} from "@phosphor-icons/react";

import { AuthContext } from "@/contexts/AuthContext";
import api from "@/services/Service";
import Produto from "@/models/Produto";
import Categoria from "@/models/Categoria";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  produto?: Produto | null;
  categorias: Categoria[];
  onSalvar: (dados: any) => void;
}

function ModalProduto({ isOpen, onClose, produto, categorias, onSalvar }: ModalProps) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: 0,
    categoriaId: 0
  });

  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        categoriaId: produto.categoria?.id || 0
      });
    } else {
      setFormData({
        nome: "",
        descricao: "",
        preco: 0,
        categoriaId: 0
      });
    }
  }, [produto, isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSalvar(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh]">
        
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            {produto ? <PencilSimpleIcon className="text-blue-500"/> : <PlusIcon className="text-violet-500"/>}
            {produto ? "Editar Solução" : "Nova Solução"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
            <XIcon size={24} weight="bold" />
          </button>
        </div>

        {/* Corpo com Scroll se necessário */}
        <div className="p-6 overflow-y-auto">
          <form id="formProduto" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Nome</label>
              <input
                type="text"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-500 outline-none text-sm text-slate-900 dark:text-white"
                placeholder="Ex: Consultoria Premium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Categoria</label>
              <div className="relative">
                <select
                  required
                  value={formData.categoriaId}
                  onChange={(e) => setFormData({ ...formData, categoriaId: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-500 outline-none text-sm appearance-none text-slate-900 dark:text-white cursor-pointer"
                >
                  <option value={0} disabled>Selecione uma categoria</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <TagIcon size={16} />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Valor (R$)</label>
              <div className="relative">
                <input
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  value={formData.preco}
                  onChange={(e) => setFormData({ ...formData, preco: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-500 outline-none text-sm text-slate-900 dark:text-white"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <CurrencyDollarIcon size={20} />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Descrição</label>
              <textarea
                required
                rows={4}
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-500 outline-none text-sm text-slate-900 dark:text-white resize-none"
                placeholder="Descreva os benefícios..."
              />
            </div>
          </form>
        </div>

        {/* Footer do Modal */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-700 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="formProduto"
            className="flex-1 py-3 rounded-xl text-sm font-bold bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/20"
          >
            {produto ? "Salvar Alterações" : "Criar Produto"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Produtos() {
  const { usuario } = useContext(AuthContext);
  
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoEdicao, setProdutoEdicao] = useState<Produto | null>(null);

  // 1. Carregar Dados
  async function carregarDados() {
    setLoading(true);
    try {
      const header = { headers: { Authorization: usuario.token } };
      
      const [resProdutos, resCategorias] = await Promise.all([
        api.get("/produtos", header),
        api.get("/categoria", header)
      ]);

      const disponiveis = resProdutos.data.filter((p: Produto) => p.status === "DISPONIVEL");
      setProdutos(disponiveis);
      setCategorias(resCategorias.data);

    } catch (error) {
      console.error("Erro ao carregar:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (usuario.token) carregarDados();
  }, [usuario.token]);

  // 2. Salvar
  async function handleSalvar(dadosForm: any) {
    try {
      const header = { headers: { Authorization: usuario.token } };

      const payload = {
        id: produtoEdicao?.id, 
        ...dadosForm,
        preco: Number(dadosForm.preco),
        status: "DISPONIVEL", 
        usuario: { id: usuario.id },
        categoria: { id: Number(dadosForm.categoriaId) }
      };

      if (produtoEdicao) {
        await api.put('/produtos', payload, header);
        alert("Atualizado com sucesso!");
      } else {
        await api.post('/produtos', payload, header);
        alert("Criado com sucesso!");
      }

      setModalOpen(false);
      setProdutoEdicao(null);
      carregarDados();

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar produto.");
    }
  }

  // 3. Excluir
  async function handleExcluir(id: number) {
    if (!confirm("Remover este produto do catálogo?")) return;
    try {
      const header = { headers: { Authorization: usuario.token } };
      await api.delete(`/produtos/${id}`, header);
      alert("Produto removido.");
      carregarDados();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir.");
    }
  }

  // 4. Abrir Modal
  function handleNovo() {
    setProdutoEdicao(null);
    setModalOpen(true);
  }

  function handleEditar(produto: Produto) {
    setProdutoEdicao(produto);
    setModalOpen(true);
  }

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-20 pt-24">
      
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Cabeçalho da Página */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-slate-200 dark:border-slate-700 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white font-heading mb-2">
              Gerenciar <span className="text-violet-600">Produtos</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Catálogo de produtos ativos para venda.
            </p>
          </div>

          <button 
            onClick={handleNovo}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-violet-500/30 flex items-center gap-2 font-bold transition-all hover:-translate-y-1 active:scale-95"
          >
            <PlusIcon size={20} weight="bold" />
            Novo Produto
          </button>
        </div>

        {/* Loading State */}
        {loading && (
           <div className="flex flex-col justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600 mb-4"></div>
              <p className="text-slate-500">Carregando catálogo...</p>
           </div>
        )}

        {/* Empty State */}
        {!loading && produtos.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
             <StorefrontIcon size={48} className="mx-auto text-slate-300 mb-4" />
             <h3 className="text-lg font-bold text-slate-600 dark:text-slate-300">Nenhuma solução cadastrada.</h3>
             <p className="text-slate-500">Comece adicionando o primeiro item ao catálogo.</p>
          </div>
        )}

        {/* Grid de Cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.map((item) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-violet-500 dark:hover:border-violet-500 transition-all duration-300 group flex flex-col"
              >
                
                {/* Topo do Card */}
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-slate-100 dark:bg-slate-700 text-violet-700 dark:text-violet-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <TagIcon size={12} weight="fill"/>
                    {item.categoria?.nome || "Geral"}
                  </span>
                  
                  {/* Badge de Status */}
                  <div className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded border border-green-100 dark:border-green-800 font-bold uppercase">
                    Disponível
                  </div>
                </div>

                {/* Conteúdo */}
                <h3 className="text-xl font-bold mb-3 font-heading text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors">
                  {item.nome}
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {item.descricao}
                </p>

                {/* Rodapé: Preço e Botões */}
                <div className="pt-5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between mt-auto">
                   <div>
                      <span className="text-xs text-slate-400 block uppercase font-bold">Valor</span>
                      <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                        {formatarMoeda(item.preco)}
                      </span>
                   </div>

                   <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditar(item)}
                        className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 rounded-xl transition-colors border border-blue-100 dark:border-blue-800"
                        title="Editar"
                      >
                        <PencilSimpleIcon size={20} weight="bold" />
                      </button>
                      <button 
                        onClick={() => handleExcluir(item.id)}
                        className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 rounded-xl transition-colors border border-red-100 dark:border-red-800"
                        title="Excluir"
                      >
                        <TrashIcon size={20} weight="bold" />
                      </button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* MODAL (Portal Overlay) */}
      <ModalProduto 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        produto={produtoEdicao}
        categorias={categorias}
        onSalvar={handleSalvar}
      />

    </div>
  );
}