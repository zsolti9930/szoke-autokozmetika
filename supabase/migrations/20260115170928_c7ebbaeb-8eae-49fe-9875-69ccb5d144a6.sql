-- Drop the current INSERT policy
DROP POLICY IF EXISTS "Authenticated users can create their own appointments" ON public.appointments;

-- Create a new INSERT policy that ONLY allows authenticated users
-- The TO authenticated clause ensures anonymous users cannot insert at all
CREATE POLICY "Authenticated users can create their own appointments" 
ON public.appointments 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());