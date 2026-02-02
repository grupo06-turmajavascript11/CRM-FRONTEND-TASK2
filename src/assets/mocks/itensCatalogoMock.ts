import type { ItemCatalogo } from "@/models/ItemCatalogo";

export const itensMock: ItemCatalogo[] = [
  {
  id: 1,
  produto: "Seguro de Vida Essencial",
  descricao: "Proteção financeira para você e sua família em casos de morte natural ou acidental, garantindo segurança e tranquilidade em momentos inesperados.",
  valor: 49.9,
  categoria: "Seguro",
  status: "EM ANDAMENTO"
},
{
  id: 2,
  produto: "Plano Saúde Empresarial",
  descricao: "Plano de saúde voltado para empresas, com cobertura nacional, ampla rede credenciada e atendimento médico de qualidade para colaboradores.",
  categoria: "Plano",
  status: "DISPONÍVEL"
},
{
  id: 3,
  produto: "Produto Digital Premium",
  descricao: "Solução digital completa com acesso vitalício à plataforma, recursos exclusivos e atualizações contínuas para maximizar resultados.",
  valor: 199.9,
  categoria: "Produto",
  status: "FINALIZADO"
},
]