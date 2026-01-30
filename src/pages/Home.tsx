import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Rocket,
  Zap,
  Globe,
  Users,
  BarChart3,
  Shield,
  ArrowRight,
  Star,
  Sparkles,
} from "lucide-react";
import { StarField } from "../components/ui/StarField";
import { Button } from "../components/ui/button";
import cosmicHero from "../assets/cosmic-hero.jpg";

import nutrileve from "@/assets/partners/nutrileve.png";
import fitlife from "@/assets/partners/fitlife.png";
import juntosnaestrada from "@/assets/partners/juntos-na-estrada.jpg";
import segurabank from "@/assets/partners/segurabank.jpeg";
import clarivseguros from "@/assets/partners/clarivseguros.jpeg";
import leveebemLogo from "@/assets/partners/leveebemLogo.png";

const partners = [
  { name: "NutriLeve", logo: nutrileve, scale: "scale-250" },
  { name: "FitLife", logo: fitlife, scale: "scale-[1.5]" },
  { name: "Juntos na Estrada", logo: juntosnaestrada, scale: "scale-100" },
  { name: "SeguraBank", logo: segurabank, scale: "scale-100" },
  { name: "Clary Seguros", logo: clarivseguros, scale: "scale-100" },
  { name: "Leve & Bem", logo: leveebemLogo, scale: "scale-60" },
];

const features = [
  {
    icon: Zap,
    title: "Resultados Meteóricos",
    description:
      "Automatize processos e veja seus resultados decolarem em tempo recorde.",
  },
  {
    icon: Globe,
    title: "Expansão Universal",
    description:
      "Escale suas operações para qualquer mercado com nossa infraestrutura global.",
  },
  {
    icon: Users,
    title: "Gestão de Equipes",
    description: "Unifique sua tripulação em uma única plataforma colaborativa.",
  },
  {
    icon: BarChart3,
    title: "Analytics Estelares",
    description:
      "Dashboards inteligentes que revelam insights do universo dos seus dados.",
  },
  {
    icon: Shield,
    title: "Segurança Orbital",
    description: "Proteção de nível espacial para todos os seus dados sensíveis.",
  },
  {
    icon: Sparkles,
    title: "IA Integrada",
    description: "Inteligência artificial que aprende e evolui com o seu negócio.",
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

export default function Home() {
  return (
    <div className="relative bg-light text-dark">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-b from-light via-light/90 to-light z-10" />
          <img
            src={cosmicHero} 
            alt=""
            className="w-full h-full object-cover brightness-220 contrast-300 saturate-220"
          />
          <div className="hidden sm:block">
            <StarField />
          </div>
        </div>

        {/* Glow blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] z-0" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-primary-hover/20 rounded-full blur-[100px] z-0" />

        <div className="container relative z-10 px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                O futuro do CRM chegou
              </span>
            </motion.div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Alcance resultados meteóricos{" "}
              <span className="bg-linear-to-br from-primary to-primary-hover bg-clip-text text-transparent">
                para sua empresa
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-secondary mb-10 max-w-2xl mx-auto">
              Atlas6 é a plataforma de CRM que transforma a maneira como você
              gerencia clientes, oportunidades e resultados. Prepare-se para
              decolar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  className="h-12 px-8 rounded-xl bg-primary text-white hover:bg-primary-hover transition shadow-sm"
                >
                  <Link to="/registro" className="inline-flex items-center">
                    <Rocket className="h-5 w-5 mr-2" />
                    Decolar Agora
                  </Link>
                </Button>
              </motion.div>

              <Button
                asChild
                className="h-12 px-8 rounded-xl border border-muted/40 text-dark hover:bg-dark/5 transition bg-transparent"
              >
                <Link to="/solucoes" className="inline-flex items-center">
                  Explorar Soluções
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-muted/40 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Partners Section */}
      <section className="py-16 border-y border-muted/20 bg-light">
        <div className="container px-70">
          <p className="text-center text-secondary mb-15 font-medium text-xl">
            Algumas “empresas da Fortune Global 500” que já são nossas clientes…
          </p>
         
        <div className="grid grid-cols-3 sm:grid-cols-10 lg:grid-cols-6 gap-40 place-items-center">
        {partners.map((partner, i) => (
        <div
            key={i}
            className="w-52 sm:w-56 md:w-64 h-20 sm:h-22 md:h-24 flex items-center justify-center"
        >
        <img
        src={partner.logo}
        alt={`Logo ${partner.name}`}
        className={`max-h-full w-auto max-w-full object-contain ${partner.scale} opacity-200 hover:opacity-200 transition`}
        loading="lazy"
        />
        </div>
      ))}
    </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Recursos que impulsionam seu{" "}
              <span className="bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                crescimento
              </span>
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Ferramentas poderosas projetadas para elevar sua empresa ao próximo
              nível.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative p-6 rounded-2xl bg-white border border-muted/20 hover:border-primary/50 transition-all duration-300 shadow-sm"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 bg-linear-to-br from-primary/5 to-primary-hover/5" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="font-heading text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-secondary">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-primary-hover/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/15 rounded-full blur-[150px]" />

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Pronto para transformar seu negócio?
            </h2>

            <p className="text-secondary text-lg mb-8 max-w-xl mx-auto">
              Junte-se a milhares de empresas que já estão navegando para o
              sucesso com Atlas6.
            </p>

            <Button
              asChild
              className="h-12 px-8 rounded-xl bg-primary text-white hover:bg-primary-hover transition"
            >
              <Link to="/registro" className="inline-flex items-center">
                <Rocket className="h-5 w-5 mr-2" />
                Começar Gratuitamente
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
