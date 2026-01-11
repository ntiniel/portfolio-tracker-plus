-- Fix overly permissive RLS policies for UPDATE and DELETE on conciliacao_records
-- Drop the permissive policies
DROP POLICY IF EXISTS "Authenticated users can update conciliacao_records" ON public.conciliacao_records;
DROP POLICY IF EXISTS "Authenticated users can delete conciliacao_records" ON public.conciliacao_records;

-- Create more restrictive policies - only creator can update/delete their own records
CREATE POLICY "Users can update their own conciliacao_records"
ON public.conciliacao_records
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own conciliacao_records"
ON public.conciliacao_records
FOR DELETE
TO authenticated
USING (auth.uid() = created_by);