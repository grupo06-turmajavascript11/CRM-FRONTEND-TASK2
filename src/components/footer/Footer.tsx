import { Link } from "react-router-dom";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  InstagramLogoIcon,
  EnvelopeIcon,
} from "@phosphor-icons/react";

import Logo from "@/assets/logo.svg";

function Footer() {
  return (
    <footer className="
        bg-white dark:bg-gray-900
        border-t border-gray-200 dark:border-gray-700
        text-gray-800 dark:text-gray-100
        py-12 transition-colors duration-300
      ">

      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
                <img src={Logo} alt="Logo" className="p-1" />
              </div>
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                CRM Atlas 6
              </span>
            </div>

            <p className="
              text-sm leading-relaxed mb-6
              text-gray-600 dark:text-gray-300
            ">
              Impulsionando negócios na velocidade da luz. O CRM do futuro está aqui.
            </p>

            <div className="flex gap-4">
              {[LinkedinLogoIcon, GithubLogoIcon, InstagramLogoIcon].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="
                      w-10 h-10 rounded-full flex items-center justify-center
                      bg-gray-100 dark:bg-gray-800
                      text-gray-700 dark:text-gray-300
                      hover:bg-violet-600 hover:text-white
                      transition-all duration-300
                    "
                  >
                    <Icon size={22} weight="fill" />
                  </a>
                )
              )}
            </div>
          </div>

          
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              Acesso Rápido
            </h3>

            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>
                <Link to="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/solucoes" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Soluções
                </Link>
              </li>
              <li>
                <Link to="/sobre-nos" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Entrar / Cadastrar
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              Institucional
            </h3>

            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>
                <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Política de Privacidade
                </a>
              </li>

              <li className="flex items-center gap-2 mt-4">
                <EnvelopeIcon size={20} className="text-violet-600 dark:text-violet-400" />
                <span>contato@crmatlas6.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        
        <div className="
          border-t pt-8 mt-8
          border-gray-200 dark:border-gray-700
          flex flex-col md:flex-row items-center justify-between
          text-gray-600 dark:text-gray-300
        ">
          <p className="text-sm">
            © 2026 CRM Atlas 6 - Generation Brasil. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-2 mt-4 md:mt-0 text-sm">
            <span>Desenvolvido com 💙 pelo Grupo 6</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;