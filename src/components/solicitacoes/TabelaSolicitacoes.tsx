import type { Solicitacao } from "@/models/Solicitacao";
import { StatusBadge } from "./StatusBadge";
import { formatarDataParaExibição } from "@/utils/dateFormatter"; // Import correto

interface Props {
  dados: Solicitacao[];
}

export function TabelaSolicitacoes({ dados }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4 font-semibold text-sm text-gray-700 uppercase tracking-wider">
              Cliente
            </th>
            <th className="text-left p-4 font-semibold text-sm text-gray-700 uppercase tracking-wider">
              Produto
            </th>
            <th className="text-left p-4 font-semibold text-sm text-gray-700 uppercase tracking-wider">
              Data
            </th>
            <th className="text-left p-4 font-semibold text-sm text-gray-700 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {dados.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 font-medium">{s.cliente}</td>
              <td className="p-4 text-gray-600">{s.produto}</td>
              <td className="p-4 text-gray-600">
                {/* AGORA usando a função importada */}
                {formatarDataParaExibição(s.dataCriacao)}
              </td>
              <td className="p-4">
                <StatusBadge status={s.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}