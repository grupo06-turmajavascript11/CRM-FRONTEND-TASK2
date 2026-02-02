import type { Status } from "../../models/Status"; 

interface Props {
  status: Status;
}

export function StatusBadge({ status }: Props) {
  const cores: Record<Status, string> = {
    DISPONÍVEL: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    PENDENTE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    "EM ANDAMENTO": "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
    FINALIZADO: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    CANCELADO: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cores[status]}`}>
      {status}
    </span>
  );
}
