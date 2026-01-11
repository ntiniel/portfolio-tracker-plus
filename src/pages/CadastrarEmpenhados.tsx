import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, User, ChevronRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { toast } from "sonner";
import FloatingPdfViewer from "@/components/FloatingPdfViewer";

interface FormData {
  numeroEmpenho: string;
  valor: string;
  processoAdm: string;
  mesLancamento: string;
  mesLiquidado: string;
  valorBaixa: string;
  condicao: string;
  reempenhado: string;
  fornecedor: string;
  dataEmpenho: string;
  contaCategoria: string;
  contrato: string;
  observacao: string;
}

const CadastrarEmpenhados = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    numeroEmpenho: '',
    valor: '',
    processoAdm: '',
    mesLancamento: '',
    mesLiquidado: '',
    valorBaixa: '',
    condicao: '',
    reempenhado: '',
    fornecedor: '',
    dataEmpenho: new Date().toISOString().split('T')[0],
    contaCategoria: '',
    contrato: '',
    observacao: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLimpar = () => {
    setFormData({
      numeroEmpenho: '',
      valor: '',
      processoAdm: '',
      mesLancamento: '',
      mesLiquidado: '',
      valorBaixa: '',
      condicao: '',
      reempenhado: '',
      fornecedor: '',
      dataEmpenho: new Date().toISOString().split('T')[0],
      contaCategoria: '',
      contrato: '',
      observacao: ''
    });
    toast.success('Formulário limpo!');
  };

  const handleSalvar = () => {
    if (!formData.numeroEmpenho) {
      toast.error('Por favor, informe o número do empenho');
      return;
    }

    const dataAtual = new Date().toLocaleDateString('pt-BR');
    
    const newRecord = {
      numeroEmpenho: formData.numeroEmpenho,
      bensEmpenhados: '',
      valores: formData.valor,
      dataEmpenho: formData.dataEmpenho,
      processoAdm: formData.processoAdm,
      valorBaixa: formData.valorBaixa,
      saldoNaoLiquidados: '',
      baixaDataNota: '',
      contaCategoria: formData.contaCategoria,
      observacao: formData.observacao,
      dataLancamento: formData.mesLancamento,
      dataLiquidado: formData.mesLiquidado,
      condicao: formData.condicao,
      dataLancamentoPlanilha: dataAtual,
      prioridadeAnteriores: '',
      valorBaixaReal: '',
      numeroContrato: formData.contrato,
      numeroReempenho: formData.reempenhado
    };

    // Get existing records from localStorage
    const existingData = localStorage.getItem('conciliacao_data');
    let records = [];
    
    if (existingData) {
      try {
        records = JSON.parse(existingData);
      } catch {
        records = [];
      }
    }

    records.push(newRecord);
    localStorage.setItem('conciliacao_data', JSON.stringify(records));
    
    toast.success('Empenho salvo com sucesso!');
    handleLimpar();
  };

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setIsPdfOpen(true);
    } else {
      toast.error('Por favor, selecione um arquivo PDF válido');
    }
    event.target.value = '';
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
                <User className="h-5 w-5 text-primary" />
              </div>
              Cadastro de Empenhados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Search Section */}
            <div className="flex items-center gap-4 pb-6 border-b border-border/50">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input 
                  placeholder="Número do Empenho" 
                  value={formData.numeroEmpenho}
                  onChange={(e) => handleInputChange('numeroEmpenho', e.target.value)}
                  className="max-w-xs border-0 border-b-2 border-primary/30 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all gap-2">
                PESQUISAR
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
              {/* Left Column */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                    <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    placeholder="Valor R$" 
                    type="number" 
                    step="0.01"
                    value={formData.valor}
                    onChange={(e) => handleInputChange('valor', e.target.value)}
                    className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                    <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    placeholder="Processo administrativo" 
                    value={formData.processoAdm}
                    onChange={(e) => handleInputChange('processoAdm', e.target.value)}
                    className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8" />
                  <div className="flex gap-4 flex-1">
                    <div className="flex-1 space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Mês Lançamento</label>
                      <Select value={formData.mesLancamento} onValueChange={(v) => handleInputChange('mesLancamento', v)}>
                        <SelectTrigger className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus:ring-0 focus:border-primary bg-transparent transition-colors">
                          <SelectValue placeholder="---------- de ----" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i + 1} value={`${i + 1}/2026`}>
                              {String(i + 1).padStart(2, '0')}/2026
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Mês Liquidado</label>
                      <Select value={formData.mesLiquidado} onValueChange={(v) => handleInputChange('mesLiquidado', v)}>
                        <SelectTrigger className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus:ring-0 focus:border-primary bg-transparent transition-colors">
                          <SelectValue placeholder="---------- de ----" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i + 1} value={`${i + 1}/2026`}>
                              {String(i + 1).padStart(2, '0')}/2026
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                    <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    placeholder="Valor da Baixa R$" 
                    type="number" 
                    step="0.01"
                    value={formData.valorBaixa}
                    onChange={(e) => handleInputChange('valorBaixa', e.target.value)}
                    className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8" />
                  <Select value={formData.condicao} onValueChange={(v) => handleInputChange('condicao', v)}>
                    <SelectTrigger className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus:ring-0 focus:border-primary bg-transparent transition-colors">
                      <SelectValue placeholder="CONDIÇÃO" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRANCO">BRANCO</SelectItem>
                      <SelectItem value="ESTORNO">ESTORNO</SelectItem>
                      <SelectItem value="ESTORNO_GLOBAL">ESTORNO GLOBAL</SelectItem>
                      <SelectItem value="LIQUIDACAO">LIQUIDAÇÃO</SelectItem>
                      <SelectItem value="LIQUIDACAO_PARCIAL">LIQUIDAÇÃO PARCIAL</SelectItem>
                      <SelectItem value="PRIORIDADE">PRIORIDADE</SelectItem>
                      <SelectItem value="PRIORIDADE_PARCIAL">PRIORIDADE PARCIAL</SelectItem>
                      <SelectItem value="REEMPENHADO">REEMPENHADO</SelectItem>
                      <SelectItem value="REEMPENHADO_PARCIAL">REEMPENHADO PARCIAL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                    <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    placeholder="Reempenhado" 
                    value={formData.reempenhado}
                    onChange={(e) => handleInputChange('reempenhado', e.target.value)}
                    className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                    <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    placeholder="Fornecedor" 
                    value={formData.fornecedor}
                    onChange={(e) => handleInputChange('fornecedor', e.target.value)}
                    className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center mt-5 group-focus-within:bg-primary/10 transition-colors">
                    <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Data do Empenho</label>
                    <Input 
                      type="date"
                      value={formData.dataEmpenho}
                      onChange={(e) => handleInputChange('dataEmpenho', e.target.value)}
                      className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8" />
                  <Select value={formData.contaCategoria} onValueChange={(v) => handleInputChange('contaCategoria', v)}>
                    <SelectTrigger className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus:ring-0 focus:border-primary bg-transparent transition-colors">
                      <SelectValue placeholder="CONTA CATEGORIA" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectItem value="1.2.3.1.1.01.01">1.2.3.1.1.01.01 - APARELHOS DE MEDIÇÃO E ORIENTAÇÃO</SelectItem>
                      <SelectItem value="1.2.3.1.1.01.02">1.2.3.1.1.01.02 - APARELHOS E EQUIPAMENTOS DE COMUNICAÇÃO</SelectItem>
                      <SelectItem value="1.2.3.1.1.01.03">1.2.3.1.1.01.03 - APARELHOS EQUIPAMENTOS E UTENSÍLIOS MÉDICOS ODONTOLÓGICOS LABORATORIAIS E HOSPITALARES</SelectItem>
                      <SelectItem value="1.2.3.1.1.01.04">1.2.3.1.1.01.04 - APARELHOS E EQUIPAMENTOS PARA ESPORTES E DIVERSÕES</SelectItem>
                      <SelectItem value="1.2.3.1.1.01.05">1.2.3.1.1.01.05 - EQUIPAMENTO DE PROTEÇÃO SEGURANÇA E SOCORRO</SelectItem>
                      <SelectItem value="1.2.3.1.1.01.06">1.2.3.1.1.01.06 - MÁQUINAS E EQUIPAMENTOS DE NATUREZA INDUSTRIAL</SelectItem>
                      <SelectItem value="1.2.3.1.1.01.07">1.2.3.1.1.01.07 - MÁQUINAS E EQUIPAMENTOS ENERGÉTICOS</SelectItem>
                      <SelectItem value="1.2.3.1.1.01.09">1.2.3.1.1.01.09 - MÁQUINAS E FERRAMENTAS E UTENSÍLIOS DE OFICINA</SelectItem>
                      <SelectItem value="1.2.3.1.1.01.21">1.2.3.1.1.01.21 - EQUIPAMENTOS E UTENSÍLIOS HIDRÁULICOS E ELÉTRICOS</SelectItem>
                      <SelectItem value="1.2.3.1.1.01.99">1.2.3.1.1.01.99 - OUTRAS MÁQUINAS APARELHOS EQUIPAMENTOS E FERRAMENTAS / MÁQUINAS, UTENSÍLIOS E EQUIPAMENTOS DIVERSOS</SelectItem>
                      <SelectItem value="1.2.3.1.1.02.01">1.2.3.1.1.02.01 - EQUIPAMENTOS DE PROCESSAMENTO DE DADOS</SelectItem>
                      <SelectItem value="1.2.3.1.1.03.01">1.2.3.1.1.03.01 - APARELHOS E UTENSÍLIOS DOMÉSTICOS</SelectItem>
                      <SelectItem value="1.2.3.1.1.03.02">1.2.3.1.1.03.02 - MÁQUINAS INSTALAÇÕES E UTENSÍLIOS DE ESCRITÓRIO</SelectItem>
                      <SelectItem value="1.2.3.1.1.03.03">1.2.3.1.1.03.03 - MOBILIÁRIO EM GERAL</SelectItem>
                      <SelectItem value="1.2.3.1.1.03.04">1.2.3.1.1.03.04 - UTENSÍLIOS EM GERAL</SelectItem>
                      <SelectItem value="1.2.3.1.1.04.01">1.2.3.1.1.04.01 - BANDEIRAS FLÂMULAS E INSÍGNIAS</SelectItem>
                      <SelectItem value="1.2.3.1.1.04.02">1.2.3.1.1.04.02 - COLEÇÕES E MATERIAIS BIBLIOGRÁFICOS</SelectItem>
                      <SelectItem value="1.2.3.1.1.04.04">1.2.3.1.1.04.04 - INSTRUMENTOS MUSICAIS E ARTÍSTICOS</SelectItem>
                      <SelectItem value="1.2.3.1.1.04.05">1.2.3.1.1.04.05 - EQUIPAMENTOS PARA ÁUDIO VÍDEO E FOTO</SelectItem>
                      <SelectItem value="1.2.3.1.1.05.01">1.2.3.1.1.05.01 - VEÍCULOS EM GERAL</SelectItem>
                      <SelectItem value="1.2.3.1.1.05.03">1.2.3.1.1.05.03 - VEÍCULOS DE TRAÇÃO MECÂNICA</SelectItem>
                      <SelectItem value="1.2.3.1.1.99.08">1.2.3.1.1.99.08 - BENS MÓVEIS A CLASSIFICAR</SelectItem>
                      <SelectItem value="1.2.3.1.1.99.99">1.2.3.1.1.99.99 - OUTROS BENS MÓVEIS / OUTROS MATERIAIS PERMANENTES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                    <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    placeholder="Contrato" 
                    value={formData.contrato}
                    onChange={(e) => handleInputChange('contrato', e.target.value)}
                    className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Observations */}
            <div className="flex items-start gap-3 pt-4">
              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center mt-2">
                <Plus className="h-4 w-4 text-primary/60" />
              </div>
              <Textarea 
                placeholder="Observações..." 
                value={formData.observacao}
                onChange={(e) => handleInputChange('observacao', e.target.value)}
                className="min-h-[120px] border-2 border-muted/30 rounded-xl focus-visible:border-primary focus-visible:ring-0 bg-muted/10 transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 pt-6 border-t border-border/50">
              <Button 
                variant="outline" 
                onClick={handleLimpar}
                className="min-w-[120px] border-2 border-muted/50 hover:border-primary/50 hover:bg-primary/5 transition-all gap-2"
              >
                LIMPAR
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleSalvar}
                className="min-w-[120px] bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all gap-2"
              >
                SALVAR
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                disabled={!isEditing}
                className="min-w-[120px] border-2 border-muted/50 hover:border-primary/50 hover:bg-primary/5 transition-all disabled:opacity-50"
              >
                EDITAR
              </Button>
              <Button 
                variant="outline" 
                disabled={!isEditing}
                className="min-w-[120px] border-2 border-muted/50 hover:border-destructive/50 hover:bg-destructive/5 hover:text-destructive transition-all disabled:opacity-50"
              >
                EXCLUIR
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Floating PDF Button */}
      <input
        type="file"
        accept="application/pdf"
        ref={pdfInputRef}
        onChange={handlePdfUpload}
        className="hidden"
      />
      <Button
        onClick={() => pdfInputRef.current?.click()}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all z-40"
        size="icon"
      >
        <FileText className="h-6 w-6" />
      </Button>

      {/* Floating PDF Viewer */}
      <FloatingPdfViewer
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pdfUrl={pdfUrl}
      />
    </div>
  );
};

export default CadastrarEmpenhados;
