import { criarSolicitacao } from "@/services/solicitacaoService";
import type { ItemCatalogo } from "@/models/ItemCatalogo";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/solicitacoes/StatusBadge";

type Props = {
  item: ItemCatalogo;
};

export function CatalogoCard({ item }: Props) {
  function solicitar() {
    criarSolicitacao({
  id: Date.now(),
  cliente: "Cliente Exemplo",
  produto: item.produto,
  categoria: item.categoria,
  status: "PENDENTE",
  dataCriacao: new Date().toISOString(),
});



    alert("Solicitação criada com sucesso!");
  }

  return (
    <div className="border rounded-2xl p-6 bg-white shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{item.produto}</h3>
        <StatusBadge status="PENDENTE" />
      </div>

      <p className="text-sm text-gray-600">{item.descricao}</p>

      <Button onClick={solicitar} className="mt-auto">
        Solicitar
      </Button>
    </div>
  );
}
