interface Props {
  busca: string;
  setBusca: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
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
  return (
    <div className="space-y-6">
      {/* Campo de Pesquisa */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground block mb-2">
          PESQUISAR
        </label>
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar cliente ou item"
          className="w-full border rounded-lg p-3 text-sm"
        />
      </div>

      {/* Filtro de Status */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground block mb-2">
          STATUS
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded-lg p-3 text-sm bg-white"
        >
          <option value="Todos">Todos os status</option>
          <option value="DISPONÍVEL">Disponível</option>
          <option value="EM ANDAMENTO">Em andamento</option>
          <option value="FINALIZADO">Finalizado</option>
          <option value="CANCELADO">Cancelado</option>
        </select>
      </div>

      {/* Filtro de Categoria */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground block mb-2">
          CATEGORIAS
        </label>
        <div className="space-y-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                categoria === cat
                  ? "bg-green-700 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}