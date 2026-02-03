import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  IdentificationCardIcon,
  CalendarBlankIcon,
  CameraIcon,
  SpinnerGapIcon,
  TrashIcon,
  ArrowLeftIcon,
  SignOutIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";
import cosmicHero from "../assets/cosmic-hero.jpg"; 
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/Service"; 

type TipoUsuario = "ADMIN" | "CLIENTE";

type UsuarioForm = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  dataNasc: string;
  foto: string;
  tipo: TipoUsuario;
  senha?: string; 
};

export default function PerfilAdmin() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<UsuarioForm>({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    documento: "",
    dataNasc: "",
    tipo: "ADMIN",
    foto: "",
    senha: ""
  });

  // 1. Carregar dados (Lógica do Admin)
  useEffect(() => {
    if (!usuario.token) return;

    setFormData((prev) => ({
      ...prev,
      id: usuario.id || 0,
      nome: usuario.nome || "",
      email: usuario.email || "", // Contexto pode ter 'usuario' mapeado
      foto: usuario.foto || "",
      tipo: "ADMIN",
    }));

    if (usuario.id && usuario.id !== 0) {
      buscarDadosCompletos(usuario.id);
    }
  }, [usuario.token, usuario.id]);

  async function buscarDadosCompletos(id: number) {
    try {
      const header = { headers: { Authorization: usuario.token } };
      const resposta = await api.get(`/usuarios/${id}`, header);
      
      setFormData((prev) => ({
        ...prev,
        telefone: resposta.data.telefone || "",
        documento: resposta.data.documento || "",
        dataNasc: resposta.data.dataNasc || "",
        nome: resposta.data.nome || prev.nome,
        email: resposta.data.usuario || resposta.data.email || prev.email,
        foto: resposta.data.foto || prev.foto
      }));

    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  }

  // Inicial (Letra do nome)
  const initial = useMemo(() => {
    const letter = formData.nome?.trim()?.[0]?.toUpperCase();
    return letter || "A";
  }, [formData.nome]);

  const handleChange =
    (key: keyof UsuarioForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  // 2. Salvar Alterações
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!usuario.senha) {
        alert("Sessão expirada. Por favor, faça login novamente.");
        handleLogout();
        navigate("/login");
        return;
    }

    if (formData.foto && formData.foto.length > 5000) {
        alert("A URL da foto é muito grande! Use um link mais curto.");
        return;
    }

    setIsLoading(true);

    try {
        const header = { headers: { Authorization: usuario.token } };
        
        const usuarioAtualizado = {
            id: formData.id,
            nome: formData.nome,
            email: formData.email, // Backend pode esperar 'usuario' ou 'email' dependendo da sua DTO
            usuario: formData.email, // Garantindo compatibilidade
            foto: formData.foto,
            telefone: formData.telefone,
            documento: formData.documento,
            dataNasc: formData.dataNasc,
            tipo: formData.tipo,
            senha: usuario.senha
        };

        await api.put('/usuarios/atualizar', usuarioAtualizado, header);
        
        alert("Perfil de Admin atualizado! 🚀");
        
    } catch (error: any) {
        console.error("Erro no update:", error);
        if (error.response?.status === 400) {
            alert("Erro ao salvar: Verifique os campos obrigatórios.");
        } else {
            alert("Erro ao atualizar perfil.");
        }
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("ATENÇÃO ADMIN: Tem certeza? Isso excluirá sua conta.")) return;
    try {
        const header = { headers: { Authorization: usuario.token } };
        await api.delete(`/usuarios/${formData.id}`, header);
        alert("Conta excluída.");
        handleLogout();
        navigate("/login");
    } catch (error) {
        alert("Erro ao excluir conta.");
    }
  };

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-10 bg-dark">
      
      {/* Background Hero (Mesmo do Cliente) */}
      <div className="absolute inset-0">
        <img src={cosmicHero} alt="" className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-dark/60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 w-full max-w-3xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-7">
          <div>
            <h1 className="font-heading text-3xl font-bold text-white">Perfil Admin</h1>
            <p className="text-secondary">Gerencie suas credenciais</p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Link volta para OPORTUNIDADES (Dashboard do Admin) */}
            <Link to="/admin/oportunidades" className="h-11 px-4 rounded-xl border border-muted/30 bg-white hover:bg-dark/5 transition inline-flex items-center gap-2 text-sm font-medium text-dark">
              <ArrowLeftIcon size={18} weight="bold" /> Voltar
            </Link>
            
            <button onClick={logout} className="h-11 px-4 rounded-xl bg-primary text-white hover:bg-primary-hover transition inline-flex items-center gap-2 text-sm font-medium">
              <SignOutIcon size={18} weight="bold" /> Sair
            </button>
          </div>
        </div>

        {/* Card Identificação (Visual Branco do Cliente) */}
        <div className="rounded-2xl border border-muted bg-white shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-muted/30 bg-primary/10 flex items-center justify-center">
                {formData.foto ? (
                    <img src={formData.foto} alt="Foto" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-primary text-white flex items-center justify-center text-3xl font-bold">{initial}</div>
                )}
                </div>
                 {/* Ícone de Admin para diferenciar visualmente */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border border-muted/30 shadow-sm flex items-center justify-center text-primary">
                    <ShieldCheckIcon size={16} weight="fill" />
                </div>
            </div>
            
            <div className="min-w-0">
              <p className="font-heading text-xl font-semibold text-dark truncate">{formData.nome}</p>
              <p className="text-secondary truncate">{formData.email}</p>
              <span className="inline-flex mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/15 uppercase">
                {formData.tipo || "ADMIN"}
              </span>
            </div>
          </div>
        </div>

        {/* Formulário (Visual Branco do Cliente) */}
        <div className="rounded-2xl border border-muted/20 bg-white shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-2">
                <label className="text-sm text-secondary font-medium">Nome completo</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input value={formData.nome} onChange={handleChange("nome")} className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20 text-slate-700" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-secondary font-medium">E-mail (Login)</label>
                <div className="relative">
                  <EnvelopeSimpleIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input value={formData.email} onChange={handleChange("email")} className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20 text-slate-700" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-secondary font-medium">Telefone</label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input value={formData.telefone} onChange={handleChange("telefone")} className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20 text-slate-700" />
                </div>
              </div>

              {/* Documento (Admin geralmente usa CPF ou Matrícula) */}
              <div className="space-y-2">
                <label className="text-sm text-secondary font-medium">CNPJ / Documento</label>
                <div className="relative">
                  <IdentificationCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input value={formData.documento} onChange={handleChange("documento")} className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20 text-slate-700" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-secondary font-medium">Data de Nascimento</label>
                <div className="relative">
                  <CalendarBlankIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="date" value={formData.dataNasc} onChange={handleChange("dataNasc")} className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20 text-slate-700" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-secondary font-medium">Tipo de Usuário</label>
                <div className="relative">
                   <ShieldCheckIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <input value={formData.tipo} disabled className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-slate-100 outline-none text-slate-500 cursor-not-allowed" />
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm text-secondary font-medium">Foto (URL)</label>
                <div className="relative">
                  <CameraIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input value={formData.foto} onChange={handleChange("foto")} placeholder="https://..." className="w-full h-12 pl-10 pr-4 rounded-xl border border-muted/30 bg-white outline-none focus:ring-2 focus:ring-primary/20 text-slate-700" />
                </div>
              </div>

            </div>

            <div className="h-px w-full bg-muted/30 my-4" />

            <div className="flex items-center justify-end gap-3">
              <button type="submit" disabled={isLoading} className="h-12 px-6 rounded-xl bg-primary text-white hover:bg-primary-hover transition disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center gap-2 font-medium">
                {isLoading ? <><SpinnerGapIcon size={18} className="animate-spin" /> Salvando...</> : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>

        {/* Zona de Perigo (Visual Branco do Cliente) */}
        <div className="rounded-2xl border border-red-200 bg-white shadow-sm p-6 mt-6">
            <h3 className="font-heading font-semibold text-red-600 mb-2">Zona de Perigo</h3>
            <p className="text-secondary text-sm mb-4">Ações irreversíveis para sua conta administrativa.</p>
            <button onClick={handleDelete} className="h-12 px-5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition inline-flex items-center gap-2 font-medium">
                <TrashIcon size={18} weight="bold" /> Excluir conta
            </button>
        </div>
      </motion.div>
    </div>
  );
}