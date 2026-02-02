// components/categorias/ListaCategorias.tsx
import type { Categoria } from "@/models/Categoria";
import { Pencil, Trash } from "@phosphor-icons/react";

interface Props {
  categorias: Categoria[];
  onEditar: (categoria: Categoria) => void;
  onExcluir: (id: number) => void;
}

export function ListaCategorias({ categorias, onEditar, onExcluir }: Props) {
  if (categorias.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhuma categoria cadastrada. Clique em "Nova Categoria" para começar.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="w-full">
        <thead className="bg-slate-100 dark:bg-slate-900">
          <tr>
            <th className="text-left p-4 text-sm font-semibold uppercase">Cor</th>
            <th className="text-left p-4 text-sm font-semibold uppercase">Nome</th>
            <th className="text-left p-4 text-sm font-semibold uppercase">Descrição</th>
            <th className="text-left p-4 text-sm font-semibold uppercase">Destaque</th>
            <th className="text-left p-4 text-sm font-semibold uppercase">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {categorias.map((categoria) => (
            <tr
              key={categoria.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-900/40"
            >
              <td className="p-4">
                <div
                  className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700"
                  style={{ backgroundColor: categoria.cor }}
                />
              </td>
              <td className="p-4 font-medium">{categoria.nome}</td>
              <td className="p-4 text-slate-600 dark:text-slate-400">
                {categoria.descricao || "-"}
              </td>
              <td className="p-4">
                <span className={`
                  px-3 py-1 rounded-full text-xs font-semibold
                  ${categoria.destaque 
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                    : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"}
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
                      bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300
                      hover:bg-blue-200 dark:hover:bg-blue-800/40
                      transition-colors
                    "
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>
                  
                  <button
                    onClick={() => onExcluir(categoria.id)}
                    className="
                      p-2 rounded-lg
                      bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300
                      hover:bg-red-200 dark:hover:bg-red-800/40
                      transition-colors
                    "
                    title="Excluir"
                  >
                    <Trash size={16} />
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