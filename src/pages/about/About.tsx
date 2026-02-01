import { teamMembers, clients } from "../../data/Team";
import {
  Target,
  Eye,
  Diamond,
  LinkedinLogo,
  GithubLogo,
} from "phosphor-react";
import { useState} from "react";

export default function SobreNos() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

const prev = () => {
  setActiveIndex((prev) =>
    (prev - 1 + clients.length) % clients.length
  );
};

const next = () => {
  setActiveIndex((prev) =>
    (prev + 1) % clients.length
  );
};

  return (
    <div className="min-h-screen font-sans bg-dark text-light">
      {/* HERO */}
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
      src="https://ik.imagekit.io/k8aunjtbla/WhatsApp%20Video%202026-01-31%20at%2000.12.29%20(1).mp4?updatedAt=1769829318628"
      type="video/mp4"
    />
  </video>

  {/* OVERLAY DE CONTRASTE */}
  <div className="absolute inset-0 z-10 bg-linear-to-b from-dark/80 via-dark/60 to-dark/90" />

  {/* CONTEÚDO */}
  <div className="relative z-20 container px-4">
    <div className="text-center max-w-3xl mx-auto">

      <div className="mb-14">
        <h1 className="text-3xl sm:text-3xl font-heading font-bold mb-4 text-primary">
          Sobre nós
        </h1>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-8 leading-tight">

        <span className="relative inline-block mb-6">
          <span className="relative text-light">
            Atlas 6
          </span>
          <span className="absolute left-0 -bottom-2 w-full h-1 bg-primary rounded-full" />
        </span>

        <span className="block text-xl sm:text-2xl md:text-3xl font-medium mt-6">
          Somos um CRM para{" "}
          <span className="text-primary font-semibold">
            Gestão de Seguros
          </span>
        </span>

        <span className="block text-xl sm:text-2xl md:text-3xl font-medium mt-2">
          criado para transformar dados em decisões estratégicas
        </span>
      </h1>

      {/* FAIXA HORIZONTAL */}
<div className="relative left-1/2 -translate-x-1/2 w-screen mt-16">
  <div className="bg-secondary/20 backdrop-blur-md py-8 px-8">
    <p className="text-center text-base sm:text-lg text-muted font-medium max-w-5xl mx-auto">
        A passagem do 3I/ATLAS pelo Sistema Solar interno simbolizou um momento raro.
        <br />
        O Atlas 6 nasceu exatamente nesse espírito: uma oportunidade única para apoiar 
        <br />
        decisões estratégicas e conduzir negócios a um crescimento estruturado e duradouro.
    </p>
  </div>
</div>

    </div>
  </div>
</section>

      {/* CONCEITO */}
{/* CONCEITO */}
<section className="py-24 relative overflow-hidden">

  {/* Fundo sutil */}
  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_30%,transparent_70%,rgba(255,255,255,0.02))]" />

  <div className="container mx-auto px-4 relative z-10">

    {/* Header */}
    <div className="text-center max-w-2xl mx-auto mb-20">
      <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
        O que é um <span className="text-primary">CRM?</span>
      </h2>
      <p className="text-secondary">
        Do conceito à aplicação prática no setor de seguros.
      </p>
    </div>

    {/* Conteúdo */}
    <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-stretch">

      {/* Linha central */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-44 bg-linear-to-b from-transparent via-primary/40 to-transparent" />

      {/* Nó central */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_20px_rgba(124,58,237,0.8)]" />
      </div>

      {/* Card 1 */}
      <div className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10
        transition-all duration-300 ease-out hover:border-primary/30">

        <span className="text-light text-sm font-semibold tracking-wide uppercase mb-2 block">
          Conceito
        </span>

        <div className="w-12 h-px bg-primary/40 mb-6" />

        <p className="text-muted text-justify leading-relaxed text-lg">
          CRM (Customer Relationship Management) é um sistema voltado para a 
          gestão do relacionamento com clientes. Ele centraliza informações, 
          histórico de interações e oportunidades comerciais.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10
        transition-all duration-300 ease-out hover:border-primary/30 md:translate-y-6">

        <span className="text-light text-sm font-semibold tracking-wide uppercase mb-2 block">
          Aplicação
        </span>

        <div className="w-12 h-px bg-primary/40 mb-6" />

        <p className="text-muted text-justify leading-relaxed text-lg">
          No setor de seguros, nosso CRM atende necessidades específicas como 
          controle de propostas, contratos, gestão de renovações e organização 
          do relacionamento comercial de forma segura.
        </p>
      </div>

    </div>
  </div>
</section>

 
{/* PILARES */}
<section className="py-28 text-light relative overflow-hidden">

  {/* Glow de fundo */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_60%)]" />

  <div className="container mx-auto px-4 relative z-10">

    {/* Heading */}
    <div className="text-center max-w-2xl mx-auto mb-20">
      <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
        Nossos <span className="text-primary">Pilares</span>
      </h2>
      <p className="text-secondary text-lg">
        Conheça o que guia nossa empresa e nossas decisões no dia a dia.
      </p>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-10">
      {[{
        icon: <Target size={32} className="text-white" />,
        title: "Missão",
        text: "Apoiar decisões estratégicas no momento certo, com clareza e direção.",
      },{
        icon: <Eye size={32} className="text-white" />,
        title: "Visão",
        text: "Ser referência em CRM para seguros, impulsionando crescimento sustentável.",
      },{
        icon: <Diamond size={32} className="text-white" />,
        title: "Valores",
        text: "Transparência, inovação contínua e compromisso com resultados consistentes.",
      }].map((item, i) => (
        <div
          key={i}
          className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-white/20 text-center
            transition-all duration-300 ease-out
            hover:-translate-y-2 hover:rotate-[0.3deg]
            hover:shadow-[0_25px_80px_rgba(124,58,237,0.35)]"
        >

          {/* Ícone */}
          <div className="relative mb-6 flex justify-center">
            <div className="absolute inset-0 blur-xl bg-primary/30 rounded-full" />
            <div className="relative bg-linear-to-br from-primary to-violet-400 p-4 rounded-full inline-flex">
              {item.icon}
            </div>
          </div>

          <h3 className="text-xl font-heading font-bold mb-3">
            {item.title}
          </h3>

          <p className="text-muted leading-relaxed">
            {item.text}
          </p>

        </div>
      ))}
    </div>

  </div>
