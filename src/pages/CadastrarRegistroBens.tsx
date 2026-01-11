import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, User, ChevronRight, Package, Search, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  numeroPatrimonio: z.string().max(50).optional(),
});

interface ConciliacaoData {
  numero_empenho: string;
  valores: string;
  data_empenho: string | null;
  processo_adm: string;
  conta_categoria: string;
  condicao: string;
  data_liquidado: string;
  numero_reempenho: string;
  observacao: string;
}

interface FormData {
  // Auto-filled from conciliacao
  empenho: string;
  pasta: string;
  dataPasta: string;
  categoria: string;
  secretaria: string;
  doador: string;
  condicao: string;
  dataLiquidado: string;
  dataRecebimentoNF: string;
  reempenho: string;
  status: string;
  numeroProcesso: string;
  // Manual fields
  quantidade: string;
  numeroPatrimonio: string;
  equipamentoMaterial: string;
  mesCadastro: string;
  numeroPasta: string;
  dataRecebimentoPedido: string;
  dataPlanilha: string;
  valorBem: string;
  dataNF: string;
  numeroNF: string;
  serieNF: string;
  local: string;
  cecam: string;
  item: string;
  fotos: string;
  obs: string;
  obsPastas: string;
  caixaArquivo: string;
}

const CadastrarRegistroBens = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [empenhoValidado, setEmpenhoValidado] = useState(false);
  const [empenhoError, setEmpenhoError] = useState<string | null>(null);
  const [searchEmpenho, setSearchEmpenho] = useState("");
  
  const [formData, setFormData] = useState<FormData>({
    empenho: '',
    pasta: '',
    dataPasta: '',
    categoria: '',
    secretaria: '',
    doador: '',
    condicao: '',
    dataLiquidado: '',
    dataRecebimentoNF: '',
    reempenho: '',
    status: '',
    numeroProcesso: '',
    quantidade: '1',
    numeroPatrimonio: '',
    equipamentoMaterial: '',
    mesCadastro: '',
    numeroPasta: '',
    dataRecebimentoPedido: '',
    dataPlanilha: new Date().toISOString().split('T')[0],
    valorBem: '',
    dataNF: '',
    numeroNF: '',
    serieNF: '',
    local: '',
    cecam: '',
    item: '',
    fotos: '',
    obs: '',
    obsPastas: '',
    caixaArquivo: '',
  });

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
        pasta: data.numero_empenho, // Use empenho as pasta
        dataPasta: data.data_lancamento || '',
        categoria: data.conta_categoria || '',
        condicao: data.condicao || '',
        dataLiquidado: data.data_liquidado || '',
        dataRecebimentoNF: data.data_empenho || '',
        reempenho: data.numero_reempenho || '',
        numeroProcesso: data.processo_adm || '',
        obs: data.observacao || '',
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

  const handleLimpar = () => {
    setFormData({
      empenho: '',
      pasta: '',
      dataPasta: '',
      categoria: '',
      secretaria: '',
      doador: '',
      condicao: '',
      dataLiquidado: '',
      dataRecebimentoNF: '',
      reempenho: '',
      status: '',
      numeroProcesso: '',
      quantidade: '1',
      numeroPatrimonio: '',
      equipamentoMaterial: '',
      mesCadastro: '',
      numeroPasta: '',
      dataRecebimentoPedido: '',
      dataPlanilha: new Date().toISOString().split('T')[0],
      valorBem: '',
      dataNF: '',
      numeroNF: '',
      serieNF: '',
      local: '',
      cecam: '',
      item: '',
      fotos: '',
      obs: '',
      obsPastas: '',
      caixaArquivo: '',
    });
    setSearchEmpenho('');
    setEmpenhoValidado(false);
    setEmpenhoError(null);
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
      equipamentoMaterial: formData.equipamentoMaterial,
      valorBem: formData.valorBem,
      local: formData.local,
      secretaria: formData.secretaria,
      numeroPatrimonio: formData.numeroPatrimonio,
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

    // Check for duplicate patrimonio number
    if (formData.numeroPatrimonio) {
      const { data: existing } = await supabase
        .from('bens_patrimoniais')
        .select('id')
        .eq('numero_patrimonio', formData.numeroPatrimonio)
        .maybeSingle();

      if (existing) {
        toast.error('Número de patrimônio já cadastrado');
        return;
      }
    }

    setIsSaving(true);

    try {
      // Use raw SQL insert via RPC or direct insert with type assertion
      const insertData = {
        equipamento_material: formData.equipamentoMaterial.trim(),
        empenho: formData.empenho.trim(),
        data_nf: formData.dataNF || null,
        cecam: formData.cecam.trim(),
        n_nota: formData.numeroNF.trim(),
        serie: formData.serieNF.trim(),
        valor_bem: formData.valorBem ? parseFloat(formData.valorBem) : 0,
        pasta: formData.numeroPasta || formData.pasta,
        data_pasta: null,
        categoria: formData.categoria,
        secretaria: formData.secretaria.trim(),
        doador: formData.doador.trim(),
        local: formData.local.trim(),
        condicao: formData.condicao,
        obs: formData.obs.trim(),
        data_lancamento: null,
        data_liquidado: formData.dataLiquidado,
        data_recebimento_nf_liquidacao: formData.dataRecebimentoPedido || null,
        data_planilha: formData.dataPlanilha || null,
        item: formData.item.trim(),
        reempenho: formData.reempenho,
        status: formData.status || 'ATIVO',
        fotos: formData.fotos.trim(),
        inicio_patrimoniamento: formData.mesCadastro,
        fim_patrimoniamento: '',
        data_arquivamento: null,
        obs_pastas: formData.obsPastas.trim(),
        caixa_arquivo: formData.caixaArquivo.trim(),
        numero_processo: formData.numeroProcesso,
        numero_patrimonio: formData.numeroPatrimonio.trim(),
        quantidade: parseInt(formData.quantidade) || 1,
        created_by: user.id
      };

      const { error } = await supabase
        .from('bens_patrimoniais')
        .insert(insertData as any);

      if (error) {
        console.error('Database error:', error);
        toast.error('Erro ao salvar: ' + error.message);
      } else {
        toast.success('Bem cadastrado com sucesso!');
        handleLimpar();
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Erro inesperado ao salvar');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-background">
      <Header />
      
      <main className="p-6 max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4 hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm animate-fade-in">
          <CardHeader className="pb-4 border-b border-border/50">
            <CardTitle className="text-2xl font-semibold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              Registro de Bens
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Seção de Pesquisa por Empenho */}
            <div className="flex flex-col gap-4 pb-6 border-b border-border/50">
              <div className="flex items-end gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Número do Empenho *</Label>
                    <Input 
                      value={searchEmpenho}
                      onChange={(e) => setSearchEmpenho(e.target.value)}
                      placeholder="Digite o número do empenho"
                      disabled={empenhoValidado}
                      className="border-0 border-b-2 border-primary/30 rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent w-48 transition-colors"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleSearchEmpenho}
                  disabled={isSearching || empenhoValidado}
                  className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all gap-2"
                >
                  {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  VALIDAR EMPENHO
                </Button>
                {empenhoValidado && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setEmpenhoValidado(false);
                      setSearchEmpenho('');
                    }}
                    className="gap-2"
                  >
                    Alterar Empenho
                  </Button>
                )}
              </div>
              
              {/* Status do Empenho */}
              {empenhoValidado && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Empenho validado: {formData.empenho}</span>
                </div>
              )}
              {empenhoError && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">{empenhoError}</span>
                </div>
              )}
            </div>

            {/* Campos do formulário - só habilitados após validação do empenho */}
            <fieldset disabled={!empenhoValidado} className={!empenhoValidado ? 'opacity-50' : ''}>
              {/* Dados do Empenho (Auto-preenchidos) */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary border-b pb-2">Dados do Empenho (Preenchidos da Conciliação)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Pasta</Label>
                    <Input 
                      value={formData.pasta}
                      onChange={(e) => handleInputChange('pasta', e.target.value)}
                      className="border border-muted/50 rounded-md bg-muted/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Data (mês/ano)</Label>
                    <Input 
                      value={formData.dataPasta}
                      onChange={(e) => handleInputChange('dataPasta', e.target.value)}
                      className="border border-muted/50 rounded-md bg-muted/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Categoria</Label>
                    <Input 
                      value={formData.categoria}
                      onChange={(e) => handleInputChange('categoria', e.target.value)}
                      className="border border-muted/50 rounded-md bg-muted/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Condição</Label>
                    <Select value={formData.condicao} onValueChange={(v) => handleInputChange('condicao', v)}>
                      <SelectTrigger className="border border-muted/50 rounded-md bg-muted/10">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LIQUIDACAO">LIQUIDAÇÃO</SelectItem>
                        <SelectItem value="LIQUIDACAO_PARCIAL">LIQUIDAÇÃO PARCIAL</SelectItem>
                        <SelectItem value="PRIORIDADE">PRIORIDADE</SelectItem>
                        <SelectItem value="PRIORIDADE_PARCIAL">PRIORIDADE PARCIAL</SelectItem>
                        <SelectItem value="REEMPENHADO">REEMPENHADO</SelectItem>
                        <SelectItem value="ESTORNO">ESTORNO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Data Liquidado</Label>
                    <Input 
                      value={formData.dataLiquidado}
                      onChange={(e) => handleInputChange('dataLiquidado', e.target.value)}
                      className="border border-muted/50 rounded-md bg-muted/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Reempenho</Label>
                    <Input 
                      value={formData.reempenho}
                      onChange={(e) => handleInputChange('reempenho', e.target.value)}
                      className="border border-muted/50 rounded-md bg-muted/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Número do Processo</Label>
                    <Input 
                      value={formData.numeroProcesso}
                      onChange={(e) => handleInputChange('numeroProcesso', e.target.value)}
                      className="border border-muted/50 rounded-md bg-muted/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Status</Label>
                    <Select value={formData.status} onValueChange={(v) => handleInputChange('status', v)}>
                      <SelectTrigger className="border border-muted/50 rounded-md bg-muted/10">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ATIVO">ATIVO</SelectItem>
                        <SelectItem value="EM_TRANSFERENCIA">EM TRANSFERÊNCIA</SelectItem>
                        <SelectItem value="BAIXADO">BAIXADO</SelectItem>
                        <SelectItem value="EXTRAVIADO">EXTRAVIADO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Doador</Label>
                    <Input 
                      value={formData.doador}
                      onChange={(e) => handleInputChange('doador', e.target.value)}
                      placeholder="Se aplicável"
                      className="border border-muted/50 rounded-md bg-muted/10"
                    />
                  </div>
                </div>
              </div>

              {/* Dados Específicos do Bem */}
              <div className="space-y-4 mt-8">
                <h3 className="text-lg font-semibold text-primary border-b pb-2">Dados Específicos do Bem (Preenchimento Manual)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Quantidade *</Label>
                    <Input 
                      type="number"
                      min="1"
                      value={formData.quantidade}
                      onChange={(e) => handleInputChange('quantidade', e.target.value)}
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Número do Patrimônio</Label>
                    <Input 
                      value={formData.numeroPatrimonio}
                      onChange={(e) => handleInputChange('numeroPatrimonio', e.target.value)}
                      placeholder="Gerado/Editável"
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Item</Label>
                    <Input 
                      value={formData.item}
                      onChange={(e) => handleInputChange('item', e.target.value)}
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Mês de Cadastro</Label>
                    <Input 
                      value={formData.mesCadastro}
                      onChange={(e) => handleInputChange('mesCadastro', e.target.value)}
                      placeholder="MM/AAAA"
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Descrição do Bem (Equipamento/Material) *</Label>
                  <Input 
                    value={formData.equipamentoMaterial}
                    onChange={(e) => handleInputChange('equipamentoMaterial', e.target.value)}
                    placeholder="Descreva o bem"
                    className="border border-muted/50 rounded-md"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Número da Pasta</Label>
                    <Input 
                      value={formData.numeroPasta}
                      onChange={(e) => handleInputChange('numeroPasta', e.target.value)}
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Data Receb. Pedido</Label>
                    <Input 
                      type="date"
                      value={formData.dataRecebimentoPedido}
                      onChange={(e) => handleInputChange('dataRecebimentoPedido', e.target.value)}
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Data Planilha</Label>
                    <Input 
                      type="date"
                      value={formData.dataPlanilha}
                      onChange={(e) => handleInputChange('dataPlanilha', e.target.value)}
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Valor do Bem R$ *</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      value={formData.valorBem}
                      onChange={(e) => handleInputChange('valorBem', e.target.value)}
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Data Nota Fiscal</Label>
                    <Input 
                      type="date"
                      value={formData.dataNF}
                      onChange={(e) => handleInputChange('dataNF', e.target.value)}
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Número Nota Fiscal</Label>
                    <Input 
                      value={formData.numeroNF}
                      onChange={(e) => handleInputChange('numeroNF', e.target.value)}
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Série NF</Label>
                    <Input 
                      value={formData.serieNF}
                      onChange={(e) => handleInputChange('serieNF', e.target.value)}
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">CECAM</Label>
                    <Input 
                      value={formData.cecam}
                      onChange={(e) => handleInputChange('cecam', e.target.value)}
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Secretaria *</Label>
                    <Input 
                      value={formData.secretaria}
                      onChange={(e) => handleInputChange('secretaria', e.target.value)}
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Local *</Label>
                    <Input 
                      value={formData.local}
                      onChange={(e) => handleInputChange('local', e.target.value)}
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Fotos (link)</Label>
                    <Input 
                      value={formData.fotos}
                      onChange={(e) => handleInputChange('fotos', e.target.value)}
                      placeholder="URL das fotos"
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Caixa Arquivo</Label>
                    <Input 
                      value={formData.caixaArquivo}
                      onChange={(e) => handleInputChange('caixaArquivo', e.target.value)}
                      className="border border-muted/50 rounded-md"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Observações</Label>
                  <Textarea 
                    value={formData.obs}
                    onChange={(e) => handleInputChange('obs', e.target.value)}
                    placeholder="Observações sobre o bem"
                    className="border border-muted/50 rounded-md min-h-[80px]"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Observações da Pasta</Label>
                  <Textarea 
                    value={formData.obsPastas}
                    onChange={(e) => handleInputChange('obsPastas', e.target.value)}
                    placeholder="Observações da pasta"
                    className="border border-muted/50 rounded-md min-h-[80px]"
                  />
                </div>
              </div>
            </fieldset>

            {/* Botões de Ação */}
            <div className="flex flex-wrap justify-center gap-3 pt-6 border-t border-border/50">
              <Button 
                variant="outline" 
                onClick={handleLimpar}
                className="gap-2 border-2 border-muted/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                LIMPAR
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleSalvar}
                disabled={isSaving || !empenhoValidado}
                className="gap-2 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'SALVAR'}
                {!isSaving && <ChevronRight className="h-4 w-4" />}
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/bens-patrimoniais')}
                className="gap-2 border-2 border-muted/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                VER TABELA BD2026
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CadastrarRegistroBens;
