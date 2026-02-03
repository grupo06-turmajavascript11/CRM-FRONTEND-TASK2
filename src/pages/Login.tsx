import { useState, useContext, useEffect, type ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import type UsuarioLogin from "@/models/UsuarioLogin";
import { ArrowLeftIcon } from "@phosphor-icons/react";

export default function Login() {
  const navigate = useNavigate();

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    email: "",
    senha: "",
  });

  useEffect(() => {
    if (usuario.token !== "") {
      if (usuario.tipo === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/solicitacoes");
      }
    }
  }, [usuario, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-light">
      
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 z-0 w-full h-full object-cover"
      >
        <source
          src="https://ik.imagekit.io/k8aunjtbla/236652_small.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 z-10 bg-linear-to-b from-dark/80 via-dark/60 to-dark/90" />

      <div className="relative z-10 w-full max-w-md bg-dark/50 rounded-xl shadow-xl p-8 backdrop-blur-md">
        
        {/* 2. BOTÃO VOLTAR PARA HOME */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 text-secondary hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold group"
          title="Voltar para a página inicial"
        >
          <ArrowLeftIcon size={20} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar</span>
        </Link>

        <div className="flex justify-center mb-6 mt-2">
          <img
            src="/logo-atlas6.svg"
            alt="Atlas 6 CRM"
            className="h-16"
          />
        </div>

        <h2 className="text-center text-3xl text-primary font-heading mb-6">
          Acessar Plataforma
        </h2>

        <form className="flex flex-col gap-4" onSubmit={login}>
          <div className="flex flex-col gap-1">
            <label htmlFor="usuario" className="text-secondary">
              Usuário (E-mail)
            </label>
            <input
              type="text"
              id="usuario"
              name="email"  
              required
              placeholder="Digite seu e-mail"
              className="rounded bg-slate-700 text-light p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuarioLogin.email}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="senha" className="text-secondary">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              required
              placeholder="Digite sua senha"
              className="rounded bg-slate-700 text-light p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuarioLogin.senha}
              onChange={atualizarEstado}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 rounded bg-primary hover:bg-primary-hover text-light py-3 flex justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              "Carregando..."
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <hr className="my-6 border-muted" />

        <p className="text-center text-secondary">
          Ainda não tem uma conta?{" "}
          <Link to="/cadastro" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </section>
  );
}