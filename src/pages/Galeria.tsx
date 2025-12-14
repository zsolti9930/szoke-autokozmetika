import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const galleryItems = [
  { id: 1, category: "kulso", title: "BMW 5-ös sorozat - Külső polírozás" },
  { id: 2, category: "kulso", title: "Mercedes E-osztály - Teljes külső" },
  { id: 3, category: "belso", title: "Audi A6 - Belső mélytisztítás" },
  { id: 4, category: "belso", title: "VW Passat - Bőrápolás" },
  { id: 5, category: "vedelem", title: "Porsche 911 - Kerámia bevonat" },
  { id: 6, category: "vedelem", title: "Tesla Model 3 - PPF fólia" },
  { id: 7, category: "kulso", title: "Range Rover - Komplett detailing" },
  { id: 8, category: "belso", title: "BMW X5 - Teljes belső felújítás" },
  { id: 9, category: "vedelem", title: "Mercedes AMG - Fényezéskorrekció" },
];

const beforeAfterItems = [
  {
    id: 1,
    title: "Fényezés felújítás",
    description: "Oxidált fényezés helyreállítása polírozással és kerámia bevonattal",
  },
  {
    id: 2,
    title: "Belső tisztítás",
    description: "Erősen szennyezett belső tér professzionális mélytisztítása",
  },
  {
    id: 3,
    title: "Felni felújítás",
    description: "Karcolt, sérült felnik teljes helyreállítása",
  },
];

const Galeria = () => {
  const [selectedCategory, setSelectedCategory] = useState("osszes");

  const filteredItems = selectedCategory === "osszes" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Galéria
            </h1>
            <p className="text-lg text-muted-foreground">
              Tekintse meg munkáinkat és az előtte-utána összehasonlításokat.
              Minden projekt a részletekre való odafigyelésről szól.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="gallery">Galéria</TabsTrigger>
              <TabsTrigger value="beforeafter">Előtte-Utána</TabsTrigger>
            </TabsList>

            <TabsContent value="gallery">
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {[
                  { value: "osszes", label: "Összes" },
                  { value: "kulso", label: "Külső" },
                  { value: "belso", label: "Belső" },
                  { value: "vedelem", label: "Védelem" },
                ].map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">Helyőrző kép</p>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
                      <p className="text-foreground font-medium text-sm">
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="beforeafter">
              <div className="space-y-12">
                {beforeAfterItems.map((item) => (
                  <div key={item.id} className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-serif text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-card border border-border">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-muted-foreground text-sm">Előtte</p>
                        </div>
                        <div className="absolute top-3 left-3 px-3 py-1 bg-destructive/90 text-destructive-foreground text-xs font-medium rounded-full">
                          Előtte
                        </div>
                      </div>
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-card border border-primary/30">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-muted-foreground text-sm">Utána</p>
                        </div>
                        <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          Utána
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Note */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground">
              Ezek helyőrző képek. Cserélje ki őket valódi munkafotókra a 
              professzionális megjelenés érdekében.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Galeria;