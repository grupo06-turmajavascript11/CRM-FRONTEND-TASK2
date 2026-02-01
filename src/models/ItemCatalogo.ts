import type { Status } from "./Status";

export interface ItemCatalogo {
  id: number;
  produto: string;
  descricao: string;
  valor?: number;
  categoria: string;
  destaque?: string;
  status: Status;
}
