import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 tracking-tight">
        About Us
      </h1>

      {/* Text Content */}
      <div className="space-y-6 text-base sm:text-lg leading-relaxed text-primary-600 max-w-3xl mx-auto">
        <p>
          Hey there! I’m <strong>Kaique Ferraz</strong>, a passionate Fullstack
          Developer from São Paulo, Brazil. I love building sleek and modern web
          experiences that feel intuitive and polished.
        </p>

        <p>
          This e-commerce project — inspired by Nike’s UI/UX — is my way of
          pushing myself as a developer and exploring real-world commerce flows
          with authentication, cart management and a custom backend. From
          product browsing to simulated orders and user profiles, everything
          here is crafted with performance and user experience in mind.
        </p>

        <p>
          I built this store using <strong>Next.js</strong>,{" "}
          <strong>Supabase</strong>, <strong>NextAuth</strong>, and{" "}
          <strong>Tailwind CSS</strong>, emphasizing scalability, clean
          architecture and mobile-first design principles.
        </p>

        <p>
          If you want to explore the code, collaborate, or just connect — feel
          free to reach out through any of the platforms below.
        </p>
      </div>

      {/* Social Links */}
      <div className="mt-12 sm:mt-16">
        <h2 className="text-lg sm:text-xl font-semibold text-center mb-6 tracking-wide">
          Connect With Me
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
            Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
