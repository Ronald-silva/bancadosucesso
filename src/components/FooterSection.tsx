import { Mail, Phone, MapPin, Instagram, Facebook, Clock } from "lucide-react";
import logoImg from "@/assets/logo-banca-sucesso.jpg";

const FooterSection = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logoImg} 
                alt="Banca do Sucesso Home Center" 
                className="w-14 h-14 rounded-full object-cover"
              />
              <h3 className="font-display font-bold text-2xl">
                Banca do <span className="text-secondary">Sucesso</span>
              </h3>
            </div>
            <p className="text-primary-foreground/80 max-w-md font-body mb-6">
              Há mais de 10 anos transformando a experiência de compra online no Brasil. 
              Sua satisfação é nossa prioridade.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">contato@bancadosucesso.com</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+55 (91) 8275-0788</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-primary-foreground/80">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span className="text-sm">Tv. Frutuoso Guimarães, 110 - Campina, Belém - PA, 66013-010, Brasil</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2 text-primary-foreground/80">
                  <Clock className="w-4 h-4 mt-0.5" />
                  <span className="text-sm">Seg a Sex: 08:00 - 18:00</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Links Úteis</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  Trocas e Devoluções
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/60">
            © 2024 Banca do Sucesso. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
