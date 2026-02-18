import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 tracking-tight">
        Sobre mim
      </h1>

      {/* Text Content */}
      <div className="space-y-6 text-base sm:text-lg leading-relaxed text-primary-600 max-w-3xl mx-auto">
        <p>
          Olá! Eu sou <strong>Kaique Ferraz</strong>, desenvolvedor Fullstack
          baseado em São Paulo, Brasil, com experiência na construção de
          aplicações web escaláveis e centradas no usuário. Tenho paixão por
          criar experiências digitais modernas, intuitivas e de alto desempenho.
        </p>

        <p>
          Este projeto de e-commerce, inspirado no design da Nike, é um exemplo
          do meu trabalho em end-to-end development. Ele inclui autenticação de
          usuários, gerenciamento de carrinho, backend customizado, catálogo de
          produtos, pedidos simulados e perfis de usuário — tudo pensado para
          performance, escalabilidade e experiência do usuário.
        </p>

        <p>
          Para construir esta loja, utilizei tecnologias como{" "}
          <strong>Next.js</strong>, <strong>Supabase</strong>,{" "}
          <strong>NextAuth</strong> e <strong>Tailwind CSS</strong>. O foco foi
          aplicar boas práticas de arquitetura, design mobile-first e integração
          de sistemas, garantindo código limpo e de fácil manutenção.
        </p>

        <p>
          Estou sempre aberto a explorar novas oportunidades, colaborar em
          projetos desafiadores ou compartilhar conhecimento. Sinta-se à vontade
          para conferir meu código, portfólio e conectar-se comigo nas
          plataformas abaixo.
        </p>
      </div>

      {/* Social Links */}
      <div className="mt-12 sm:mt-16">
        <h2 className="text-lg sm:text-xl font-semibold text-center mb-6 tracking-wide">
          Conecte-se comigo
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <Link
            href="https://github.com/KaiqueFj"
            target="_blank"
            className="w-full sm:w-auto flex justify-center items-center gap-3 px-6 py-3 border rounded-lg hover:bg-black hover:text-white transition-all duration-300"
          >
            <FaGithub size={20} />
            GitHub
          </Link>

          <Link
            href="https://www.linkedin.com/in/kaique-ferraz-f/"
            target="_blank"
            className="w-full sm:w-auto flex justify-center items-center gap-3 px-6 py-3 border rounded-lg hover:bg-black hover:text-white transition-all duration-300"
          >
            <FaLinkedin size={20} />
            LinkedIn
          </Link>

          <Link
            href="https://kaique-fj.netlify.app/"
            target="_blank"
            className="w-full sm:w-auto flex justify-center items-center gap-3 px-6 py-3 border rounded-lg hover:bg-black hover:text-white transition-all duration-300"
          >
            <FiGlobe size={20} />
            Portfólio
          </Link>
        </div>
      </div>
    </div>
  );
}
