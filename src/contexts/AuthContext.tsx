import { createContext, type ReactNode, useState } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { ToastAlerta } from "../utils/ToastAlerta";

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
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
    usuario: "",
    senha: "",
    foto: "",
    token: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  {/* LOGIN */}
  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);

    try {
      await login(`/usuarios/logar`, usuarioLogin, setUsuario);

      ToastAlerta("Usuário autenticado com sucesso!", "sucesso");
    } catch (error) {
      ToastAlerta("Os dados do usuário estão inconsistentes!", "erro");
    }

    setIsLoading(false);
  }

   {/* CADASTRO */}
  async function handleCadastro(novoUsuario: UsuarioLogin) {
    setIsLoading(true);
    try {
      await cadastrarUsuario(`/usuarios/cadastrar`, novoUsuario);
      ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
      // opcional: já logar automaticamente ou redirecionar
    } catch (error) {
      ToastAlerta("Erro ao cadastrar o usuário!", "erro");
    }
    setIsLoading(false);
  }

  {/* LOGOUT */}
  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: ""
    });

    ToastAlerta("Usuário deslogado com sucesso!", "sucesso");
  }

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
