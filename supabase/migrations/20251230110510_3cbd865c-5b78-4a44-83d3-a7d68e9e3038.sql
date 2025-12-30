-- Add product_code column to products table
ALTER TABLE public.products 
ADD COLUMN product_code TEXT NULL;

-- Create index for faster searches by product_code
CREATE INDEX idx_products_product_code ON public.products(product_code);