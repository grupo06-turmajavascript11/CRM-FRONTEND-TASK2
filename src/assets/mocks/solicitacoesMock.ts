import type { Solicitacao } from "@/models/Solicitacao";

export const solicitacoesMock: Solicitacao[] = [
  {
    id: 1,
    cliente: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 98888-7777",
    produto: "Plano Premium",
    categoria: "Serviços",
    status: "EM ANDAMENTO",
    dataCriacao: new Date("2026-01-20").toISOString(),
  },
  {
    id: 2,
    cliente: "Maria Souza",
    email: "maria.souza@email.com",
    telefone: "(21) 97777-6666",
    produto: "Plano Básico",
    categoria: "Serviços",
    status: "FINALIZADO",
    dataCriacao: new Date("2026-01-18").toISOString(),
  },
  {
    id: 3,
    cliente: "Claudio Serra",
    email: "claudio.serraa@email.com",
    telefone: "(17) 97899-6646",
    produto: "Seguro de Vida Essencial",
    categoria: "Seguro",
    status: "PENDENTE",
    dataCriacao: new Date("2026-01-23").toISOString(),
  },
  {
    id: 4,
    cliente: "Pedro Castro",
    email: "pedro.castro@email.com",
    telefone: "(71) 94949-4646",
    produto: "Plano Saúde Empresarial",
    categoria: "Plano",
    status: "CANCELADO",
    dataCriacao: new Date("2026-01-23").toISOString(),
  },
];