</section>

{/* ATLAS 6 — NÚMEROS */}
<section className="py-14">
  <div className="max-w-7xl mx-auto px-6">

    <div
  className="bg-linear-to-r from-primary/45 to-primary-hover/45 backdrop-blur-sm
  rounded-2xl px-12 py-10 text-white border border-white/10 shadow-[0_10px_28px_rgba(0,0,0,0.35)]">

      {/* Título */}
      <h2 className="text-2xl sm:text-3xl font-heading font-semibold mb-10 text-center tracking-tight">
        Atlas 6 <span className="opacity-70">em números</span>
      </h2>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">

        <div>
          <span className="text-3xl font-semibold">2025</span>
          <p className="mt-1 text-white/70 text-xs">
            Plataforma lançada
          </p>
        </div>

        <div className="hidden lg:block w-px bg-white/20 mx-auto" />

        <div>
          <span className="text-3xl font-semibold">+50</span>
          <p className="mt-1 text-white/70 text-xs">
            Empresas em implantação
          </p>
        </div>

        <div className="hidden lg:block w-px bg-white/20 mx-auto" />

        <div>
          <span className="text-3xl font-semibold">+5k</span>
          <p className="mt-1 text-white/70 text-xs">
            Processos analisados
          </p>
        </div>

        <div className="hidden lg:block w-px bg-white/20 mx-auto" />

        <div>
          <span className="text-3xl font-semibold">98%</span>
          <p className="mt-1 text-white/70 text-xs">
            Confiabilidade operacional
          </p>
        </div>

        <div className="hidden lg:block w-px bg-white/20 mx-auto" />

        <div>
          <span className="text-3xl font-semibold">24/7</span>
          <p className="mt-1 text-white/70 text-xs">
            Monitoramento estratégico
          </p>
        </div>

      </div>
    </div>
  </div>
