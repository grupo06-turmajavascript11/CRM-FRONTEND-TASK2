import type { Categoria } from "@/models/Categoria";

export const categoriasMock: Categoria [] = [
     {
    id: 1,
    nome: "Seguro",
    descricao: "Produtos de seguro",
    cor: "#7C3AED",
    destaque: true
  },
  {
    id: 2,
    nome: "Plano",
    descricao: "Planos de saúde e serviços",
    cor: "#3B82F6",
    destaque: true
  },
  {
    id: 3,
    nome: "Produto",
    descricao: "Produtos digitais e físicos",
    cor: "#10B981",
    destaque: false
  },
  {
    id: 4,
    nome: "Serviços",
    descricao: "Serviços diversos",
    cor: "#F59E0B",
    destaque: true
  }
];