import { useEffect, useState } from "react";
import { catalogoService } from "@/services/catalogoService";
import type { ItemCatalogo } from "@/models/ItemCatalogo";
import { CatalogoCard } from "@/components/catalogo/CatalogoCard";
import { FiltrosCatalogo } from "@/components/catalogo/FiltrosCatalogo";

export default function Catalogo() {
  const [itens, setItens] = useState<ItemCatalogo[]>([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    catalogoService.listar().then((dados) => {
      setItens(dados);
      setLoading(false);
    });
  }, []);

  const categorias = ["Todos", ...new Set(itens.map((i) => i.categoria))];

  const itensFiltrados = itens.filter((i) => {
  const matchNome = i.produto.toLowerCase().includes(busca.toLowerCase());
  const matchCategoria =
    categoria === "Todos" || i.categoria === categoria;
  return matchNome && matchCategoria;
});

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <p className="text-center text-muted-foreground">Carregando catálogo...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <FiltrosCatalogo
          busca={busca}
          setBusca={setBusca}
          categoria={categoria}
          setCategoria={setCategoria}
          categorias={categorias}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {itensFiltrados.map((item) => (
            <CatalogoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
