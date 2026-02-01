
import type { Status } from "./Status";

export interface Solicitacao {
  id?: number;
  cliente: string;
  produto: string;
  categoria: string;
  status: Status;
  observacoes?: string;
  dataCriacao:string;
}
