import { useEffect, useState } from "react";
import { categoriaService } from "@/services/categoriaService";
import type { Categoria } from "@/models/Categoria";
import { ToastAlerta } from "@/utils/ToastAlerta";
import { ListaCategorias } from "@/components/categorias/ListaCategorias";
import { FormularioCategoria } from "@/components/categorias/FormCategoria";
import { Plus, RotateCw } from "lucide-react";

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Categoria | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Carregar categorias
  const carregarCategorias = async () => {
    setLoading(true);
    try {
      const dados = await categoriaService.listar();
      setCategorias(dados);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      ToastAlerta("Erro ao carregar categorias", "erro");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  // Editar categoria
  const handleEditar = (categoria: Categoria) => {
    setEditando(categoria);
    setMostrarFormulario(true);
  };

  // Excluir categoria
  const handleExcluir = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      return;
    }

    try {
      await categoriaService.deletar(id);
      await carregarCategorias();
      ToastAlerta("Categoria excluída com sucesso!", "sucesso");
    } catch (error: any) {
      ToastAlerta(error.message || "Erro ao excluir categoria", "erro");
    }
  };

  // Salvar categoria
  const handleSalvar = async (dados: Omit<Categoria, 'id'>) => {
    try {
      if (editando) {
        await categoriaService.atualizar(editando.id, dados);
        ToastAlerta("Categoria atualizada com sucesso!", "sucesso");
      } else {
        await categoriaService.criar(dados);
        ToastAlerta("Categoria criada com sucesso!", "sucesso");
      }

      setMostrarFormulario(false);
      setEditando(null);
      await carregarCategorias();
    } catch (error: any) {
      ToastAlerta(error.message || "Erro ao salvar categoria", "erro");
    }
  };

  // Resetar categorias
  const handleResetar = async () => {
    if (!window.confirm("Isso restaurará as categorias para os dados iniciais. Deseja continuar?")) {
      return;
    }

    try {
      await categoriaService.resetar();
      await carregarCategorias();
      ToastAlerta("Categorias resetadas com sucesso!", "sucesso");
    } catch (error) {
      ToastAlerta("Erro ao resetar categorias", "erro");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando categorias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Lista de Categorias */}
        <div className={`${mostrarFormulario ? 'lg:w-2/3' : 'w-full'}`}>
          <div className="
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            text-gray-800 dark:text-gray-100
            rounded-2xl p-6 shadow-sm
          ">
            {/* Cabeçalho */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Categorias
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {categorias.length} categorias cadastradas
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleResetar}
                  className="
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300
                    hover:bg-gray-200 dark:hover:bg-gray-600
                    transition-colors duration-200
                  "
                  title="Restaurar dados iniciais"
                >
                  <RotateCw size={16} />
                  <span className="hidden sm:inline">Resetar</span>
                </button>
                
                <button
                  onClick={() => {
                    setEditando(null);
                    setMostrarFormulario(true);
                  }}
                  className="
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    bg-violet-600 text-white
                    hover:bg-violet-700 
                    transition-colors duration-200
                  "
                >
                  <Plus size={16} />
                  Nova Categoria
                </button>
              </div>
            </div>

            {/* Lista de Categorias */}
            <ListaCategorias
              categorias={categorias}
              onEditar={handleEditar}
              onExcluir={handleExcluir}
            />
          </div>
        </div>

        {/* Formulário (lado direito) */}
        {mostrarFormulario && (
          <div className="lg:w-1/3">
            <div className="
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              text-gray-800 dark:text-gray-100
              rounded-2xl p-6 shadow-sm sticky top-24
            ">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editando ? "Editar Categoria" : "Nova Categoria"}
                </h2>
                <button
                  onClick={() => {
                    setMostrarFormulario(false);
                    setEditando(null);
                  }}
                  className="
                    p-2 rounded-lg
                    text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    transition-colors
                  "
                  title="Fechar formulário"
                >
                  ✕
                </button>
              </div>

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
  );
}