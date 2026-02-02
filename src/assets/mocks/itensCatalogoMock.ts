import type { ItemCatalogo } from "@/models/ItemCatalogo";

export const itensMock: ItemCatalogo[] = [
  {
    id: 1,
    produto: "Seguro de Vida Essencial",
    descricao: "Cobertura para morte natural ou acidental.",
    valor: 49.9,
    categoria: "Seguro",
    status: "EM ANDAMENTO"
  },
  {
    id: 2,
    produto: "Plano Saúde Empresarial",
    descricao: "Atendimento nacional com ampla rede.",
    categoria: "Plano",
    status: "DISPONÍVEL"
  },
  {
    id: 3,
    produto: "Produto Digital Premium",
    descricao: "Acesso vitalício a plataforma.",
    valor: 199.9,
    categoria: "Produto",
    status: "FINALIZADO"
  },
];