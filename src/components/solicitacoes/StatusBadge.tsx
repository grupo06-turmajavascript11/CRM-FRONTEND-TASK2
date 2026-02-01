import type { Status } from "../../models/Status"; 

interface Props {
  status: Status;
}

export function StatusBadge({ status }: Props) {
  const cores: Record<Status, string> = {
    DISPONÍVEL: "bg-green-100 text-green-800",
    PENDENTE: "bg-yellow-100 text-yellow-800",
    "EM ANDAMENTO": "bg-blue-100 text-blue-800",
    FINALIZADO: "bg-green-100 text-green-800",
    CANCELADO: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${cores[status]}`}
    >
      {status}
    </span>
  );
}
