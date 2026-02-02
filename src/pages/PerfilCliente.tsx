import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  IdentificationCardIcon,
  CalendarBlankIcon,
  ShieldCheckIcon,
  CameraIcon,
  SpinnerGapIcon,
  TrashIcon,
  ArrowLeftIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import cosmicHero from "../assets/cosmic-hero.jpg";

type TipoUsuario = "ADMIN" | "CLIENTE";

type UsuarioForm = {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;
  documento?: string;
  dataNasc?: string; 
  foto?: string;
  tipo?: TipoUsuario;
};

export default function PerfilCliente() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<UsuarioForm>({
    nome: "",
    email: "",
    telefone: "",
    documento: "",
    dataNasc: "",
    tipo: undefined,
    foto: "",
  });

  const initial = useMemo(() => {
    const letter = formData.nome?.trim()?.[0]?.toUpperCase();
    return letter || "U";
  }, [formData.nome]);

  const handleChange =
    (key: keyof UsuarioForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };


  const validateNome = () => {
    const nome = formData.nome.trim();
    if (!nome) return "Preencha seu nome completo.";

    const parts = nome.split(/\s+/).filter(Boolean);
    if (parts.length < 2) return "Digite nome e sobrenome (ex: Maria Silva).";

    if (parts.some((p) => p.length < 2))
      return "Nome inválido. Evite abreviações (ex: 'Maria S').";

    return null;
  };

  const validateEmail = () => {
    const email = formData.email.trim();
    if (!email) return "Preencha seu e-mail.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "E-mail inválido.";
    return null;
  };

  const validateTelefone = () => {
    const raw = (formData.telefone || "").trim();
    if (!raw) return "Preencha seu telefone com DDD.";

    const onlyDigits = raw.replace(/\D/g, "");
    if (onlyDigits.length < 10 || onlyDigits.length > 11)
      return "Telefone inválido. Informe DDD + número (ex: (11) 99999-0000).";

    return null;
  };

  const validateDocumento = () => {
    const raw = (formData.documento || "").trim();
    if (!raw) return "Preencha seu CPF.";

    const onlyDigits = raw.replace(/\D/g, "");
    if (onlyDigits.length !== 11) return "CPF inválido: deve ter 11 dígitos.";

    return null;
  };

  const validateDataNasc = () => {
    const raw = (formData.dataNasc || "").trim();
    if (!raw) return "Preencha sua data de nascimento (DD/MM/AAAA).";

    const match = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) return "Data inválida. Use o formato DD/MM/AAAA.";

    const dd = Number(match[1]);
    const mm = Number(match[2]);
    const yyyy = Number(match[3]);

    if (yyyy < 1900 || yyyy > 2100) return "Ano inválido na data de nascimento.";
    if (mm < 1 || mm > 12) return "Mês inválido na data de nascimento.";
    if (dd < 1 || dd > 31) return "Dia inválido na data de nascimento.";

    const date = new Date(yyyy, mm - 1, dd);
    const isValid =
      date.getFullYear() === yyyy &&
      date.getMonth() === mm - 1 &&
      date.getDate() === dd;

    if (!isValid) return "Data inválida. Verifique dia/mês/ano.";

    return null;
  };

  const validate = () => {
    const errNome = validateNome();
    if (errNome) return errNome;

    const errEmail = validateEmail();
    if (errEmail) return errEmail;

    const errTelefone = validateTelefone();
    if (errTelefone) return errTelefone;

    const errCpf = validateDocumento();
    if (errCpf) return errCpf;

    const errData = validateDataNasc();
    if (errData) return errData;

    return null;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      alert(err); 
      return;
    }

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

    alert("Conta excluída 🗑️");
    navigate("/");
  };

  const handleLogout = () => {
    alert("Saiu da conta 👋");
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-10 bg-dark">
      <div className="absolute inset-0">
        <img
          src={cosmicHero}
          alt=""
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-dark/60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 w-full max-w-3xl"
      >
      
        <div className="flex items-center justify-between gap-3 mb-7">
          <div>
            <h1 className="font-heading text-3xl font-bold text-white">
              Meu Perfil
            </h1>
            <p className="text-secondary">Gerencie suas informações pessoais</p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="h-11 px-4 rounded-xl border border-muted/30 bg-white hover:bg-dark/5 transition inline-flex items-center gap-2"
            >
              <ArrowLeftIcon size={18} weight="bold" />
              Voltar
            </Link>

            <button
              onClick={handleLogout}
              type="button"
              className="h-11 px-4 rounded-xl bg-primary text-white hover:bg-primary-hover transition inline-flex items-center gap-2"
            >
              <SignOutIcon size={18} weight="bold" />
              Sair
            </button>
          </div>
        </div>

  
        <div className="rounded-2xl border border-muted bg-white shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
          
              <div className="w-20 h-20 rounded-full overflow-hidden border border-muted/30 bg-primary/10 flex items-center justify-center">
                {formData.foto ? (
                  <img
                    src={formData.foto}
                    alt={`Foto de ${formData.nome || "usuário"}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
                    {initial}
                  </div>
                )}
              </div>

   
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
                <CameraIcon size={18} />
              </button>
            </div>

            <div className="min-w-0">
              <p className="font-heading text-xl font-semibold text-dark truncate">
                {formData.nome || "Seu nome aqui"}
              </p>
              <p className="text-secondary truncate">
                {formData.email || "seuemail@exemplo.com"}
              </p>

              <span className="inline-flex mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/15">
                {formData.tipo || "CLIENTE"}
              </span>
            </div>
          </div>
        </div>

 
        <div className="rounded-2xl border border-muted/20 bg-white shadow-sm p-6">
          <div className="mb-5">
            <h2 className="font-heading text-lg font-semibold text-dark">
              Informações pessoais
            </h2>
            <p className="text-secondary text-sm">
              Atualize seus dados 
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       
              <div className="space-y-2">
                <label
                  htmlFor="nome"
                  className="text-sm text-secondary font-medium"
                >
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
                    placeholder="Ex: Maria Silva"
                  />
                </div>
              </div>

          
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm text-secondary font-medium"
                >
                  E-mail
                </label>
                <div className="relative">
                  <EnvelopeSimpleIcon
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

       
              <div className="space-y-2">
                <label
                  htmlFor="telefone"
                  className="text-sm text-secondary font-medium"
                >
                  Telefone
                </label>
                <div className="relative">
                  <PhoneIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    size={18}
                  />
                  <input
                    id="telefone"
                    value={formData.telefone || ""}
                    onChange={handleChange("telefone")}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Ex: (11) 99999-0000"
                  />
                </div>
              </div>

    
              <div className="space-y-2">
                <label
                  htmlFor="documento"
                  className="text-sm text-secondary font-medium"
                >
                  CPF
                </label>
                <div className="relative">
                  <IdentificationCardIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    size={18}
                  />
                  <input
                    id="documento"
                    value={formData.documento || ""}
                    onChange={handleChange("documento")}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Ex: 123.456.789-00"
                  />
                </div>
              </div>

          
              <div className="space-y-2">
                <label
                  htmlFor="dataNasc"
                  className="text-sm text-secondary font-medium"
                >
                  Data de nascimento
                </label>
                <div className="relative">
                  <CalendarBlankIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    size={18}
                  />
                  <input
                    id="dataNasc"
                    type="text"
                    value={formData.dataNasc || ""}
                    onChange={handleChange("dataNasc")}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="DD/MM/AAAA"
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-secondary font-medium">
                  Tipo de usuário
                </label>
                <div className="relative">
                  <ShieldCheckIcon
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
                  *O tipo é controlado pelo sistema (ADMIN/CLIENTE).
                </p>
              </div>

       
              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="foto"
                  className="text-sm text-secondary font-medium"
                >
                  Foto (URL)
                </label>
                <div className="relative">
                  <CameraIcon
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
              </div>
            </div>

          
            <div className="h-px w-full bg-muted/30" />

         
            <div className="flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="h-12 px-6 rounded-xl bg-primary text-white hover:bg-primary-hover transition disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <SpinnerGapIcon size={18} className="animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar alterações"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-2xl border border-muted/20 bg-white shadow-sm p-6 mt-6">
          <div className="mb-4">
            <h3 className="font-heading font-semibold text-dark">
              Zona de Perigo
            </h3>
            <p className="text-secondary text-sm">
              Ações irreversíveis para sua conta
            </p>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            className="h-12 px-5 rounded-xl border border-muted/30 bg-red-500 text-white hover:bg-red-600 transition inline-flex items-center gap-2"
          >
            <TrashIcon size={18} weight="bold" />
            Excluir conta
          </button>
        </div>
      </motion.div>
    </div>
  );
}
