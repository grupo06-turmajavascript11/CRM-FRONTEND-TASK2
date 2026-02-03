import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  RocketLaunchIcon,
  LightningIcon,
  GlobeHemisphereWestIcon,
  UsersFourIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  SparkleIcon,
  ChatCircleTextIcon,
  CheckCircleIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  QuotesIcon,
  LockKeyIcon,
  UserCircleGearIcon,
  KeyholeIcon,
  ClipboardTextIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react";

import { StarField } from "../components/ui/StarField";

import { AuthContext } from "../contexts/AuthContext";
import cosmicHero from "../assets/cosmic-hero.jpg";
import featureBg from "../assets/webb-tarantula-neb.webp";
import ctaVideo from "../assets/3194277-hd_1920_1080_30fps.mp4";
import nutrileve from "../assets/partners/nutrileve.png";
import fitlife from "../assets/partners/fitlife.png";
import juntosnaestrada from "../assets/partners/juntos-na-estrada.jpg";
import segurabank from "../assets/partners/segurabank.png";
import clarivseguros from "../assets/partners/clarivseguros.png";
import leveebemLogo from "../assets/partners/leveebemLogo.png";
import Button from "../components/ui/Button";

const partners = [
  { name: "NutriLeve", logo: nutrileve, scale: "scale-270" },
  { name: "FitLife", logo: fitlife, scale: "scale-[1.5]" },
  { name: "Juntos na Estrada", logo: juntosnaestrada, scale: "scale-120" },
  { name: "SeguraBank", logo: segurabank, scale: "scale-120" },
  { name: "Clariv Seguros", logo: clarivseguros, scale: "scale-120" },
  { name: "Leve & Bem", logo: leveebemLogo, scale: "scale-70" },
];

const features = [
  {
    icon: LightningIcon,
    title: "Resultados Meteóricos",
    description:
      "Automatize processos e veja seus resultados decolarem em tempo recorde.",
  },
  {
    icon: ChatCircleTextIcon,
    title: "Relacionamento em Órbita",
    description:
      "Acompanhe cada conversa e histórico do cliente em um só lugar — responda mais rápido, com contexto e consistência.",
  },
  {
    icon: GlobeHemisphereWestIcon,
    title: "Expansão Universal",
    description:
      "Escale suas operações para qualquer mercado com nossa infraestrutura global.",
  },
  {
    icon: UsersFourIcon,
    title: "Gestão de Equipes",
    description:
      "Unifique seu time em uma única plataforma — sua central de comando para clientes, oportunidades e metas.",
  },
  {
    icon: ChartBarIcon,
    title: "Analytics Estelares",
    description:
      "Transforme registros do CRM em decisões: use as informações do Atlas6 para acompanhar desempenho e priorizar o que importa.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Segurança Orbital",
    description: "Proteção de nível espacial para todos os seus dados sensíveis.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const floatingIcon = (delay = 0) => ({
  animate: { y: [0, -3, 0] },
  transition: {
    duration: 1.8,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  },
});

