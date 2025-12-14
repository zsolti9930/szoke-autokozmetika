import { Car, Sparkles, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const services = [
  {
    icon: Car,
    title: "Külső mosás és polírozás",
    description: "Professzionális külső tisztítás és polírozás a tökéletes fényért. Eltávolítjuk a szennyeződéseket, oxidációt és visszaadjuk autója eredeti ragyogását.",
    features: [
      "Kézi mosás prémium termékekkel",
      "Felni és gumiabroncs tisztítás",
      "Polírozás és waxolás",
      "Üvegkezelés",
      "Gumik és műanyagok ápolása",
    ],
    price: "Ártól: XX.XXX Ft",
  },
  {
    icon: Sparkles,
    title: "Belső takarítás",
    description: "Alapos belső tisztítás a legrejtettebb zugokig. Bőrápolás, szövetkárpit mélytisztítás és teljes szagtalanítás professzionális berendezésekkel.",
    features: [
      "Porszívózás és portörlés",
      "Bőrülés tisztítás és ápolás",
      "Szövetkárpit mélytisztítás",
      "Műszerfal és konzol tisztítás",
      "Ózonos szagtalanítás",
    ],
    price: "Ártól: XX.XXX Ft",
  },
  {
    icon: Shield,
    title: "Fényezésvédelem",
    description: "Hosszútávú védelem autója fényezésének. Kerámia bevonat, PPF fólia és egyéb védőrétegek a karcok, UV sugárzás és időjárás ellen.",
    features: [
      "Kerámia bevonat",
      "PPF védőfólia",
      "Nano bevonat",
      "Karceltávolítás",
      "Fényezéskorrekció",
    ],
    price: "Ártól: XX.XXX Ft",
  },
];

const Szolgaltatasok = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Szolgáltatásaink
            </h1>
            <p className="text-lg text-muted-foreground">
              Prémium autókozmetikai szolgáltatások, ahol minden részlet számít.
              Válassza ki az Önnek megfelelő csomagot.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`flex flex-col ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-8 lg:gap-16 items-center`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                      {service.title}
                    </h2>
                  </div>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <p className="text-2xl font-bold text-primary mb-4">
                      {service.price}
                    </p>
                    <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link to="/kapcsolat">Időpontfoglalás</Link>
                    </Button>
                  </div>
                </div>

                {/* Visual Card */}
                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-card to-muted border border-border flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                    <service.icon className="w-24 h-24 text-primary/20" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border">
                        <p className="text-sm text-muted-foreground text-center">
                          Helyőrző kép - cserélje ki valódi fotóra
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Egyedi igény? Kérjen árajánlatot!
            </h2>
            <p className="text-muted-foreground text-lg">
              Ha speciális szolgáltatásra van szüksége, vagy egyedi csomagot szeretne, 
              keressen minket bizalommal!
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/kapcsolat">Kapcsolatfelvétel</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Szolgaltatasok;