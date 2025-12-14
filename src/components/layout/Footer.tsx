import { Link } from "react-router-dom";
import { Droplets, Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Droplets className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">Szőke</span>
                <span className="text-xs text-primary font-medium -mt-1">
                  Wash & Detailing
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Prémium autókozmetikai szolgáltatások, ahol minden részlet számít.
              Autója megérdemli a legjobbat.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">
              Navigáció
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Főoldal" },
                { href: "/szolgaltatasok", label: "Szolgáltatások" },
                { href: "/galeria", label: "Galéria" },
                { href: "/rolunk", label: "Rólunk" },
                { href: "/kapcsolat", label: "Kapcsolat" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">
              Szolgáltatások
            </h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground text-sm">Külső mosás és polírozás</li>
              <li className="text-muted-foreground text-sm">Belső takarítás</li>
              <li className="text-muted-foreground text-sm">Fényezésvédelem</li>
              <li className="text-muted-foreground text-sm">Komplett detailing</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">
              Elérhetőség
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+36 XX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@szokewash.hu</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>1234 Budapest, Példa utca 12.</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span>H-P: 8:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Szőke Wash & Detailing. Minden jog fenntartva.
            </p>
            <p className="text-muted-foreground text-xs">
              Készítette: Lovable
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;