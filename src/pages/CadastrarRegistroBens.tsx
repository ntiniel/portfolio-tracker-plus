import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Search, Loader2, CheckCircle, AlertCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

// Validation schema
const bensSchema = z.object({
  empenho: z.string().min(1, "Número do empenho é obrigatório").max(50),
  equipamentoMaterial: z.string().min(1, "Descrição do bem é obrigatória").max(500),
  valorBem: z.string().refine((val) => !val || !isNaN(parseFloat(val)), "Valor deve ser numérico"),
  local: z.string().min(1, "Local é obrigatório").max(200),
  secretaria: z.string().min(1, "Secretaria é obrigatória").max(200),
});

interface FormData {
  // Auto-filled from conciliacao
  empenho: string;
  condicao: string;
  contaCategoria: string;
  valorConciliacao: string;
  observacao: string;
  mesLancamento: string;
  mesLiquidado: string;
  // Patrimônio fields
  patrimonioInicial: string;
  patrimonioFinal: string;
  quantidadeObjetos: string;
  // Equipment fields
  equipamento: string;
  mesCadastro: string;
  numeroPasta: string;
  dataRecebNFLiquidacao: string;
  diaLancamento: string;
  valorBem: string;
  numeroNotaFiscal: string;
  dataNotaFiscal: string;
  calculoRS: string;
  numeroCecam: string;
  secretaria: string;
  local: string;
}

