import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Calendar, Clock, Car, User, Phone, Mail, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import type { Database } from "@/integrations/supabase/types";

type ServiceType = Database["public"]["Enums"]["service_type"];

const serviceOptions: { value: ServiceType; label: string }[] = [
  { value: "kulso_mosas", label: "Külső mosás" },
  { value: "belso_takaritas", label: "Belső takarítás" },
  { value: "fenyezesvedelem", label: "Fényezésvédelem" },
  { value: "komplett_csomag", label: "Komplett csomag" },
];

const bookingSchema = z.object({
  customer_name: z.string().trim().min(2, { message: "A név legalább 2 karakter legyen" }).max(100),
  customer_email: z.string().trim().email({ message: "Érvénytelen email cím" }).max(255),
  customer_phone: z.string().trim().min(9, { message: "Érvénytelen telefonszám" }).max(20),
  service_type: z.enum(["kulso_mosas", "belso_takaritas", "fenyezesvedelem", "komplett_csomag"], {
    required_error: "Válasszon szolgáltatást",
  }),
  appointment_date: z.string().min(1, { message: "Válasszon dátumot" }),
  appointment_time: z.string().min(1, { message: "Válasszon időpontot" }),
  vehicle_type: z.string().max(100).optional(),
  license_plate: z.string().max(20).optional(),
  notes: z.string().max(500).optional(),
});

const Idopontfoglalas = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    service_type: "" as ServiceType | "",
    appointment_date: "",
    appointment_time: "",
    vehicle_type: "",
    license_plate: "",
    notes: "",
  });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <section className="min-h-[60vh] flex items-center justify-center py-20">
          <div className="text-center space-y-6 px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
              <Calendar className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Bejelentkezés szükséges
            </h1>
            <p className="text-muted-foreground max-w-md">
              Az időpontfoglaláshoz kérjük, jelentkezzen be vagy regisztráljon.
            </p>
            <Button
              onClick={() => navigate("/auth")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Bejelentkezés
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("appointments").insert({
        customer_name: formData.customer_name.trim(),
        customer_email: formData.customer_email.trim(),
        customer_phone: formData.customer_phone.trim(),
        service_type: formData.service_type as ServiceType,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        vehicle_type: formData.vehicle_type.trim() || null,
        license_plate: formData.license_plate.trim() || null,
        notes: formData.notes.trim() || null,
      });

      if (error) throw error;

      toast({
        title: "Sikeres foglalás!",
        description: "Időpontfoglalását rögzítettük. Hamarosan felvesszük Önnel a kapcsolatot.",
      });

      setFormData({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        service_type: "",
        appointment_date: "",
        appointment_time: "",
        vehicle_type: "",
        license_plate: "",
        notes: "",
      });
    } catch (error: any) {
      toast({
        title: "Hiba történt",
        description: "A foglalás nem sikerült. Kérjük, próbálja újra később.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Időpontfoglalás
              </h1>
              <p className="text-muted-foreground text-lg">
                Töltse ki az alábbi űrlapot az időpont lefoglalásához
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="customer_name">Név *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="customer_name"
                      placeholder="Teljes név"
                      value={formData.customer_name}
                      onChange={(e) => handleChange("customer_name", e.target.value)}
                      className={`pl-10 ${errors.customer_name ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.customer_name && (
                    <p className="text-sm text-destructive">{errors.customer_name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer_email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="customer_email"
                      type="email"
                      placeholder="pelda@email.com"
                      value={formData.customer_email}
                      onChange={(e) => handleChange("customer_email", e.target.value)}
                      className={`pl-10 ${errors.customer_email ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.customer_email && (
                    <p className="text-sm text-destructive">{errors.customer_email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer_phone">Telefonszám *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="customer_phone"
                      type="tel"
                      placeholder="+36 30 123 4567"
                      value={formData.customer_phone}
                      onChange={(e) => handleChange("customer_phone", e.target.value)}
                      className={`pl-10 ${errors.customer_phone ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.customer_phone && (
                    <p className="text-sm text-destructive">{errors.customer_phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_type">Szolgáltatás *</Label>
                  <Select
                    value={formData.service_type}
                    onValueChange={(value) => handleChange("service_type", value)}
                  >
                    <SelectTrigger className={errors.service_type ? "border-destructive" : ""}>
                      <SelectValue placeholder="Válasszon szolgáltatást" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service_type && (
                    <p className="text-sm text-destructive">{errors.service_type}</p>
                  )}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="appointment_date">Dátum *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="appointment_date"
                      type="date"
                      min={today}
                      value={formData.appointment_date}
                      onChange={(e) => handleChange("appointment_date", e.target.value)}
                      className={`pl-10 ${errors.appointment_date ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.appointment_date && (
                    <p className="text-sm text-destructive">{errors.appointment_date}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointment_time">Időpont *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="appointment_time"
                      type="time"
                      value={formData.appointment_time}
                      onChange={(e) => handleChange("appointment_time", e.target.value)}
                      className={`pl-10 ${errors.appointment_time ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.appointment_time && (
                    <p className="text-sm text-destructive">{errors.appointment_time}</p>
                  )}
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vehicle_type">Jármű típusa</Label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="vehicle_type"
                      placeholder="pl. BMW X5"
                      value={formData.vehicle_type}
                      onChange={(e) => handleChange("vehicle_type", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="license_plate">Rendszám</Label>
                  <Input
                    id="license_plate"
                    placeholder="ABC-123"
                    value={formData.license_plate}
                    onChange={(e) => handleChange("license_plate", e.target.value)}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Megjegyzés</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Textarea
                    id="notes"
                    placeholder="További információk..."
                    value={formData.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    className="pl-10 min-h-[100px]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Foglalás folyamatban...
                  </>
                ) : (
                  "Időpont foglalása"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Idopontfoglalas;
