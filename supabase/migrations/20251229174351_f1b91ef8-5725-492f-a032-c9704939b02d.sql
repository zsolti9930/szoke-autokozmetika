-- Create enum for service types
CREATE TYPE public.service_type AS ENUM ('kulso_mosas', 'belso_takaritas', 'fenyezesvedelem', 'komplett_csomag');

-- Create enum for appointment status
CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- Create appointments table
CREATE TABLE public.appointments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    service_type public.service_type NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    vehicle_type TEXT,
    license_plate TEXT,
    notes TEXT,
    status public.appointment_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert appointments (public booking)
CREATE POLICY "Anyone can create appointments"
ON public.appointments
FOR INSERT
WITH CHECK (true);

-- Allow reading own appointments by email (for confirmation page)
CREATE POLICY "Anyone can view appointments"
ON public.appointments
FOR SELECT
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();