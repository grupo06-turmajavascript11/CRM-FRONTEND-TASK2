export default interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  foto?: string;
  tipo?: string;
  documento?: string;
  telefone?: string;
}