import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, MessageCircle } from "lucide-react";
import logoImg from "@/assets/logo-banca-sucesso.jpg";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Banca do Sucesso"
                className="w-12 h-12 rounded-full object-cover border-2 border-secondary"
              />
              <div>
                <span className="font-bold text-lg block text-background">
                  Banca do Sucesso
                </span>
                <span className="text-xs text-background/60">Home Center</span>
              </div>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed">
              Há mais de 10 anos oferecendo os melhores produtos para sua casa e construção com preços imbatíveis.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-secondary flex items-center justify-center transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-background group-hover:text-secondary-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-secondary flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-background group-hover:text-secondary-foreground" />
              </a>
              <a
                href="https://wa.me/559182750788"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-success flex items-center justify-center transition-colors group"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-background group-hover:text-success-foreground" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:contato@bancadosucesso.com"
                  className="flex items-start gap-3 text-background/70 hover:text-secondary transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>contato@bancadosucesso.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+559182750788"
                  className="flex items-start gap-3 text-background/70 hover:text-secondary transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>+55 (91) 8275-0788</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Tv. Frutuoso Guimarães, 110<br />Campina, Belém - PA</span>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block">Seg-Sex: 08:00–18:00</span>
                  <span>Sáb: 08:00–16:00</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-background/70 hover:text-secondary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="text-background/70 hover:text-secondary transition-colors">
                  Nossos Produtos
                </Link>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-secondary transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-secondary transition-colors">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background/70 hover:text-secondary transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-secondary transition-colors">
                  Trocas e Devoluções
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-secondary transition-colors">
                  Formas de Pagamento
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-secondary transition-colors">
                  Prazo de Entrega
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-xs md:text-sm text-background/50">
              © {currentYear} Banca do Sucesso. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 text-xs text-background/40">
              <span>CNPJ: XX.XXX.XXX/0001-XX</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
