import { useState, useEffect, useContext, FormEvent } from "react";
import { 
  PlusIcon, 
  ArrowsClockwiseIcon, 
  PencilSimpleIcon, 
  TrashIcon, 
  XIcon,
  TagIcon 
} from "@phosphor-icons/react";

import { AuthContext } from "@/contexts/AuthContext";
import api from "@/services/Service";

// 1. Definição da Model (Simplificada)
interface Categoria {
  id: number;
  nome: string; // Único campo persistido além do ID
}

// ============================================================================
// COMPONENTE: Lista de Categorias (Simplificada)
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
            <th className="text-left p-4 text-sm font-semibold uppercase text-slate-600 dark:text-slate-400 w-20">ID</th>
            <th className="text-left p-4 text-sm font-semibold uppercase text-slate-600 dark:text-slate-400">Nome da Categoria</th>
            <th className="text-right p-4 text-sm font-semibold uppercase text-slate-600 dark:text-slate-400 w-32">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {categorias.map((categoria) => (
            <tr
              key={categoria.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
            >
              <td className="p-4 text-sm text-slate-500 font-mono">
                #{categoria.id}
              </td>
              
              <td className="p-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg text-violet-600 dark:text-violet-400">
                      <TagIcon size={20} weight="fill" />
                   </div>
                   <span className="font-bold text-slate-900 dark:text-white text-base">
                     {categoria.nome || "Sem Nome"}
                   </span>
                </div>
              </td>

              <td className="p-4">
                <div className="flex gap-2 justify-end">
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
// COMPONENTE: Formulário de Categoria (Simplificado)
// ============================================================================
interface FormProps {
  categoria?: Categoria | null;
  onSalvar: (dados: { nome: string }) => void;
  onCancelar: () => void;
}

function FormularioCategoria({ categoria, onSalvar, onCancelar }: FormProps) {
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (categoria) {
      setNome(categoria.nome);
    } else {
      setNome("");
    }
  }, [categoria]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return alert("O nome é obrigatório.");
    onSalvar({ nome });
  };

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
          autoFocus
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="
            w-full p-3 rounded-xl
            bg-slate-50 dark:bg-slate-900
            text-slate-900 dark:text-white
            border border-slate-200 dark:border-slate-700
            focus:outline-none focus:ring-2 focus:ring-violet-500
            placeholder:text-slate-400
            text-sm transition-all
          "
          placeholder="Ex: Consultoria, Mentoria, Software..."
        />
        <p className="text-xs text-slate-400 mt-2">
          Este nome será exibido nos filtros e nos cards dos produtos.
        </p>
      </div>

      {/* Ações */}
      <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
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
      // Ajuste se sua rota for /temas ou /categorias no backend
      const resposta = await api.get("/categoria", header); 
      setCategorias(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      // alert("Erro ao buscar categorias."); // Comentado para não spammar se a tela abrir sem dados
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (usuario.token) carregarCategorias();
  }, [usuario.token]);

  // --- 2. SALVAR (POST / PUT) ---
  const handleSalvar = async (dados: { nome: string }) => {
    try {
      const header = { headers: { Authorization: usuario.token } };
      
      const payload = { nome: dados.nome };

      if (editando) {
        // Atualizar
        await api.put('/categoria', { id: editando.id, ...payload }, header);
        alert("Categoria atualizada com sucesso!");
      } else {
        // Criar
        await api.post('/categoria', payload, header);
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
        alert("Não é possível excluir uma categoria que possui produtos vinculados.");
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