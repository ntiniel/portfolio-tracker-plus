import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, User, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CadastrarEmpenhados = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleLimpar = () => {
    // Reset form logic would go here
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
                    className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                    <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    placeholder="Processo administrativo" 
                    className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8" />
                  <div className="flex gap-4 flex-1">
                    <div className="flex-1 space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Mês Lançamento</label>
                      <Select>
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
                      <Select>
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
                    className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8" />
                  <Select>
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
                    className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                    <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    placeholder="Fornecedor" 
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
                      defaultValue="2026-01-09"
                      className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8" />
                  <Select>
                    <SelectTrigger className="border-0 border-b-2 border-muted/50 rounded-none px-0 focus:ring-0 focus:border-primary bg-transparent transition-colors">
                      <SelectValue placeholder="CONTA CATEGORIA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.2.3.1.1.01.01">1.2.3.1.1.01.01 - Aparelhos de Medição</SelectItem>
                      <SelectItem value="1.2.3.1.1.01.02">1.2.3.1.1.01.02 - Aparelhos e Equipamentos de Comunicação</SelectItem>
                      <SelectItem value="1.2.3.1.1.01.03">1.2.3.1.1.01.03 - Equipamentos de TI</SelectItem>
                      <SelectItem value="1.2.3.1.1.01.04">1.2.3.1.1.01.04 - Mobiliário em Geral</SelectItem>
                      <SelectItem value="1.2.3.1.1.01.05">1.2.3.1.1.01.05 - Veículos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                    <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    placeholder="Contrato" 
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
              <Button className="min-w-[120px] bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all gap-2">
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
    </div>
  );
};

export default CadastrarEmpenhados;