const formatDateToBR = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const CadastrarRegistroBens = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchingPatrimonio, setIsSearchingPatrimonio] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [empenhoValidado, setEmpenhoValidado] = useState(false);
  const [empenhoError, setEmpenhoError] = useState<string | null>(null);
  const [searchEmpenho, setSearchEmpenho] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const today = new Date();
  const todayBR = formatDateToBR(today);
  
  const [formData, setFormData] = useState<FormData>({
    empenho: '',
    condicao: '',
    contaCategoria: '',
    valorConciliacao: '',
    observacao: '',
    mesLancamento: '',
    mesLiquidado: '',
    patrimonioInicial: '',
    patrimonioFinal: '',
    quantidadeObjetos: '1',
    equipamento: '',
    mesCadastro: '',
    numeroPasta: '',
    dataRecebNFLiquidacao: todayBR,
    diaLancamento: todayBR,
    valorBem: '',
    numeroNotaFiscal: '',
    dataNotaFiscal: todayBR,
    calculoRS: '',
    numeroCecam: '',
    secretaria: '',
    local: '',
  });

  // Fetch last patrimonio and pasta on mount
  useEffect(() => {
    const fetchLastValues = async () => {
      try {
        // Get last patrimonio number
        const { data: lastPatrimonio } = await supabase
          .from('bens_patrimoniais')
          .select('numero_patrimonio')
          .not('numero_patrimonio', 'is', null)
          .order('sequencia', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Get last pasta number
        const { data: lastPasta } = await supabase
          .from('bens_patrimoniais')
          .select('pasta')
          .not('pasta', 'is', null)
          .order('sequencia', { ascending: false })
          .limit(1)
          .maybeSingle();

        let nextPatrimonio = '1';
        let nextPasta = '1';

        if (lastPatrimonio?.numero_patrimonio) {
          const lastNum = parseInt(lastPatrimonio.numero_patrimonio, 10);
          if (!isNaN(lastNum)) {
            nextPatrimonio = String(lastNum + 1);
          }
        }

        if (lastPasta?.pasta) {
          const lastPastaNum = parseInt(lastPasta.pasta, 10);
          if (!isNaN(lastPastaNum)) {
            nextPasta = String(lastPastaNum + 1);
          }
        }

        setFormData(prev => ({
          ...prev,
          patrimonioInicial: nextPatrimonio,
          patrimonioFinal: nextPatrimonio,
          numeroPasta: nextPasta,
        }));
      } catch (error) {
        console.error('Error fetching last values:', error);
      }
    };

    fetchLastValues();
  }, []);

  // Calculate patrimonioFinal when quantidadeObjetos or patrimonioInicial changes
  useEffect(() => {
    const inicial = parseInt(formData.patrimonioInicial, 10);
    const quantidade = parseInt(formData.quantidadeObjetos, 10);
    
    if (!isNaN(inicial) && !isNaN(quantidade) && quantidade > 0) {
      const final = inicial + quantidade - 1;
      setFormData(prev => ({
        ...prev,
        patrimonioFinal: String(final),
      }));
    }
  }, [formData.patrimonioInicial, formData.quantidadeObjetos]);

  // Calculate calculoRS when valorBem and quantidadeObjetos change
  useEffect(() => {
    const valor = parseFloat(formData.valorBem);
    const quantidade = parseInt(formData.quantidadeObjetos, 10);
    
    if (!isNaN(valor) && !isNaN(quantidade) && quantidade > 0) {
      const total = valor * quantidade;
      setFormData(prev => ({
        ...prev,
        calculoRS: total.toFixed(2),
      }));
    }
  }, [formData.valorBem, formData.quantidadeObjetos]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearchEmpenho = async () => {
    if (!searchEmpenho.trim()) {
      toast.error("Digite o número do empenho");
      return;
    }

    setIsSearching(true);
    setEmpenhoError(null);
    setEmpenhoValidado(false);

    try {
      const { data, error } = await supabase
        .from('conciliacao_records')
        .select('*')
        .eq('numero_empenho', searchEmpenho.trim())
        .maybeSingle();

      if (error) {
        console.error('Error searching empenho:', error);
        setEmpenhoError("Erro ao buscar empenho");
        toast.error("Erro ao buscar empenho");
        return;
      }

      if (!data) {
        setEmpenhoError("Empenho não encontrado. Verifique o número.");
        toast.error("Empenho não encontrado. Verifique o número.");
        return;
      }

      // Auto-fill fields from conciliacao
      setFormData(prev => ({
        ...prev,
        empenho: data.numero_empenho,
        condicao: data.condicao || '',
        contaCategoria: data.conta_categoria || '',
        valorConciliacao: data.valores || '',
        observacao: data.observacao || '',
        mesLancamento: data.data_lancamento || '',
        mesLiquidado: data.data_liquidado || '',
      }));

      setEmpenhoValidado(true);
      toast.success("Empenho encontrado! Campos preenchidos automaticamente.");
    } catch (error) {
      console.error('Unexpected error:', error);
      setEmpenhoError("Erro inesperado ao buscar empenho");
      toast.error("Erro inesperado ao buscar empenho");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchPatrimonio = async () => {
    const patrimonio = formData.patrimonioInicial.trim();
    if (!patrimonio) {
      toast.error("Digite o número do patrimônio");
      return;
    }

    setIsSearchingPatrimonio(true);

    try {
      const { data, error } = await supabase
        .from('bens_patrimoniais')
        .select('*')
        .eq('numero_patrimonio', patrimonio)
        .maybeSingle();

      if (error) {
        console.error('Error searching patrimonio:', error);
        toast.error("Erro ao buscar patrimônio");
        return;
      }

      if (data) {
        // Fill form with existing data for editing
        setFormData(prev => ({
          ...prev,
          empenho: data.empenho,
          condicao: data.condicao || '',
          contaCategoria: data.categoria || '',
          observacao: data.obs || '',
          patrimonioInicial: data.numero_patrimonio || '',
          patrimonioFinal: data.numero_patrimonio || '',
          quantidadeObjetos: '1',
          equipamento: data.equipamento_material,
          numeroPasta: data.pasta || '',
          valorBem: data.valor_bem?.toString() || '',
          numeroNotaFiscal: data.n_nota || '',
          numeroCecam: data.cecam || '',
          secretaria: data.secretaria || '',
          local: data.local || '',
        }));
        setIsEditing(true);
        setEditingId(data.id);
        setEmpenhoValidado(true);
        setSearchEmpenho(data.empenho);
        toast.success("Patrimônio encontrado! Dados carregados para edição.");
      } else {
        toast.info("Patrimônio não encontrado.");
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error("Erro inesperado ao buscar patrimônio");
    } finally {
      setIsSearchingPatrimonio(false);
    }
  };

  const handleLimpar = async () => {
    // Fetch new last values
    try {
      const { data: lastPatrimonio } = await supabase
        .from('bens_patrimoniais')
        .select('numero_patrimonio')
        .not('numero_patrimonio', 'is', null)
        .order('sequencia', { ascending: false })
        .limit(1)
        .maybeSingle();

      const { data: lastPasta } = await supabase
        .from('bens_patrimoniais')
        .select('pasta')
        .not('pasta', 'is', null)
        .order('sequencia', { ascending: false })
        .limit(1)
        .maybeSingle();

      let nextPatrimonio = '1';
      let nextPasta = '1';

      if (lastPatrimonio?.numero_patrimonio) {
        const lastNum = parseInt(lastPatrimonio.numero_patrimonio, 10);
        if (!isNaN(lastNum)) {
          nextPatrimonio = String(lastNum + 1);
        }
      }

      if (lastPasta?.pasta) {
        const lastPastaNum = parseInt(lastPasta.pasta, 10);
        if (!isNaN(lastPastaNum)) {
          nextPasta = String(lastPastaNum + 1);
        }
      }

      setFormData({
        empenho: '',
        condicao: '',
        contaCategoria: '',
        valorConciliacao: '',
        observacao: '',
        mesLancamento: '',
        mesLiquidado: '',
        patrimonioInicial: nextPatrimonio,
        patrimonioFinal: nextPatrimonio,
        quantidadeObjetos: '1',
        equipamento: '',
        mesCadastro: '',
        numeroPasta: nextPasta,
        dataRecebNFLiquidacao: todayBR,
        diaLancamento: todayBR,
        valorBem: '',
        numeroNotaFiscal: '',
        dataNotaFiscal: todayBR,
        calculoRS: '',
        numeroCecam: '',
        secretaria: '',
        local: '',
      });
    } catch (error) {
      console.error('Error fetching last values:', error);
    }

    setSearchEmpenho('');
    setEmpenhoValidado(false);
    setEmpenhoError(null);
    setIsEditing(false);
    setEditingId(null);
    toast.success('Formulário limpo!');
  };

  const handleSalvar = async () => {
    if (!empenhoValidado) {
      toast.error("Valide o número do empenho antes de salvar");
      return;
    }

    // Validate required fields
    const validation = bensSchema.safeParse({
      empenho: formData.empenho,
      equipamentoMaterial: formData.equipamento,
      valorBem: formData.valorBem,
      local: formData.local,
      secretaria: formData.secretaria,
    });

    if (!validation.success) {
      const firstError = validation.error.errors[0]?.message;
      toast.error(firstError || 'Preencha todos os campos obrigatórios');
      return;
    }

    if (!user) {
      toast.error('Você precisa estar logado para salvar registros');
      return;
    }

    const quantidade = parseInt(formData.quantidadeObjetos, 10) || 1;
    const patrimonioInicial = parseInt(formData.patrimonioInicial, 10);

    if (isNaN(patrimonioInicial)) {
      toast.error('Número de patrimônio inválido');
      return;
    }

    // Check for duplicate patrimonio numbers in range
    const patrimonioNumbers = Array.from({ length: quantidade }, (_, i) => String(patrimonioInicial + i));
    
    const { data: existing } = await supabase
      .from('bens_patrimoniais')
      .select('numero_patrimonio')
      .in('numero_patrimonio', patrimonioNumbers);

    if (existing && existing.length > 0 && !isEditing) {
      const duplicates = existing.map(e => e.numero_patrimonio).join(', ');
      toast.error(`Números de patrimônio já cadastrados: ${duplicates}`);
      return;
    }

    setIsSaving(true);

    try {
      if (isEditing && editingId) {
        // Update existing record
        const updateData = {
          equipamento_material: formData.equipamento.trim(),
          empenho: formData.empenho.trim(),
          categoria: formData.contaCategoria,
          condicao: formData.condicao,
          obs: formData.observacao.trim(),
          pasta: formData.numeroPasta,
          valor_bem: formData.valorBem ? parseFloat(formData.valorBem) : 0,
          n_nota: formData.numeroNotaFiscal.trim(),
          cecam: formData.numeroCecam.trim(),
          secretaria: formData.secretaria.trim(),
          local: formData.local.trim(),
          numero_patrimonio: formData.patrimonioInicial,
        };

        const { error } = await supabase
          .from('bens_patrimoniais')
          .update(updateData as any)
          .eq('id', editingId);

        if (error) {
          console.error('Database error:', error);
          toast.error('Erro ao atualizar: ' + error.message);
        } else {
          toast.success('Bem atualizado com sucesso!');
          handleLimpar();
        }
      } else {
        // Insert multiple records based on quantity
        const records = patrimonioNumbers.map((numPatrimonio) => ({
          equipamento_material: formData.equipamento.trim(),
          empenho: formData.empenho.trim(),
          categoria: formData.contaCategoria,
          condicao: formData.condicao,
          obs: formData.observacao.trim(),
          pasta: formData.numeroPasta,
          valor_bem: formData.valorBem ? parseFloat(formData.valorBem) : 0,
          n_nota: formData.numeroNotaFiscal.trim(),
          cecam: formData.numeroCecam.trim(),
          secretaria: formData.secretaria.trim(),
          local: formData.local.trim(),
          numero_patrimonio: numPatrimonio,
          inicio_patrimoniamento: formData.mesCadastro,
          status: 'ATIVO',
          created_by: user.id,
        }));

        const { error } = await supabase
          .from('bens_patrimoniais')
          .insert(records as any);

        if (error) {
          console.error('Database error:', error);
          toast.error('Erro ao salvar: ' + error.message);
        } else {
          toast.success(`${quantidade} bem(ns) cadastrado(s) com sucesso!`);
          handleLimpar();
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Erro inesperado ao salvar');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExcluir = async () => {
    if (!isEditing || !editingId) {
      toast.error('Nenhum registro selecionado para exclusão');
      return;
    }

    if (!confirm('Tem certeza que deseja excluir este registro?')) {
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('bens_patrimoniais')
        .delete()
        .eq('id', editingId);

      if (error) {
        console.error('Database error:', error);
        toast.error('Erro ao excluir: ' + error.message);
      } else {
        toast.success('Bem excluído com sucesso!');
        handleLimpar();
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Erro inesperado ao excluir');
    } finally {
      setIsSaving(false);
    }
  };

  const months = [
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' },
  ];

  const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - 5 + i;
    return { value: String(year), label: String(year) };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-background">
      <Header />
      
      <main className="p-6 max-w-5xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4 hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <h1 className="text-2xl font-semibold text-foreground mb-6 italic">Registro de Bens</h1>

        {/* Section 1: Empenho Search */}
        <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-sm mb-4">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                <Label className="text-sm font-medium text-muted-foreground">Número do Empenho</Label>
              </div>
              <Input 
                value={searchEmpenho}
                onChange={(e) => setSearchEmpenho(e.target.value)}
                placeholder="Digite o empenho"
                disabled={empenhoValidado}
                className="border-b-2 border-primary/30 rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent w-48"
              />
              <Button 
                onClick={handleSearchEmpenho}
                disabled={isSearching || empenhoValidado}
                className="bg-primary hover:bg-primary/90 gap-2"
              >
                {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                PESQUISAR
              </Button>
              {empenhoValidado && (
                <Button 
                  variant="outline"
                  onClick={() => {
                    setEmpenhoValidado(false);
                    setSearchEmpenho('');
                  }}
                  size="sm"
                >
                  Alterar
                </Button>
              )}
            </div>
            
            {empenhoValidado && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-2 rounded-lg mt-3">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Empenho validado: {formData.empenho}</span>
              </div>
            )}
            {empenhoError && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-2 rounded-lg mt-3">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{empenhoError}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 2: Auto-filled fields from Conciliação */}
        <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-sm mb-4">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <Label className="text-sm text-muted-foreground w-20">Condição</Label>
                <Input 
                  value={formData.condicao}
                  readOnly
                  className="bg-muted/20 border-b border-muted"
                />
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <Label className="text-sm text-muted-foreground w-28">Conta Categoria</Label>
                <Input 
                  value={formData.contaCategoria}
                  readOnly
                  className="bg-muted/20 border-b border-muted"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm text-muted-foreground w-28">Mês Lançamento</Label>
                <Input 
                  value={formData.mesLancamento}
                  readOnly
                  className="bg-muted/20 border-b border-muted"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm text-muted-foreground w-24">Mês Liquidado</Label>
                <Input 
                  value={formData.mesLiquidado}
                  readOnly
                  className="bg-muted/20 border-b border-muted"
                />
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <Label className="text-sm text-muted-foreground w-16">Valor R$</Label>
                <Input 
                  value={formData.valorConciliacao}
                  readOnly
                  className="bg-muted/20 border-b border-muted"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Plus className="h-4 w-4 text-primary flex-shrink-0 mt-2" />
              <Textarea 
                value={formData.observacao}
                onChange={(e) => handleInputChange('observacao', e.target.value)}
                placeholder="Observação"
                className="min-h-[60px] bg-muted/10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Patrimônio */}
        <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-sm mb-4">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <Label className="text-sm text-muted-foreground">Patrimônio Inicial</Label>
                  <Input 
                    type="number"
                    value={formData.patrimonioInicial}
                    onChange={(e) => handleInputChange('patrimonioInicial', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <Label className="text-sm text-muted-foreground">Patrimônio Final</Label>
                  <Input 
                    type="number"
                    value={formData.patrimonioFinal}
                    readOnly
                    className="mt-1 bg-muted/20"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <Label className="text-sm text-muted-foreground">Quantidade de Objetos</Label>
                  <Input 
                    type="number"
                    min="1"
                    value={formData.quantidadeObjetos}
                    onChange={(e) => handleInputChange('quantidadeObjetos', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <Button 
                onClick={handleSearchPatrimonio}
                disabled={isSearchingPatrimonio}
                variant="outline"
                className="bg-primary/10 border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2"
              >
                {isSearchingPatrimonio ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                PESQUISAR PATRIMÔNIO
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Equipment Details */}
        <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-sm mb-4">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary flex-shrink-0" />
              <Label className="text-sm text-muted-foreground w-24">Equipamento</Label>
              <Input 
                value={formData.equipamento}
                onChange={(e) => handleInputChange('equipamento', e.target.value)}
                placeholder="Descrição do equipamento/material"
                className="flex-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <Label className="text-sm text-muted-foreground">Mês de Cadastro</Label>
                <div className="flex gap-1">
                  <Select 
                    value={formData.mesCadastro.split('/')[0] || ''} 
                    onValueChange={(v) => {
                      const year = formData.mesCadastro.split('/')[1] || String(new Date().getFullYear());
                      handleInputChange('mesCadastro', `${v}/${year}`);
                    }}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Mês" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(m => (
                        <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select 
                    value={formData.mesCadastro.split('/')[1] || ''} 
                    onValueChange={(v) => {
                      const month = formData.mesCadastro.split('/')[0] || '01';
                      handleInputChange('mesCadastro', `${month}/${v}`);
                    }}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Ano" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(y => (
                        <SelectItem key={y.value} value={y.value}>{y.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <Label className="text-sm text-muted-foreground">Número da Pasta</Label>
                  <Input 
                    type="number"
                    value={formData.numeroPasta}
                    onChange={(e) => handleInputChange('numeroPasta', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <Label className="text-sm text-muted-foreground">Receb. N/F Liquidação</Label>
                  <Input 
                    value={formData.dataRecebNFLiquidacao}
                    onChange={(e) => handleInputChange('dataRecebNFLiquidacao', e.target.value)}
                    placeholder="DD/MM/AAAA"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <Label className="text-sm text-muted-foreground">Dia Lançamento</Label>
                  <Input 
                    value={formData.diaLancamento}
                    onChange={(e) => handleInputChange('diaLancamento', e.target.value)}
                    placeholder="DD/MM/AAAA"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <Label className="text-sm text-muted-foreground">Valor R$</Label>
                  <Input 
                    type="number"
                    step="0.01"
                    value={formData.valorBem}
                    onChange={(e) => handleInputChange('valorBem', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <Label className="text-sm text-muted-foreground">Número da Nota Fiscal</Label>
                  <Input 
                    value={formData.numeroNotaFiscal}
                    onChange={(e) => handleInputChange('numeroNotaFiscal', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <Label className="text-sm text-muted-foreground">Data da Nota Fiscal</Label>
                  <Input 
                    value={formData.dataNotaFiscal}
                    onChange={(e) => handleInputChange('dataNotaFiscal', e.target.value)}
                    placeholder="DD/MM/AAAA"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <Label className="text-sm text-muted-foreground">Cálculo R$</Label>
                  <Input 
                    value={formData.calculoRS}
                    readOnly
                    className="mt-1 bg-muted/20"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <Label className="text-sm text-muted-foreground">Número do Cecam</Label>
                  <Input 
                    value={formData.numeroCecam}
                    onChange={(e) => handleInputChange('numeroCecam', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <Label className="text-sm text-muted-foreground">Secretaria</Label>
                  <Input 
                    value={formData.secretaria}
                    onChange={(e) => handleInputChange('secretaria', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <Label className="text-sm text-muted-foreground">Local</Label>
                  <Input 
                    value={formData.local}
                    onChange={(e) => handleInputChange('local', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button 
            variant="outline" 
            onClick={handleLimpar}
            className="border-2 border-muted hover:border-primary/50 hover:bg-primary/5"
          >
            LIMPAR
          </Button>
          <Button 
            onClick={handleSalvar}
            disabled={isSaving || !empenhoValidado}
            className="bg-primary hover:bg-primary/90 shadow-md"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            SALVAR
          </Button>
          <Button 
            variant="outline"
            disabled={!isEditing}
            onClick={() => setIsEditing(true)}
            className="border-2 border-muted hover:border-primary/50"
          >
            EDITAR
          </Button>
          <Button 
            variant="outline"
            disabled
            className="border-2 border-muted text-muted-foreground"
          >
            NÃO EDITA EQUIPAMENTO
          </Button>
          <Button 
            variant="outline"
            onClick={handleExcluir}
            disabled={!isEditing || isSaving}
            className="border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            EXCLUIR
          </Button>
        </div>

        {/* Link to table */}
        <div className="mt-6 text-center">
          <Button 
            variant="link"
            onClick={() => navigate('/bens-patrimoniais')}
            className="text-primary"
          >
            Ver Tabela BD2026 (Download/Upload CSV)
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CadastrarRegistroBens;
