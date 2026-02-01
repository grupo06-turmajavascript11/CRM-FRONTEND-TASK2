import type { Solicitacao } from "@/models/Solicitacao";

let solicitacoes: Solicitacao[] = [];

export async function listarSolicitacoes(): Promise<Solicitacao[]> {
  return [...solicitacoes];
}

export async function criarSolicitacao(solicitacao: Solicitacao) {
  const novaSolicitacao = {
    ...solicitacao,
    id: Date.now(),
    dataCriacao: new Date().toISOString(),  // ← Garante formato ISO
  };
  
  solicitacoes.push(novaSolicitacao);
  return novaSolicitacao;
}

export async function atualizarSolicitacao(solicitacao: Solicitacao) {
  const index = solicitacoes.findIndex((s) => s.id === solicitacao.id);
  if (index === -1) throw new Error("Solicitação não encontrada");

  solicitacoes[index] = { ...solicitacao };
}

export async function deletarSolicitacao(id: number) {
  solicitacoes = solicitacoes.filter((s) => s.id !== id);
}
