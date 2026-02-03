import { useState, useEffect, useContext, FormEvent } from "react";
import { 
  PlusIcon, 
  ArrowsClockwiseIcon, 
  PencilSimpleIcon, 
  TrashIcon, 
  XIcon 
} from "@phosphor-icons/react";

import { AuthContext } from "@/contexts/AuthContext";
import api from "@/services/Service";

// 1. Definição da Model (baseada nos campos do seu formulário)
interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  cor: string;
  destaque: boolean;
}

// ============================================================================
// COMPONENTE: Lista de Categorias
// ============================================================================
interface ListaProps {
  categorias: Categoria[];
  onEditar: (categoria: Categoria) => void;
  onExcluir: (id: number) => void;
}

function ListaCategorias({ categorias, onEditar, onExcluir }: ListaProps) {
  if (categorias.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        Nenhuma categoria cadastrada. Clique em "Nova Categoria" para começar.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-800">
      <table className="w-full">
        <thead className="bg-slate-100 dark:bg-slate-900">
          <tr>
            <th className="text-left p-4 text-sm font-semibold uppercase text-slate-600 dark:text-slate-400">Cor</th>
            <th className="text-left p-4 text-sm font-semibold uppercase text-slate-600 dark:text-slate-400">Nome</th>
            <th className="text-left p-4 text-sm font-semibold uppercase text-slate-600 dark:text-slate-400">Descrição</th>
            <th className="text-left p-4 text-sm font-semibold uppercase text-slate-600 dark:text-slate-400">Destaque</th>
            <th className="text-left p-4 text-sm font-semibold uppercase text-slate-600 dark:text-slate-400">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {categorias.map((categoria) => (
            <tr
              key={categoria.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
            >
              <td className="p-4">
                <div
                  className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 shadow-sm"
                  style={{ backgroundColor: categoria.cor }}
                />
              </td>
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">{categoria.nome}</td>
              <td className="p-4 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                {categoria.descricao || "-"}
              </td>
              <td className="p-4">
                <span className={`
                  px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                  ${categoria.destaque 
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800" 
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700"}
                `}>
                  {categoria.destaque ? "Sim" : "Não"}
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditar(categoria)}
                    className="
                      p-2 rounded-lg
                      bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400
                      hover:bg-blue-100 dark:hover:bg-blue-900/40
                      transition-colors border border-blue-100 dark:border-blue-800
                    "
                    title="Editar"
                  >
                    <PencilSimpleIcon size={18} weight="bold" />
                  </button>
                  
                  <button
                    onClick={() => onExcluir(categoria.id)}
                    className="
                      p-2 rounded-lg
                      bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400
                      hover:bg-red-100 dark:hover:bg-red-900/40
                      transition-colors border border-red-100 dark:border-red-800
                    "
                    title="Excluir"
                  >
                    <TrashIcon size={18} weight="bold" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// COMPONENTE: Formulário de Categoria
// ============================================================================
interface FormProps {
  categoria?: Categoria | null;
  onSalvar: (dados: Omit<Categoria, 'id'>) => void;
  onCancelar: () => void;
}

function FormularioCategoria({ categoria, onSalvar, onCancelar }: FormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    cor: "#7C3AED",
    destaque: false
  });

  useEffect(() => {
    if (categoria) {
      setFormData({
        nome: categoria.nome,
        descricao: categoria.descricao || "",
        cor: categoria.cor,
        destaque: categoria.destaque || false
      });
    } else {
      setFormData({
        nome: "",
        descricao: "",
        cor: "#7C3AED",
        destaque: false
      });
    }
  }, [categoria]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSalvar(formData);
  };

  const coresDisponiveis = [
    "#7C3AED", // Violet
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Yellow/Orange
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#06B6D4", // Cyan
    "#EC4899", // Pink
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nome */}
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Nome da Categoria *
        </label>
        <input
          type="text"
          required
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          className="
            w-full p-3 rounded-xl
            bg-slate-50 dark:bg-slate-900
            text-slate-900 dark:text-white
            border border-slate-200 dark:border-slate-700
            focus:outline-none focus:ring-2 focus:ring-violet-500
            placeholder:text-slate-400
            text-sm transition-all
          "
          placeholder="Ex: Seguro de Vida, Automóvel..."
        />
      </div>

      {/* Descrição */}
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Descrição
        </label>
        <textarea
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          className="
            w-full p-3 rounded-xl
            bg-slate-50 dark:bg-slate-900
            text-slate-900 dark:text-white
            border border-slate-200 dark:border-slate-700
            focus:outline-none focus:ring-2 focus:ring-violet-500
            placeholder:text-slate-400
            text-sm min-h-25 transition-all
          "
          placeholder="Breve descrição da categoria..."
          rows={3}
        />
      </div>

      {/* Cor */}
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Cor de Identificação
        </label>
        
        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-12 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 shadow-sm"
            style={{ backgroundColor: formData.cor }}
          />
          <input
            type="color"
            value={formData.cor}
            onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
            className="h-10 w-20 cursor-pointer bg-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {coresDisponiveis.map((cor) => (
            <button
              key={cor}
              type="button"
              onClick={() => setFormData({ ...formData, cor })}
              className={`
                w-8 h-8 rounded-full border-2 transition-all hover:scale-110
                ${formData.cor === cor ? "border-slate-900 dark:border-white scale-110 shadow-md" : "border-transparent"}
              `}
              style={{ backgroundColor: cor }}
              title={cor}
            />
          ))}
        </div>
      </div>

      {/* Destaque */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.destaque}
            onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
            className="w-5 h-5 text-violet-600 rounded focus:ring-violet-500 accent-violet-600"
          />
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Marcar como destaque</span>
        </label>
        <p className="text-xs text-slate-500 mt-1 pl-8">
          Categorias em destaque aparecem primeiro no catálogo.
        </p>
      </div>

      {/* Ações */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancelar}
          className="
            flex-1 py-3 rounded-xl text-sm font-bold
            bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300
            hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors
          "
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="
            flex-1 py-3 rounded-xl text-sm font-bold
            bg-violet-600 text-white
            hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/20
          "
        >
          {categoria ? "Salvar Alterações" : "Criar Categoria"}
        </button>
      </div>
    </form>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL (PÁGINA)
// ============================================================================
export default function Categorias() {
  const { usuario } = useContext(AuthContext);
  
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Categoria | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // --- 1. CARREGAR (GET) ---
  const carregarCategorias = async () => {
    setLoading(true);
    try {
      const header = { headers: { Authorization: usuario.token } };
      const resposta = await api.get("/categoria", header);
      setCategorias(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      alert("Erro ao buscar categorias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (usuario.token) carregarCategorias();
  }, [usuario.token]);

  // --- 2. SALVAR (POST / PUT) ---
  const handleSalvar = async (dados: Omit<Categoria, 'id'>) => {
    try {
      const header = { headers: { Authorization: usuario.token } };

      if (editando) {
        // Atualizar
        await api.put('/categoria', { id: editando.id, ...dados }, header);
        alert("Categoria atualizada com sucesso!");
      } else {
        // Criar
        await api.post('/categoria', dados, header);
        alert("Categoria criada com sucesso!");
      }

      setMostrarFormulario(false);
      setEditando(null);
      carregarCategorias(); // Recarrega lista
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar categoria.");
    }
  };

  // --- 3. EXCLUIR (DELETE) ---
  const handleExcluir = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;

    try {
      const header = { headers: { Authorization: usuario.token } };
      await api.delete(`/categoria/${id}`, header);
      alert("Categoria excluída.");
      carregarCategorias();
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 500) {
        alert("Não é possível excluir uma categoria que possui produtos.");
      } else {
        alert("Erro ao excluir categoria.");
      }
    }
  };

  const handleRefresh = () => {
    carregarCategorias();
  };

  // --- RENDERIZAÇÃO ---

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4 bg-gray-50 dark:bg-gray-900">
         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600"></div>
         <p className="text-gray-500 font-medium">Carregando categorias...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 pt-24 font-sans transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        
        {/* LAYOUT RESPONSIVO: LISTA E FORMULÁRIO */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LADO ESQUERDO: LISTA */}
          <div className={`${mostrarFormulario ? 'lg:w-2/3' : 'w-full'} transition-all duration-500 ease-in-out`}>
            <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
              
              {/* Header da Lista */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white font-heading">
                    Categorias
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Gerencie os tipos de seguros disponíveis.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <ArrowsClockwiseIcon size={18} weight="bold" />
                    <span className="hidden sm:inline">Atualizar</span>
                  </button>
                  
                  {!mostrarFormulario && (
                    <button
                      onClick={() => {
                        setEditando(null);
                        setMostrarFormulario(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/20"
                    >
                      <PlusIcon size={18} weight="bold" />
                      Nova Categoria
                    </button>
                  )}
                </div>
              </div>

              {/* Tabela Componentizada */}
              <ListaCategorias
                categorias={categorias}
                onEditar={(cat) => {
                  setEditando(cat);
                  setMostrarFormulario(true);
                }}
                onExcluir={handleExcluir}
              />
            </div>
          </div>

          {/* LADO DIREITO: FORMULÁRIO (Slide In) */}
          {mostrarFormulario && (
            <div className="w-full lg:w-1/3 animate-fade-in-right">
              <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl sticky top-24">
                
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    {editando ? <PencilSimpleIcon className="text-blue-500"/> : <PlusIcon className="text-violet-500"/>}
                    {editando ? "Editar Categoria" : "Nova Categoria"}
                  </h2>
                  <button
                    onClick={() => {
                      setMostrarFormulario(false);
                      setEditando(null);
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <XIcon size={20} weight="bold" />
                  </button>
                </div>

                {/* Formulário Componentizado */}
                <FormularioCategoria
                  categoria={editando}
                  onSalvar={handleSalvar}
                  onCancelar={() => {
                    setMostrarFormulario(false);
                    setEditando(null);
                  }}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}