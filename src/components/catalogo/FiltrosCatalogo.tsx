interface Props {
  busca: string;
  setBusca: (v: string) => void;
  categoria: string;
  setCategoria: (v: string) => void;
  categorias: string[];
}

export function FiltrosCatalogo({
  busca,
  setBusca,
  categoria,
  setCategoria,
  categorias,
}: Props) {
  return (
    <aside className="bg-white rounded-2xl p-6 shadow-md h-fit">
      <h2 className="font-bold text-lg mb-6">Filtros</h2>

      <div className="mb-6">
        <label className="text-xs font-semibold text-muted-foreground">
          PESQUISAR
        </label>
        <input
          className="mt-2 w-full border rounded-lg p-3"
          placeholder="Buscar..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-muted-foreground">
          CATEGORIAS
        </label>

        <div className="mt-3 space-y-2">
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => setCategoria(c)}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                categoria === c
                  ? "bg-green-700 text-white"
                  : "hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
