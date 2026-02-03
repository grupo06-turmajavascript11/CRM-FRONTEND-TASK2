import axios from 'axios';

const api = axios.create({
  baseURL: 'https://crud-crm-d9vt.onrender.com',
});

export const cadastrarUsuario = async(url: string, dados: Object, setDados: Function) => { 
  try {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
  } catch (error) {
    console.log("Erro no cadastro:", error);
    throw error;
  }
}

export const login = async(url: string, dados: Object, setDados: Function) => {
  try {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
  } catch (error) {
    console.log("Erro no login:", error);
    throw error;
  }
}

export const buscar = async(url: string, setDados: Function, header: Object) => {
  try {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
  } catch (error) {
    console.log("Erro ao buscar:", error);
    throw error;
  }
}

export const cadastrar = async(url: string, dados: Object, setDados: Function, header: Object) => {
  try {
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
  } catch (error) {
    console.log("Erro ao cadastrar:", error);
    throw error;
  }
}

export const atualizar = async(url: string, dados: Object, setDados: Function, header: Object) => {
  try {
    const resposta = await api.put(url, dados, header);
    setDados(resposta.data);
  } catch (error) {
    console.log("Erro ao atualizar:", error);
    throw error;
  }
}

export const deletar = async(url: string, header: Object) => {
  try {
    await api.delete(url, header);
  } catch (error) {
    console.log("Erro ao deletar:", error);
    throw error;
  }
}

export default api;