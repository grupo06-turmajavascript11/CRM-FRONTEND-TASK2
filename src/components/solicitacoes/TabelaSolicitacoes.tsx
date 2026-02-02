import type { Solicitacao } from "@/models/Solicitacao";
import type { Status } from "@/models/Status";
import { StatusBadge } from "./StatusBadge";
import { formatarDataParaExibição } from "@/utils/dateFormatter";
import { atualizarSolicitacao } from "@/services/solicitacaoService";
import { ToastAlerta } from "@/utils/ToastAlerta";


interface Props {
  dados: Solicitacao[];
}

export function TabelaSolicitacoes({ dados }: Props) {

  function proximoStatus(status: Status): Status {
    if (status === "PENDENTE") return "EM ANDAMENTO";
    if (status === "EM ANDAMENTO") return "FINALIZADO";
    return "PENDENTE";
  }

  async function alterarStatus(solicitacao: Solicitacao) {
    try {
      const novoStatus = proximoStatus(solicitacao.status);

      await atualizarSolicitacao({
        ...solicitacao,
        status: novoStatus,
      });

      ToastAlerta("Status alterado com sucesso!", "sucesso");

      // Mock em memória → reload aceitável
      setTimeout(() => {
        window.location.reload();
      }, 800);

    } catch (error) {
      ToastAlerta("Erro ao alterar o status da solicitação", "erro");
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="
          w-full
          border border-[#9CA3AF] dark:border-[#64748B]
        ">
        <thead className="bg-slate-100 dark:bg-slate-900">
          <tr>
            <th className="text-left p-4 text-sm font-semibold uppercase">Cliente</th>
            <th className="text-left p-4 text-sm font-semibold uppercase">Email</th>
            <th className="text-left p-4 text-sm font-semibold uppercase">Telefone</th>
            <th className="text-left p-4 text-sm font-semibold uppercase">Produto</th>
            <th className="text-left p-4 text-sm font-semibold uppercase">Categoria</th>
            <th className="text-left p-4 text-sm font-semibold uppercase">Data</th>
            <th className="text-left p-4 text-sm font-semibold uppercase">Status</th>
            <th className="text-left p-4 text-sm font-semibold uppercase">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {dados.map((s) => (
            <tr
              key={s.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-900/40"
            >
              <td className="p-4 font-medium">{s.cliente}</td>
              <td className="p-4">{s.email}</td>
              <td className="p-4">{s.telefone}</td>
              <td className="p-4 text-slate-600 dark:text-slate-400">{s.produto}</td>
              <td className="p-4 text-slate-600 dark:text-slate-400">{s.categoria}</td>
              <td className="p-4 text-slate-600 dark:text-slate-400">{formatarDataParaExibição(s.dataCriacao)}</td>
              <td className="p-4">
                <StatusBadge status={s.status} />
              </td>
              <td className="p-4">
                <button
                  onClick={() => alterarStatus(s)}
                  className="
                    px-4 py-2 rounded-lg text-sm font-medium
                    bg-violet-600 text-white
                    hover:bg-violet-700 transition-colors
                  "
                >
                  Alterar status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
