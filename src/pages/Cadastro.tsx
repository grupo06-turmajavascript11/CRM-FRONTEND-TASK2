import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import type Usuario from "@/models/Usuario";
import { cadastrarUsuario } from "@/services/Service";
import { ArrowLeftIcon } from "@phosphor-icons/react"; // Importando com o sufixo Icon

interface UsuarioCadastro {
  nome: string;
  email: string;
  documento: string;
  telefone: string;
  foto: string;
  senha: string;
  confirmarSenha: string;
}

export default function Cadastro() {
  const navigate = useNavigate();

  // Estado do formulário
  const [usuario, setUsuario] = useState<UsuarioCadastro>({
    nome: "",
    email: "",
    documento: "",
    telefone: "",
    foto: "",
    senha: "",
    confirmarSenha: "",
  });

  // Estado apenas para receber a resposta do back
  const [usuarioResult, setUsuarioResult] = useState<Usuario | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    // Máscaras
    if (name === "documento") {
      const digits = value.replace(/\D/g, "");
      const cpfFormatado = digits
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
      setUsuario({ ...usuario, [name]: cpfFormatado });
    } else if (name === "telefone") {
      const digits = value.replace(/\D/g, "");
      const telFormatado = digits
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
      setUsuario({ ...usuario, [name]: telFormatado });
    } else {
      setUsuario({ ...usuario, [name]: value });
    }
  }

  // Monitora se o cadastro deu certo para redirecionar
  useEffect(() => {
    if (usuarioResult && usuarioResult.id !== 0) {
      navigate("/login");
    }
  }, [usuarioResult, navigate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 1. Validação de Senha no Front
    if (usuario.senha !== usuario.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    // 2. Validação de Tamanho de Senha
    if (usuario.senha.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    setIsLoading(true);

    // 3. Preparando o objeto para o Backend
    const { confirmarSenha, ...dadosBackend } = usuario;
    
    // Se sua Entity usa 'email', mantemos assim. Adicionamos o tipo CLIENTE.
    const usuarioFinal = { ...dadosBackend, tipo: 'CLIENTE' };

    try {
      await cadastrarUsuario(`/usuarios/cadastrar`, usuarioFinal, setUsuarioResult);
      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar. Verifique se o e-mail já existe.");
    }

    setIsLoading(false);
  }

  return (
    // Adicionado py-20 para dar espaçamento vertical maior
    <div className="relative w-full min-h-screen flex items-center justify-center font-sans py-20">

      {/* FUNDO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="https://ik.imagekit.io/k8aunjtbla/236652_small.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-dark/80 z-0"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md bg-dark/50 rounded-xl shadow-xl p-8 backdrop-blur-md border border-white/10">

        {/* BOTÃO VOLTAR PARA HOME */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 text-secondary hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold group"
          title="Voltar para a página inicial"
        >
          <ArrowLeftIcon size={20} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar</span>
        </Link>

        <div className="flex justify-center mb-6 mt-4">
          <img src="/logo-atlas6.svg" alt="Atlas 6 CRM" className="h-16" />
        </div>

        <h2 className="text-center text-3xl text-primary font-heading mb-6">
          Criar Conta
        </h2>

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
              placeholder="Mínimo 8 caracteres"
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

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 rounded bg-primary hover:bg-primary-hover text-light py-3 flex justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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