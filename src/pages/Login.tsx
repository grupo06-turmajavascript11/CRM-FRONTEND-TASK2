import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

interface UsuarioLogin {
  usuario: string;
  senha: string;
}

interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  foto?: string;
  token: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    usuario: "",
    senha: "",
  });
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setUsuarioLogado({
        id: 1,
        nome: "Usuário Mock",
        usuario: usuarioLogin.usuario,
        token: "mock-token",
      });
      setIsLoading(false);
      navigate("/home");
    }, 1500);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-light">

  {/* VÍDEO DE FUNDO */}
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

  {/* OVERLAY DE CONTRASTE */}
  <div className="absolute inset-0 z-10 bg-linear-to-b from-dark/80 via-dark/60 to-dark/90" />

      {/* CARD CENTRAL COM 50% DE TRANSPARÊNCIA */}
      <div className="relative z-10 w-full max-w-md bg-dark/50 rounded-xl shadow-xl p-8 backdrop-blur-md">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo-atlas6.svg"
            alt="Atlas 6 CRM"
            className="h-16"
          />
        </div>

        {/* TÍTULO */}
        <h2 className="text-center text-3xl text-primary font-heading mb-6">
          Acessar Plataforma
        </h2>

        {/* FORM */}
        <form className="flex flex-col gap-4" onSubmit={login}>

          <div className="flex flex-col gap-1">
            <label htmlFor="usuario" className="text-secondary">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              required
              placeholder="Digite seu usuário"
              className="rounded bg-slate-700 text-light p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuarioLogin.usuario}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="senha" className="text-secondary">Senha</label>
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
            className="mt-4 rounded bg-primary hover:bg-primary-hover text-light py-3 flex justify-center transition-colors duration-200"
          >
            {isLoading ? "Carregando..." : "Entrar"}
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
