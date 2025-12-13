import { Mail, Phone, MapPin, Clock } from "lucide-react";
import logoImg from "@/assets/logo-banca-sucesso.jpg";

const FooterSection = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logoImg} 
                alt="Banca do Sucesso Home Center" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-lg">
                Banca do Sucesso
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm max-w-xs">
              Há mais de 10 anos transformando a experiência de compra online no Brasil.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contato@bancadosucesso.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+55 (91) 8275-0788</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Tv. Frutuoso Guimarães, 110 - Campina, Belém - PA</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Seg a Sex: 08:00 - 18:00</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-4">Links úteis</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Trocas e Devoluções
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-sm text-primary-foreground/50">
            © 2024 Banca do Sucesso. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
