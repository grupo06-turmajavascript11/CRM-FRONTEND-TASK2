import { createContext, type ReactNode, useState } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout: () => void;
  handleLogin: (usuario: UsuarioLogin) => Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    email: "",
    senha: "",
    foto: "",
    token: "",
    tipo: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(userLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      await login(`/usuarios/login`, userLogin, (dadosResposta: any) => {

        const tokenRecebido = dadosResposta.access_token || dadosResposta.token;

        if (!tokenRecebido) {
            throw new Error("Token não encontrado na resposta!");
        }
        const tokenFormatado = tokenRecebido.startsWith("Bearer") 
            ? tokenRecebido 
            : `Bearer ${tokenRecebido}`;

        const usuarioLogado = {
            id: dadosResposta.id,
            nome: dadosResposta.nome || "",
            email: userLogin.email,
            foto: dadosResposta.foto || "",
            tipo: dadosResposta.tipo,
            token: tokenFormatado,
            senha: userLogin.senha
        };

        setUsuario(usuarioLogado);
      });

      alert("Usuário logado com sucesso!");
      
    } catch (error) {
      console.error(error);
      alert("Dados do usuário inconsistentes. Verifique as informações de cadastro.");
    }
    setIsLoading(false);
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      email: "",
      senha: "",
      foto: "",
      token: "",
      tipo: ""
    });
    alert("Usuário deslogado com sucesso!");
  }

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}