import type { Status } from "@/models/Status";

interface Props {
  busca: string;
  setBusca: (v: string) => void;
  status: Status | "Todos";
  setStatus: (v: Status | "Todos") => void;
  categorias: string[];
  categoria: string;
  setCategoria: (v: string) => void;
}

export function FiltrosSolicitacoes({
  busca,
  setBusca,
  status,
  setStatus,
  categorias,
  categoria,
  setCategoria,
}: Props) {
  // Opções de status disponíveis (todas em maiúsculo para consistência)
  const opcoesStatus: (Status | "Todos")[] = [
    "Todos",
    "PENDENTE",
    "EM ANDAMENTO",
    "FINALIZADO",
    "CANCELADO",
    "DISPONÍVEL"
  ];

  return (
    <div className="space-y-6">
      {/* Campo de Pesquisa */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          PESQUISAR
        </label>
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar cliente ou produto"
          className="
            w-full p-3 rounded-lg text-sm
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            border border-gray-300 dark:border-gray-600
            placeholder:text-gray-500 dark:placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-violet-500
            transition-colors
          "
        />
      </div>

      {/* Filtro de Status */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          STATUS
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status | "Todos")}
          className="
            w-full p-3 rounded-lg text-sm
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            border border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-violet-500
            transition-colors
          "
        >
          {opcoesStatus.map((statusOption) => (
            <option 
              key={statusOption} 
              value={statusOption}
              className="bg-white dark:bg-gray-800"
            >
              {statusOption === "Todos" ? "Todos os status" : statusOption}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro de Categoria */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          CATEGORIAS
        </label>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoria(cat)}
              className={`
                w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors
                ${categoria === cat
                  ? "bg-violet-600 text-white"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }
              `}
            >
              {cat === "Todos" ? "Todas as categorias" : cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}