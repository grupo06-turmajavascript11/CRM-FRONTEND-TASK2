import type { Solicitacao } from "@/models/Solicitacao";

export const solicitacoesMock: Solicitacao[] = [
  {
    id: 1,
    cliente: "João Silva",
    produto: "Plano Premium",
    categoria: "Serviços",
    status: "EM ANDAMENTO",
    dataCriacao: new Date("2026-01-20").toISOString(),
  },
  {
    id: 2,
    cliente: "Maria Souza",
    produto: "Plano Básico",
    categoria: "Serviços",
    status: "FINALIZADO",
    dataCriacao: new Date("2026-01-18").toISOString(),
  },
];
