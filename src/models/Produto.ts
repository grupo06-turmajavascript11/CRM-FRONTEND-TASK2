import type Categoria from './Categoria';
import type Usuario from './Usuario';

export default interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  carencia?: number | null;
  status: string;
  categoria: Categoria;
  usuario?: Usuario | null;
}