import { criarSolicitacao } from "@/services/solicitacaoService";
import type { ItemCatalogo } from "@/models/ItemCatalogo";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/solicitacoes/StatusBadge";
import { ToastAlerta } from "../../utils/ToastAlerta";

type Props = {
  item: ItemCatalogo;
};

export function CatalogoCard({ item }: Props) {
  function solicitar() {
    criarSolicitacao({
      cliente: "Cliente Exemplo",
      email: "cliente@email.com",
      telefone: "(00) 90000-0000",
      produto: item.produto,
      categoria: item.categoria,
      status: "PENDENTE",
      dataCriacao: new Date().toISOString(),
    });

    ToastAlerta("Solicitação criada com sucesso!", "sucesso");
  }

  return (
    <div className="
          border rounded-xl
          p-4 shadow-sm
          flex flex-col gap-3
          bg-white dark:bg-gray-800
          border-gray-200 dark:border-gray-700
          text-gray-800 dark:text-gray-100
          transition-colors duration-300
          hover:shadow-md
        "
      >

      
      {/* TOPO */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold break-words">{item.produto}</h3>

          {/* TAG DE CATEGORIA */}
          <span className="w-fit max-w-full
                          px-3 py-1 rounded-full text-xs font-semibold
                          bg-violet-100 text-violet-700
                          dark:bg-violet-900/40 dark:text-violet-300
                          break-words
                        ">
            {item.categoria}
          </span>
        </div>

        {/* STATUS */}
        <StatusBadge status={item.status} />
      </div>

      <p className="text-sm leading-snug text-gray-600 dark:text-gray-300 break-words">{item.descricao}</p>

      <Button onClick={solicitar} className="mt-auto bg-violet-600 hover:bg-violet-700 text-white transition-colors">
        Solicitar
      </Button>
    </div>
  );
}