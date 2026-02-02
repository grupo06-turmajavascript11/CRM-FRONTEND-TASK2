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
    <aside className="
        bg-[#FFFFFF] dark:bg-[#0F172A]
        border border-[#9CA3AF] dark:border-[#64748B]
        text-[#0F172A] dark:text-[#F8FAFC]
        rounded-2xl p-6
      ">
      <h2 className="font-bold text-lg mb-6">Filtros</h2>

      <div className="mb-6">
        <label className="text-xs font-semibold text-muted-foreground">
          PESQUISAR
        </label>
        <input
          className="
                w-full p-3 rounded-lg
                bg-[#F8FAFC] dark:bg-[#0F172A]
                text-[#0F172A] dark:text-[#F8FAFC]
                border border-[#9CA3AF] dark:border-[#64748B]
                placeholder:text-[#64748B] dark:placeholder:text-[#9CA3AF]
              " 
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
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          categoria === c
                          ? "bg-violet-600 text-white"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800"
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