function FAQAtlas6() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "O Atlas6 é só para equipes grandes?",
      a: "Não. Ele funciona super bem tanto pra times pequenos quanto pra operações maiores — o ponto é organizar o fluxo e manter histórico + responsabilidade claros.",
    },
    {
      q: "Eu consigo acompanhar oportunidades sem dashboard?",
      a: "Sim. A ideia do Atlas6 é transformar os registros do CRM em visibilidade: etapas, responsáveis, próximos passos e histórico — isso já te dá leitura do que está acontecendo.",
    },
    {
      q: "Dá pra usar com meu processo atual?",
      a: "Dá sim. Você modela etapas e rotinas pra caberem no seu fluxo (e não o contrário). O objetivo é reduzir improviso e aumentar previsibilidade.",
    },
    {
      q: "O Atlas6 ajuda com follow-up e tarefas?",
      a: "Ajuda. Você registra próximos passos e mantém o time alinhado com tarefas e lembretes — sem depender de mensagens soltas ou planilhas paralelas.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-0 sm:px-2 lg:px-0">
      <div className="space-y-4">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-3xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-xl"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <ChatCircleTextIcon
                    size={22}
                    weight="duotone"
                    className="text-primary"
                  />
                  <span className="font-heading text-base sm:text-lg font-semibold text-light">
                    {item.q}
                  </span>
                </div>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-light/80"
                >
                  <CaretDownIcon size={20} weight="bold" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div className="px-5 sm:px-6 pb-6 text-light/80 leading-relaxed text-sm sm:text-base">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AtlasUseCasesCarousel() {
  const slides = [
    {
      tag: "Vendas",
      title: "Funil com clareza de etapa e próximo passo",
      text: "Chega de lead perdido no WhatsApp. No Atlas6 você enxerga onde cada oportunidade está, quem é o responsável e qual é o próximo movimento.",
    },
    {
      tag: "Relacionamento",
      title: "Histórico do cliente em um só lugar",
      text: "Atendimento e comercial falando a mesma língua: contatos, anotações, negociações e decisões ficam registrados e organizados.",
    },
    {
      tag: "Operação",
      title: "Rotina de follow-up sem improviso",
      text: "Cadências e tarefas deixam o time no trilho. Você reduz retrabalho e mantém consistência sem virar refém de planilhas paralelas.",
    },
    {
      tag: "Gestão",
      title: "Visibilidade por informações do CRM",
      text: "Mesmo sem dashboard, dá pra acompanhar o desempenho: volume por etapa, responsáveis, contas paradas e prioridades — tudo pelos registros.",
    },
  ];

  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div className="relative max-w-4xl lg:max-w-5xl 2xl:max-w-6xl mx-auto px-0 sm:px-2 lg:px-0">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary-hover/10 opacity-70" />

        <div className="relative p-6 sm:p-7 md:p-10 lg:p-12">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                <motion.span {...floatingIcon(0.05)}>
                  <QuotesIcon size={22} weight="fill" className="text-primary" />
                </motion.span>
              </div>

              <div>
                <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-light">
                  Casos de uso do Atlas6
                </h3>
                <p className="text-light/65 text-xs sm:text-sm md:text-base">
                  Uma volta rápida do “o que dá pra fazer” na prática.
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="h-11 w-11 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition flex items-center justify-center"
                aria-label="Anterior"
              >
                <CaretLeftIcon size={18} weight="bold" className="text-light" />
              </button>
              <button
                type="button"
                onClick={next}
                className="h-11 w-11 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition flex items-center justify-center"
                aria-label="Próximo"
              >
                <CaretRightIcon size={18} weight="bold" className="text-light" />
              </button>
            </div>
          </div>

          <div className="min-h-47.5 sm:min-h-42.5 md:min-h-37.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative"
              >
                <span className="inline-flex mb-4 text-xs font-semibold px-3 py-1 rounded-full bg-dark/30 text-light border border-white/10">
                  {slides[index].tag}
                </span>

                <h4 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-light leading-tight">
                  {slides[index].title}
                </h4>

                <p className="mt-3 text-light/75 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
                  {slides[index].text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-10 bg-primary" : "w-2.5 bg-white/30"
                  }`}
                  aria-label={`Ir para o slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="h-10 w-10 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition flex items-center justify-center"
                aria-label="Anterior"
              >
                <CaretLeftIcon size={18} weight="bold" className="text-light" />
              </button>
              <button
                type="button"
                onClick={next}
                className="h-10 w-10 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition flex items-center justify-center"
                aria-label="Próximo"
              >
                <CaretRightIcon size={18} weight="bold" className="text-light" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AtlasRolesAndSecurity() {
  const items = [
    {
      icon: UserCircleGearIcon,
      title: "Admin (com CNPJ)",
      desc: "Configura empresa, gerencia usuários, define permissões e controla acesso por perfil.",
    },
    {
      icon: KeyholeIcon,
      title: "Permissões por ação",
      desc: "Controle quem pode ver, criar, editar e excluir registros — evitando bagunça e erro humano.",
    },
    {
      icon: ClipboardTextIcon,
      title: "Rastreabilidade",
      desc: "Histórico e responsabilidade: quem mexeu, quando mexeu e o que mudou — tudo mais fácil de auditar.",
    },
    {
      icon: LockKeyIcon,
      title: "Segurança e privacidade",
      desc: "Proteções para dados sensíveis, garantindo que o time trabalhe com confiança e consistência.",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 sm:mb-14 lg:mb-16"
      >
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-light">
          Perfis, permissões e <span className="text-primary">segurança</span>
        </h2>
        <p className="text-secondary text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mt-3 sm:mt-4">
          Cara de CRM de verdade: cada pessoa acessa o que precisa — e o Atlas6
          mantém controle e consistência.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="relative rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-5 sm:p-6 lg:p-7 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-linear-to-br from-primary/10 to-primary-hover/10" />

              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center mb-4">
                  <motion.span {...floatingIcon(i * 0.06)}>
                    <Icon size={24} weight="duotone" className="text-primary" />
                  </motion.span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-light mb-2">
                  {item.title}
                </h3>
                <p className="text-light/75 leading-relaxed text-sm sm:text-base">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.08 }}
        className="mt-10 sm:mt-12 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-5 sm:p-6 lg:p-7"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {[
            "Admin define regras e acessos",
            "Equipe trabalha com clareza e foco",
            "Menos erro, mais controle do processo",
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircleIcon size={22} weight="fill" className="text-primary" />
              <p className="text-light/90 text-sm sm:text-base">{t}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function VideoCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 xl:py-28 relative overflow-hidden min-h-110 sm:min-h-130 lg:min-h-150 flex items-center">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={ctaVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-dark/70 backdrop-blur-[2px]" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/15 rounded-full blur-[150px] z-10" />

      <div className="container mx-auto relative z-20 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5 sm:mb-6 text-white">
            Pronto para transformar seu negócio?
          </h2>

          <p className="text-white/70 text-base sm:text-lg lg:text-xl mb-7 sm:mb-8 max-w-xl mx-auto px-2 sm:px-0">
            Junte-se a milhares de empresas que já estão navegando para o sucesso com Atlas6.
          </p>

          <Button
            asChild
            variant="cosmic" // REESCRITO: Usando variante cosmic
            size="xl"      
            className="shadow-2xl shadow-primary/50"
          >
            <Link to="/cadastro" className="inline-flex items-center gap-2">
              <motion.span
                className="inline-flex"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" as const }}
              >
                <RocketLaunchIcon size={24} weight="duotone" />
              </motion.span>
              Começar Gratuitamente
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function AtlasAIComingSoon() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary/15 to-primary-hover/10 opacity-80" />

        <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-3xl bg-primary/20 border border-primary/25 flex items-center justify-center">
                <motion.span {...floatingIcon(0.05)}>
                  <SparkleIcon size={26} weight="duotone" className="text-primary" />
                </motion.span>
              </div>

              <div>
                <span className="inline-flex mb-5 text-sm font-semibold px-3 py-1 rounded-full bg-dark/30 text-light border border-white/20">
                Em breve
                </span>

                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-light leading-tight">
                  Conheça seus <span className="text-primary">assistentes de IA</span>
                </h2>

                <p className="mt-4 text-light/75 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                  Descreva o trabalho. Seu assistente de IA personalizado é criado e está
                  pronto para trabalhar <span className="text-primary font-semibold">24 horas por dia</span>.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <div className="rounded-3xl border border-white/10 bg-dark/30 p-5 sm:p-6 w-full lg:w-auto lg:min-w-[320px]">
                <p className="text-light font-semibold">IA Integrada</p>
                <p className="text-light/70 mt-2 text-sm leading-relaxed">
                  Inteligência artificial que aprende e evolui com o seu negócio.
                </p>

                <div className="mt-4 h-px w-full bg-white/10" />

                <div className="mt-4 flex items-center gap-3 text-light/80 text-sm">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Disponível em uma próxima atualização
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 h-px w-2/3 bg-linear-to-r from-primary/60 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}


export default function Home() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      if (usuario.tipo === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/solicitacoes");
      }
    }
  }, [usuario, navigate]);

  if (usuario.token !== "") {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
         <CircleNotchIcon size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative bg-dark text-muted">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={cosmicHero}
            alt=""
            className="absolute inset-0 w-full h-full object-cover brightness-200 contrast-125 saturate-125 bg-dark"
          />
          <div className="w-full h-full object-cover">
            <StarField />
          </div>
          <div className="absolute inset-0 bg-dark/88" />
        </div>

        <div className="absolute top-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-[120px] z-0" />
        <div className="absolute bottom-1/4 left-1/4 w-56 h-56 sm:w-72 sm:h-72 bg-primary-hover/20 rounded-full blur-[100px] z-0" />

        <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-16 sm:py-20 lg:py-24 xl:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl lg:max-w-5xl 2xl:max-w-6xl mx-auto text-center"
          >
           
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-5 sm:mb-6 leading-tight text-light">
              Alcance resultados meteóricos{" "}
              <span className="bg-linear-to-br from-primary to-primary-hover bg-clip-text text-transparent">
                para sua empresa
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-light mb-8 sm:mb-10 max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-0">
              Atlas6 é a plataforma de CRM que transforma a maneira como você
              gerencia clientes, oportunidades e resultados. 
              <br />
              Prepare-se para decolar.
            </p>

            {/* REESCRITO: Bloco de Botões com Variantes do Button.tsx */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="cosmic" // Usando variante cosmic
                  size="xl"       // Usando tamanho XL
                  className="w-full sm:w-auto shadow-xl shadow-primary/20"
                >
                  <Link to="/cadastro" className="flex items-center gap-2">
                    <motion.span
                      animate={{ y: [0, -2, 0] }}
                      transition={{ type: "spring", stiffness: 400, damping: 10, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <RocketLaunchIcon size={24} weight="duotone" />
                    </motion.span>
                    Decolar Agora
                  </Link>
                </Button>
              </motion.div>

              <Button
                asChild
                variant="outline"
                size="xl"
                // Estilo custom "Glass" para o botão secundário
                className="w-full sm:w-auto border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/20 backdrop-blur-sm transition-all"
              >
                <Link to="/solucoes" className="flex items-center gap-2">
                  Explorar Soluções
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRightIcon size={20} weight="bold" />
                  </motion.span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-12 sm:py-16 lg:py-20 border-y border-muted/20 bg-light/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <p className="text-center text-dark mb-8 sm:mb-12 font-bold text-base sm:text-lg lg:text-xl px-2 sm:px-0">
            Entre nossos clientes estão empresas da Fortune Global 500.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-10 lg:gap-12 place-items-center">
            {partners.map((partner, i) => (
              <div
                key={i}
                className="w-44 sm:w-52 md:w-56 h-16 sm:h-18 md:h-20 flex items-center justify-center"
              >
                <img
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  className={`max-h-full w-auto max-w-full object-contain ${partner.scale}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl mb-10 sm:mb-14 lg:mb-16"
          >
            <motion.img
              src={featureBg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              animate={{
                scale: [1.05, 1.08, 1.05],
                x: [0, -18, 0],
                y: [0, 10, 0],
                rotate: [0, 1, 0],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-dark/80" />
            <div className="relative p-7 sm:p-10 md:p-14 lg:p-16">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-light leading-tight">
                Recursos que impulsionam seu{" "}
                <span className="text-primary">crescimento</span>
              </h2>
              <p className="mt-3 sm:mt-4 text-light/70 text-sm sm:text-base md:text-lg max-w-2xl">
                Ferramentas poderosas projetadas para elevar sua empresa ao próximo nível.
              </p>
              <div className="mt-6 sm:mt-8 h-px w-2/3 bg-linear-to-r from-primary/60 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group relative p-5 sm:p-6 lg:p-7 rounded-2xl bg-light/70 border border-muted/20 hover:border-primary/50 transition-all duration-300 shadow-sm"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 bg-linear-to-br from-primary/5 to-primary-hover/5" />

                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <motion.span {...floatingIcon(i * 0.08)} className="inline-flex">
                        <Icon size={24} weight="duotone" className="text-primary-hover" />
                      </motion.span>
                    </div>

                    <h3 className="font-heading text-lg sm:text-xl font-semibold text-dark mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-dark text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* IA (EM BREVE) */}
      <section className="py-16 sm:py-20 lg:py-24 border-t border-muted/15">
        <AtlasAIComingSoon />
      </section>

      {/* CARROSSEL */}
      <section className="py-16 sm:py-20 lg:py-24 border-t border-muted/15">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <AtlasUseCasesCarousel />
        </div>
      </section>

      {/* PERMISSÕES */}
      <section className="py-16 sm:py-20 lg:py-24 border-t border-muted/15">
        <AtlasRolesAndSecurity />
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 border-t border-muted/15">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 sm:mb-14 lg:mb-16"
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-light">
              Dúvidas frequentes sobre o <span className="text-primary">Atlas6</span>
            </h2>
            <p className="text-secondary text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mt-3 sm:mt-4 px-2 sm:px-0">
              Respostas rápidas pra você entender como o CRM se encaixa no seu dia a dia.
            </p>
          </motion.div>

          <FAQAtlas6 />
        </div>
      </section>

      {/* VÍDEO CTA */}
      <VideoCTA />
    </div>
  );
}