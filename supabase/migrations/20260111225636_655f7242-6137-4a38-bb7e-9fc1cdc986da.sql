-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role-based access control
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents recursive RLS issues)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Policy for user_roles: users can read their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create profiles table for user information
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    display_name TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create conciliacao_records table to replace localStorage
CREATE TABLE public.conciliacao_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numero_empenho TEXT NOT NULL,
    bens_empenhados TEXT DEFAULT '',
    valores TEXT DEFAULT '',
    data_empenho DATE,
    processo_adm TEXT DEFAULT '',
    valor_baixa TEXT DEFAULT '',
    saldo_nao_liquidados TEXT DEFAULT '',
    baixa_data_nota TEXT DEFAULT '',
    conta_categoria TEXT DEFAULT '',
    observacao TEXT DEFAULT '',
    data_lancamento TEXT DEFAULT '',
    data_liquidado TEXT DEFAULT '',
    condicao TEXT DEFAULT '',
    data_lancamento_planilha TEXT DEFAULT '',
    prioridade_anteriores TEXT DEFAULT '',
    valor_baixa_real TEXT DEFAULT '',
    numero_contrato TEXT DEFAULT '',
    numero_reempenho TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS on conciliacao_records
ALTER TABLE public.conciliacao_records ENABLE ROW LEVEL SECURITY;

-- Policies for conciliacao_records (authenticated users can CRUD)
CREATE POLICY "Authenticated users can view conciliacao_records"
ON public.conciliacao_records
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert conciliacao_records"
ON public.conciliacao_records
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update conciliacao_records"
ON public.conciliacao_records
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete conciliacao_records"
ON public.conciliacao_records
FOR DELETE
TO authenticated
USING (true);

-- Trigger function to create profile and user_role on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger to auto-create profile on signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_conciliacao_records_updated_at
BEFORE UPDATE ON public.conciliacao_records
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();