</section>


{/* FEEDBACKS */}
<section className="py-16 bg-dark text-light overflow-hidden">
  <div className="container mx-auto px-4 relative">

    {/* Header */}
    <div className="text-center max-w-2xl mx-auto mb-16">
      <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
        O que dizem <span className="text-primary">sobre nós</span>
      </h2>
      <p className="text-secondary text-lg">
        Feedback real de quem já transformou sua gestão com o Atlas 6.
      </p>
    </div>

    {/* Carousel */}
    <div className="relative max-w-6xl mx-auto flex items-center justify-center h-80">

      {clients.map((client, index) => {
        const offset = index - activeIndex;

        return (
          <div
          key={client.id}
          className={`relative w-72 h-72 perspective-[1000px]

              transition-all duration-500
              ${offset === 0
                ? "z-20 scale-100"
                : "z-10 scale-95 opacity-40"
              }`}
          >
            {/* Card rotacionável */}
            <div
            className={`relative w-full h-full transition-transform duration-700 transform-3d
            ${offset === 0 ? "rotate-y-180" : ""}`}>


              {/* FRENTE */}
              <div
                className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 via-white/5 border border-white/10
                flex flex-col items-center justify-center backface-hidden p-6 text-center">

                <img
                  src={client.image}
                  alt={client.company}
                  className="w-16 h-16 rounded-full mb-4 border-2 border-white/20"/>

                <h3 className="text-lg font-heading font-bold">
                  {client.company}
                </h3>

                <span className="mt-2 text-xs text-white/50">
                  Passe o mouse para ler
                </span>
              </div>

              {/* VERSO */}
              <div
                className="absolute inset-0 rounded bg-linear-to-br from-primary/40 to-violet-600/50 border border-primary/40
                flex items-center justify-center backface-hidden rotate-y-180 p-6 text-center">

                <p className="text-sm italic leading-relaxed text-white">
                  “{client.feedback}”
                </p>
              </div>

            </div>
          </div>
        );
      })}

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-0 text-4xl text-white/40 hover:text-primary transition"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute right-0 text-4xl text-white/40 hover:text-primary transition"
      >
        ›
      </button>

    </div>
  </div>
</section>


{/* Divider */}
<div className="w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

{/* EQUIPE */}
<section className="py-24 bg-dark">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-heading font-bold mb-4 text-white">
        Conheça nossa <span className="text-primary">tripulação</span>
      </h2>
      <p className="text-white/70 max-w-xl mx-auto">
        Desenvolvedores apaixonados por tecnologia, unidos pelo propósito de criar soluções que transformam.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {teamMembers.map((member) => (
        <div
  key={member.id}
  className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 text-center transition-all duration-300
    hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_25px_60px_rgba(124,58,237,0.35)]">

  {/* Faixa roxa */}
<div className="h-16 bg-linear-to-r from-primary-hover" />

      <img
  src={member.image}
  alt={member.name}
  className="relative -mt-10 w-20 h-20 mx-auto rounded-full object-cover border-4 border-dark
    ring-4 ring-primary/40 transition-transform duration-300 group-hover:scale-105"/>

<div className="px-4 pb-6 pt-3">
  <h3 className="text-xl font-heading font-bold text-white mb-1">
    {member.name}
  </h3>

  <p className="text-primary text-sm font-medium mb-6">
    {member.role}
  </p>

  <div className="flex justify-center gap-4">
    <a
      href={member.linkedin}
      target="_blank"
      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/60
        hover:bg-primary hover:text-white  transition" >
      <LinkedinLogo size={18} />
    </a>

    <a
      href={member.github}
      target="_blank"
      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/60
        hover:bg-primary hover:text-white transition">
      <GithubLogo size={18} />
    </a>
  </div>
</div>
</div>

      ))}
    </div>
  </div>
</section>

    </div>
  );
}
