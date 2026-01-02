-- Create a secure function for order creation with server-side validation
CREATE OR REPLACE FUNCTION public.create_secure_order(
  _customer_name TEXT,
  _customer_email TEXT,
  _customer_phone TEXT,
  _customer_address TEXT,
  _items JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _order_id UUID;
  _item JSONB;
  _product RECORD;
  _calculated_total DECIMAL := 0;
  _quantity INTEGER;
BEGIN
  -- Validate customer name (2-100 chars, basic sanitization)
  IF _customer_name IS NULL OR length(trim(_customer_name)) < 2 OR length(trim(_customer_name)) > 100 THEN
    RAISE EXCEPTION 'Nome deve ter entre 2 e 100 caracteres';
  END IF;
  _customer_name := trim(_customer_name);
  
  -- Validate email format and length
  IF _customer_email IS NULL OR length(trim(_customer_email)) > 255 THEN
    RAISE EXCEPTION 'Email inválido';
  END IF;
  _customer_email := trim(_customer_email);
  IF _customer_email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Formato de email inválido';
  END IF;
  
  -- Validate phone (10-20 chars, digits and common separators only)
  IF _customer_phone IS NULL OR length(trim(_customer_phone)) < 10 OR length(trim(_customer_phone)) > 20 THEN
    RAISE EXCEPTION 'Telefone deve ter entre 10 e 20 caracteres';
  END IF;
  _customer_phone := trim(_customer_phone);
  
  -- Validate address (allow empty but limit length)
  IF _customer_address IS NULL THEN
    _customer_address := '';
  END IF;
  _customer_address := trim(_customer_address);
  IF length(_customer_address) > 500 THEN
    RAISE EXCEPTION 'Endereço muito longo';
  END IF;
  
  -- Validate items array
  IF _items IS NULL OR jsonb_array_length(_items) = 0 THEN
    RAISE EXCEPTION 'Carrinho vazio';
  END IF;
  
  IF jsonb_array_length(_items) > 100 THEN
    RAISE EXCEPTION 'Número máximo de itens excedido';
  END IF;

  -- Create the order with initial total of 0
  INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total, status)
  VALUES (_customer_name, _customer_email, _customer_phone, _customer_address, 0, 'pending')
  RETURNING id INTO _order_id;
  
  -- Process each item and validate prices from database
  FOR _item IN SELECT * FROM jsonb_array_elements(_items)
  LOOP
    -- Validate quantity
    _quantity := COALESCE((_item->>'quantity')::INTEGER, 0);
    IF _quantity < 1 OR _quantity > 1000 THEN
      RAISE EXCEPTION 'Quantidade inválida';
    END IF;
    
    -- Get product from database (use DB price, not client-supplied)
    SELECT id, name, price INTO _product
    FROM products
    WHERE id = (_item->>'product_id')::UUID;
    
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Produto não encontrado ou foi removido';
    END IF;
    
    -- Insert order item with validated database price
    INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
    VALUES (_order_id, _product.id, _product.name, _product.price, _quantity);
    
    _calculated_total := _calculated_total + (_product.price * _quantity);
  END LOOP;
  
  -- Update order with server-calculated total
  UPDATE orders SET total = _calculated_total WHERE id = _order_id;
  
  RETURN _order_id;
END;
$$;

-- Grant execute permission to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.create_secure_order TO anon;
GRANT EXECUTE ON FUNCTION public.create_secure_order TO authenticated;

-- Drop the overly permissive INSERT policies
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can create order items" ON public.order_items;