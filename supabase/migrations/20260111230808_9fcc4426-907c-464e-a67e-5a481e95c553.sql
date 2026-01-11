-- Create bens_patrimoniais table (bd2026)
CREATE TABLE public.bens_patrimoniais (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sequencia SERIAL,
    equipamento_material TEXT NOT NULL,
    empenho TEXT NOT NULL,
    data_nf DATE,
    cecam TEXT DEFAULT '',
    n_nota TEXT DEFAULT '',
    serie TEXT DEFAULT '',
    valor_bem NUMERIC(15,2) DEFAULT 0,
    pasta TEXT DEFAULT '',
    data_pasta DATE,
    categoria TEXT DEFAULT '',
    secretaria TEXT DEFAULT '',
    doador TEXT DEFAULT '',
    local TEXT DEFAULT '',
    condicao TEXT DEFAULT '',
    obs TEXT DEFAULT '',
    data_lancamento DATE,
    data_liquidado TEXT DEFAULT '',
    data_recebimento_nf_liquidacao DATE,
    data_planilha DATE,
    item TEXT DEFAULT '',
    reempenho TEXT DEFAULT '',
    status TEXT DEFAULT '',
    fotos TEXT DEFAULT '',
    inicio_patrimoniamento TEXT DEFAULT '',
    fim_patrimoniamento TEXT DEFAULT '',
    data_arquivamento DATE,
    obs_pastas TEXT DEFAULT '',
    caixa_arquivo TEXT DEFAULT '',
    numero_processo TEXT DEFAULT '',
    numero_patrimonio TEXT,
    quantidade INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE public.bens_patrimoniais ENABLE ROW LEVEL SECURITY;

-- Create index for empenho lookup
CREATE INDEX idx_bens_patrimoniais_empenho ON public.bens_patrimoniais(empenho);
CREATE INDEX idx_bens_patrimoniais_numero_patrimonio ON public.bens_patrimoniais(numero_patrimonio);

-- RLS Policies - all authenticated users can view (collaborative government system)
CREATE POLICY "Authenticated users can view bens_patrimoniais"
ON public.bens_patrimoniais
FOR SELECT
TO authenticated
USING (true);

-- Only creator can insert
CREATE POLICY "Authenticated users can insert bens_patrimoniais"
ON public.bens_patrimoniais
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Only creator can update their own records
CREATE POLICY "Users can update their own bens_patrimoniais"
ON public.bens_patrimoniais
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by);

-- Only creator can delete their own records
CREATE POLICY "Users can delete their own bens_patrimoniais"
ON public.bens_patrimoniais
FOR DELETE
TO authenticated
USING (auth.uid() = created_by);

-- Add trigger for updated_at
CREATE TRIGGER update_bens_patrimoniais_updated_at
BEFORE UPDATE ON public.bens_patrimoniais
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();