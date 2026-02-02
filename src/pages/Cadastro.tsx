import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

interface UsuarioCadastro {
  nome: string;
  email: string;
  documento: string;
  telefone?: string;
  foto?: string;
  senha: string;
  confirmarSenha: string;
}

export default function Cadastro() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<UsuarioCadastro>({
    nome: "",
    email: "",
    documento: "",
    telefone: "",
    foto: "",
    senha: "",
    confirmarSenha: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    // Máscaras simples
    if (name === "documento") {
      // CPF: 000.000.000-00
      const digits = value.replace(/\D/g, "");
      const cpfFormatado = digits
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
      setUsuario({ ...usuario, [name]: cpfFormatado });
    } else if (name === "telefone") {
      // Telefone: (11) 99999-9999
      const digits = value.replace(/\D/g, "");
      const telFormatado = digits
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
      setUsuario({ ...usuario, [name]: telFormatado });
    } else {
      setUsuario({ ...usuario, [name]: value });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (usuario.senha !== usuario.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    setIsLoading(true);

    // Simulando requisição de cadastro
    setTimeout(() => {
      console.log("Usuário cadastrado:", usuario);
      setIsLoading(false);
      navigate("/login"); // volta para login
    }, 1500);
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center font-sans">

      {/* FUNDO - video ou GIF */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="https://ik.imagekit.io/k8aunjtbla/236652_small.mp4" type="video/mp4" />
        Seu navegador não suporta vídeo.
      </video>

      {/* CAMADA ESCURA POR CIMA DO VÍDEO */}
      <div className="absolute top-0 left-0 w-full h-full bg-dark/80 z-0"></div>

      {/* CARD CENTRAL COM 50% DE TRANSPARÊNCIA */}
      <div className="relative z-10 w-full max-w-md bg-dark/50 rounded-xl shadow-xl p-8 backdrop-blur-md">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src="/logo-atlas6.svg" alt="Atlas 6 CRM" className="h-16" />
        </div>

        {/* TÍTULO */}
        <h2 className="text-center text-3xl text-primary font-heading mb-6">
          Criar Conta
        </h2>

        {/* FORM */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          {/* Nome */}
          <div className="flex flex-col gap-1">
            <label htmlFor="nome" className="text-secondary">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              placeholder="Digite seu nome"
              className="rounded bg-slate-700 text-light p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuario.nome}
              onChange={atualizarEstado}
            />
          </div>

          {/* E-mail */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-secondary">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Digite seu e-mail"
              className="rounded bg-slate-700 text-light p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuario.email}
              onChange={atualizarEstado}
            />
          </div>

          {/* CPF */}
          <div className="flex flex-col gap-1">
            <label htmlFor="documento" className="text-secondary">Documento (CPF)</label>
            <input
              type="text"
              id="documento"
              name="documento"
              required
              placeholder="000.000.000-00"
              maxLength={14}
              className="rounded bg-slate-700 text-light p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuario.documento}
              onChange={atualizarEstado}
            />
          </div>

          {/* Telefone */}
          <div className="flex flex-col gap-1">
            <label htmlFor="telefone" className="text-secondary">Telefone (opcional)</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              placeholder="(11) 99999-9999"
              maxLength={15}
              className="rounded bg-slate-700 text-light p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuario.telefone}
              onChange={atualizarEstado}
            />
          </div>

          {/* Foto */}
          <div className="flex flex-col gap-1">
            <label htmlFor="foto" className="text-secondary">Foto (URL opcional)</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="URL da foto"
              className="rounded bg-slate-700 text-light p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuario.foto}
              onChange={atualizarEstado}
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1">
            <label htmlFor="senha" className="text-secondary">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              required
              placeholder="Digite sua senha"
              className="rounded bg-slate-700 text-light p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuario.senha}
              onChange={atualizarEstado}
            />
          </div>

          {/* Confirmar senha */}
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmarSenha" className="text-secondary">Confirmar senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              required
              placeholder="Confirme sua senha"
              className="rounded bg-slate-700 text-light p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuario.confirmarSenha}
              onChange={atualizarEstado}
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="mt-4 rounded bg-primary hover:bg-primary-hover text-light py-3 flex justify-center transition-colors duration-200"
          >
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <hr className="my-6 border-muted" />

        <p className="text-center text-secondary">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Entrar
          </Link>
        </p>

      </div>
    </div>
  );
}
