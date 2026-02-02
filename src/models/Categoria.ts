// models/Categoria.ts
export interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
  cor: string;
  destaque?: boolean;
}