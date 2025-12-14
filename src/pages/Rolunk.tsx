import { Award, Users, Clock, ThumbsUp } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { icon: Users, value: "500+", label: "Elégedett ügyfél" },
  { icon: Award, value: "5+", label: "Év tapasztalat" },
  { icon: Clock, value: "1000+", label: "Elvégzett munka" },
  { icon: ThumbsUp, value: "100%", label: "Ügyfél elégedettség" },
];

const values = [
  {
    title: "Minőség",
    description: "Csak a legjobb termékeket és eszközöket használjuk, mert autója megérdemli a legjobbat.",
  },
  {
    title: "Precizitás",
    description: "Minden részletre odafigyelünk, mert a tökéletesség a részletekben rejlik.",
  },
  {
    title: "Megbízhatóság",
    description: "Időben és a megbeszéltek szerint dolgozunk, mert tiszteljük az Ön idejét.",
  },
  {
    title: "Szenvedély",
    description: "Az autók iránti szenvedélyünk hajtja munkánkat minden egyes napon.",
  },
];

const Rolunk = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Rólunk
            </h1>
            <p className="text-lg text-muted-foreground">
              Ismerje meg a Szőke Wash & Detailing csapatát és filozófiáját.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                A történetünk
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A Szőke Wash & Detailing az autók iránti szenvedélyből született. 
                  Célunk, hogy minden ügyfél autója olyan állapotban hagyja el műhelyünket, 
                  mintha most gurult volna le a gyártósorról.
                </p>
                <p>
                  Több éves tapasztalattal és folyamatos fejlődéssel a legmodernebb 
                  technikákat és prémium termékeket használjuk. Legyen szó egyszerű 
                  mosásról vagy komplett detailingről, minden munkát ugyanazzal az 
                  odafigyeléssel és szenvedéllyel végzünk.
                </p>
                <p>
                  Büszkék vagyunk arra, hogy ügyfeleink visszatérnek hozzánk, és 
                  ajánlják szolgáltatásainkat másoknak is. Ez a legnagyobb elismerés, 
                  amit kaphatunk.
                </p>
              </div>
            </div>
            
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-card to-muted border border-border flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <p className="text-muted-foreground text-sm text-center px-4">
                Helyőrző kép - cserélje ki csapatfotóra vagy műhely képre
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Értékeink
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ezek az alapelvek vezetnek minket minden munkánk során
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
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
              Dolgozzunk együtt!
            </h2>
            <p className="text-muted-foreground text-lg">
              Bízza ránk autója ápolását és tapasztalja meg a különbséget!
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

export default Rolunk;