import { useState } from "react";
import { solicitacoesMock } from "@/assets/mocks/solicitacoesMock";
import { FiltrosSolicitacoes } from "@/components/solicitacoes/FiltrosSolicitacoes";
import { TabelaSolicitacoes } from "@/components/solicitacoes/TabelaSolicitacoes";
import type { Status } from "@/models/Status";

export default function Solicitacoes() {
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState<Status | "Todos">("Todos");
  const [categoria, setCategoria] = useState("Todos");

  // Extrai categorias únicas dos mockados
  const categoriasUnicas = Array.from(
    new Set(solicitacoesMock.map((s) => s.categoria))
  );

  // Cria array com "Todos" + categorias
  const categorias = ["Todos", ...categoriasUnicas];

  const dadosFiltrados = solicitacoesMock.filter((s) => {
    // Verifica busca
    const matchBusca =
      busca === "" ||
      s.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      s.produto.toLowerCase().includes(busca.toLowerCase());

    // Comparação case-insensitive para status
    const matchStatus = 
      status === "Todos" || 
      s.status.toLowerCase() === status.toLowerCase();

    // Comparação case-insensitive para categoria
    const matchCategoria =
      categoria === "Todos" ||
      s.categoria.toLowerCase() === categoria.toLowerCase();

    return matchBusca && matchStatus && matchCategoria;
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Solicitações</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Filtros */}
        <aside className="
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            text-gray-800 dark:text-gray-100
            rounded-2xl p-6 shadow-sm
          ">
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

        {/* Tabela */}
        <div className="
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              text-gray-800 dark:text-gray-100
              rounded-2xl p-6 shadow-sm
            ">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Lista de Solicitações</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {dadosFiltrados.length} solicitação{dadosFiltrados.length !== 1 ? 'es' : ''} encontrada{dadosFiltrados.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {dadosFiltrados.length > 0 ? (
            <TabelaSolicitacoes dados={dadosFiltrados} />
          ) : (
            <div className="text-center py-12 text-gray-600 dark:text-gray-300">
              Nenhuma solicitação encontrada com os filtros atuais.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}