import { useState } from "react";
import { solicitacoesMock } from "@/assets/mocks/solicitacoesMock";
import { FiltrosSolicitacoes } from "@/components/solicitacoes/FiltrosSolicitacoes";
import { TabelaSolicitacoes } from "@/components/solicitacoes/TabelaSolicitacoes";

export default function Solicitacoes() {
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("Todos");
  const [categoria, setCategoria] = useState("Todos");

  const categorias = [
    "Todos",
    ...new Set(solicitacoesMock.map((s) => s.categoria)),
  ];

  const dadosFiltrados = solicitacoesMock.filter((s) => {
    const matchBusca =
      s.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      s.produto.toLowerCase().includes(busca.toLowerCase());

    const matchStatus = status === "Todos" || s.status === status;
    const matchCategoria =
      categoria === "Todos" || s.categoria === categoria;

    return matchBusca && matchStatus && matchCategoria;
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Solicitações</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Filtros - Estilizado igual ao Catálogo */}
        <aside className="bg-white rounded-2xl p-6 shadow-md h-fit">
          <h2 className="font-bold text-lg mb-6">Filtros</h2>
          <FiltrosSolicitacoes
            busca={busca}
            setBusca={setBusca}
            status={status}
            setStatus={setStatus}
            categorias={categorias}
            categoria={categoria}
            setCategoria={setCategoria}
          />
        </aside>

        {/* Tabela com estilização */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Lista de Solicitações</h2>
            <p className="text-sm text-gray-500">
              {dadosFiltrados.length} solicitações encontradas
            </p>
          </div>
          
          {dadosFiltrados.length > 0 ? (
            <TabelaSolicitacoes dados={dadosFiltrados} />
          ) : (
            <div className="text-center py-12 text-gray-500">
              Nenhuma solicitação encontrada com os filtros atuais.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}