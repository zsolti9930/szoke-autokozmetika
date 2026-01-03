-- Fix 1: Add user_id column to link appointments to authenticated users
ALTER TABLE public.appointments 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Fix 2: Add database constraints for server-side validation
ALTER TABLE public.appointments 
  ADD CONSTRAINT customer_name_length CHECK (length(customer_name) >= 2 AND length(customer_name) <= 100),
  ADD CONSTRAINT customer_email_format CHECK (customer_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT customer_phone_length CHECK (length(customer_phone) >= 9 AND length(customer_phone) <= 20);

-- Drop the insecure INSERT policy
DROP POLICY IF EXISTS "Authenticated users can create appointments" ON public.appointments;

-- Create secure INSERT policy that validates user_id matches authenticated user
CREATE POLICY "Authenticated users can create their own appointments" 
ON public.appointments 
FOR INSERT 
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Allow users to view their own appointments (they need to see what they booked)
CREATE POLICY "Users can view their own appointments" 
ON public.appointments 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());