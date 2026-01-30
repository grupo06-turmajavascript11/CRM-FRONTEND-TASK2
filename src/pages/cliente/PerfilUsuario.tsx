import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  EnvelopeSimple,
  Phone,
  IdentificationCard,
  CalendarBlank,
  ShieldCheck,
  Camera,
  SpinnerGap,
  Trash,
  ArrowLeft,
  SignOut,
} from "@phosphor-icons/react";

type TipoUsuario = "ADMIN" | "CLIENTE";

type UsuarioForm = {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;
  documento?: string;
  dataNasc?: string; // YYYY-MM-DD
  foto?: string; // URL
  tipo?: TipoUsuario;
};

export default function PerfilUsuario() {
  const navigate = useNavigate();

  // Mock alinhado ao backend (tb_usuarios)
  const mockUser = useMemo<UsuarioForm>(
    () => ({
      id: 1,
      nome: "Usuário Atlas6",
      email: "usuario@atlas6.com",
      telefone: "(11) 99999-0000",
      documento: "123.456.789-00",
      dataNasc: "1999-05-20",
      foto: "",
      tipo: "CLIENTE",
    }),
    []
  );

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<UsuarioForm>(mockUser);

  const initial = useMemo(() => {
    const letter = formData.nome?.trim()?.[0]?.toUpperCase();
    return letter || "U";
  }, [formData.nome]);

  const handleChange =
    (key: keyof UsuarioForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const validate = () => {
    if (!formData.nome?.trim()) return "Preencha seu nome.";
    if (!formData.email?.trim()) return "Preencha seu e-mail.";
    // validação simples de email (front)
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "E-mail inválido.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const err = validate();
    if (err) return alert(err);

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);

    alert("Perfil atualizado com sucesso! ✅");
  };

  const handleDelete = () => {
    const ok = confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação não tem volta."
    );
    if (!ok) return;

    alert("Conta excluída (simulação) 🗑️");
    navigate("/");
  };

  const handleLogout = () => {
    alert("Saiu da conta (simulação) 👋");
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="container px-4 py-10 max-w-3xl"
    >
      {/* Topbar */}
      <div className="flex items-center justify-between gap-3 mb-7">
        <div>
          <h1 className="font-heading text-3xl font-bold text-dark">
            Meu Perfil
          </h1>
          <p className="text-secondary">Gerencie suas informações pessoais</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="h-11 px-4 rounded-xl border border-muted/30 bg-white hover:bg-dark/5 transition inline-flex items-center gap-2"
          >
            <ArrowLeft size={18} weight="bold" />
            Voltar
          </Link>

          <button
            onClick={handleLogout}
            type="button"
            className="h-11 px-4 rounded-xl bg-primary text-white hover:bg-primary-hover transition inline-flex items-center gap-2"
          >
            <SignOut size={18} weight="bold" />
            Sair
          </button>
        </div>
      </div>

      {/* Card perfil */}
      <div className="rounded-2xl border border-muted/20 bg-white shadow-sm p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full overflow-hidden border border-muted/30 bg-primary/10 flex items-center justify-center">
              {formData.foto ? (
                <img
                  src={formData.foto}
                  alt={`Foto de ${formData.nome}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
                  {initial}
                </div>
              )}
            </div>

            {/* Botão foto (mock) */}
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-white border border-muted/30 shadow-sm flex items-center justify-center hover:bg-dark/5 transition"
              title="Alterar foto (mock)"
              onClick={() =>
                alert(
                  "Aqui você pode abrir um modal/upload depois. Por enquanto é mock 🙂"
                )
              }
            >
              <Camera size={18} />
            </button>
          </div>

          <div className="min-w-0">
            <p className="font-heading text-xl font-semibold text-dark truncate">
              {formData.nome}
            </p>
            <p className="text-secondary truncate">{formData.email}</p>

            <span className="inline-flex mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/15">
              {formData.tipo || "CLIENTE"}
            </span>
          </div>
        </div>
      </div>

      {/* Card formulário */}
      <div className="rounded-2xl border border-muted/20 bg-white shadow-sm p-6">
        <div className="mb-5">
          <h2 className="font-heading text-lg font-semibold text-dark">
            Informações pessoais
          </h2>
          <p className="text-secondary text-sm">
            Atualize seus dados (alinhados com o backend de Usuário)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nome */}
            <div className="space-y-2">
              <label htmlFor="nome" className="text-sm text-secondary font-medium">
                Nome completo
              </label>
              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  size={18}
                />
                <input
                  id="nome"
                  value={formData.nome}
                  onChange={handleChange("nome")}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Seu nome"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm text-secondary font-medium"
              >
                E-mail
              </label>
              <div className="relative">
                <EnvelopeSimple
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  size={18}
                />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <label
                htmlFor="telefone"
                className="text-sm text-secondary font-medium"
              >
                Telefone
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  size={18}
                />
                <input
                  id="telefone"
                  value={formData.telefone || ""}
                  onChange={handleChange("telefone")}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            {/* Documento */}
            <div className="space-y-2">
              <label
                htmlFor="documento"
                className="text-sm text-secondary font-medium"
              >
                Documento (CPF/CNPJ)
              </label>
              <div className="relative">
                <IdentificationCard
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  size={18}
                />
                <input
                  id="documento"
                  value={formData.documento || ""}
                  onChange={handleChange("documento")}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="123.456.789-00"
                />
              </div>
            </div>

            {/* Data de nascimento */}
            <div className="space-y-2">
              <label
                htmlFor="dataNasc"
                className="text-sm text-secondary font-medium"
              >
                Data de nascimento
              </label>
              <div className="relative">
                <CalendarBlank
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  size={18}
                />
                <input
                  id="dataNasc"
                  type="date"
                  value={formData.dataNasc || ""}
                  onChange={handleChange("dataNasc")}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Tipo (somente leitura) */}
            <div className="space-y-2">
              <label className="text-sm text-secondary font-medium">
                Tipo de usuário
              </label>
              <div className="relative">
                <ShieldCheck
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  size={18}
                />
                <input
                  value={formData.tipo || "CLIENTE"}
                  disabled
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-secondary">
                *O tipo normalmente é controlado pelo sistema (ADMIN/CLIENTE).
              </p>
            </div>

            {/* Foto URL */}
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="foto" className="text-sm text-secondary font-medium">
                Foto (URL)
              </label>
              <div className="relative">
                <Camera
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  size={18}
                />
                <input
                  id="foto"
                  value={formData.foto || ""}
                  onChange={handleChange("foto")}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="https://..."
                />
              </div>
              <p className="text-xs text-secondary">
                *Depois você pode trocar por upload de imagem.
              </p>
            </div>
          </div>

          {/* divisor */}
          <div className="h-px w-full bg-muted/30" />

          {/* ações */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="h-12 px-6 rounded-xl bg-primary text-white hover:bg-primary-hover transition disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <SpinnerGap size={18} className="animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar alterações"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Zona de perigo */}
      <div className="rounded-2xl border border-muted/20 bg-white shadow-sm p-6 mt-6">
        <div className="mb-4">
          <h3 className="font-heading font-semibold text-dark">Zona de Perigo</h3>
          <p className="text-secondary text-sm">
            Ações irreversíveis para sua conta
          </p>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="h-12 px-5 rounded-xl border border-muted/30 bg-white hover:bg-dark/5 transition inline-flex items-center gap-2"
        >
          <Trash size={18} weight="bold" />
          Excluir conta
        </button>
      </div>
    </motion.div>
  );
}
