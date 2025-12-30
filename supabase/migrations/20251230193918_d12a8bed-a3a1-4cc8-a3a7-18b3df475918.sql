-- Create salespeople table
CREATE TABLE public.salespeople (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.salespeople ENABLE ROW LEVEL SECURITY;

-- Everyone can view active salespeople
CREATE POLICY "Active salespeople are viewable by everyone"
ON public.salespeople
FOR SELECT
USING (is_active = true);

-- Admins can view all salespeople
CREATE POLICY "Admins can view all salespeople"
ON public.salespeople
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert salespeople
CREATE POLICY "Admins can insert salespeople"
ON public.salespeople
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update salespeople
CREATE POLICY "Admins can update salespeople"
ON public.salespeople
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete salespeople
CREATE POLICY "Admins can delete salespeople"
ON public.salespeople
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_salespeople_updated_at
BEFORE UPDATE ON public.salespeople
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for salespeople table
ALTER PUBLICATION supabase_realtime ADD TABLE public.salespeople;