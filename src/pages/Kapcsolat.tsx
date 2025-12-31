import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Név megadása kötelező")
    .max(100, "A név maximum 100 karakter lehet")
    .regex(/^[\p{L}\s'-]+$/u, "Érvénytelen karakterek a névben"),
  email: z
    .string()
    .min(1, "Email megadása kötelező")
    .email("Érvénytelen email cím")
    .max(254, "Az email cím túl hosszú"),
  phone: z
    .string()
    .regex(/^(\+?[0-9\s-]*)?$/, "Érvénytelen telefonszám formátum")
    .max(20, "A telefonszám túl hosszú")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Az üzenet legalább 10 karakter legyen")
    .max(2000, "Az üzenet maximum 2000 karakter lehet"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+36 XX XXX XXXX",
    href: "tel:+36XXXXXXXX",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@szokewash.hu",
    href: "mailto:info@szokewash.hu",
  },
  {
    icon: MapPin,
    label: "Cím",
    value: "8500 Pápa, Úrdomb utca 12.",
    href: null,
  },
  {
    icon: Clock,
    label: "Nyitvatartás",
    value: "H-P: 8:00 - 18:00, Szo: 9:00 - 14:00",
    href: null,
  },
];

const Kapcsolat = () => {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Üzenet elküldve!",
      description: "Hamarosan felvesszük Önnel a kapcsolatot.",
    });

    form.reset();
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Kapcsolat
            </h1>
            <p className="text-lg text-muted-foreground">
              Foglaljon időpontot vagy keressen minket bármilyen kérdéssel!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="p-8 rounded-2xl bg-card border border-border">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Írjon nekünk
                </h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Név *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Az Ön neve"
                              className="bg-background border-border focus:border-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="email@pelda.hu"
                                className="bg-background border-border focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+36 XX XXX XXXX"
                                className="bg-background border-border focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Üzenet *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Írja le, miben segíthetünk..."
                              rows={5}
                              className="bg-background border-border focus:border-primary resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {form.formState.isSubmitting ? (
                        "Küldés..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Üzenet küldése
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Elérhetőségeink
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div
                      key={info.label}
                      className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video rounded-2xl bg-card border border-border flex items-center justify-center">
                <div className="text-center p-4">
                  <MapPin className="w-12 h-12 text-primary/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">
                    Térkép beágyazása - Google Maps iframe ide kerülhet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kapcsolat;