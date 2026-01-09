import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, ChevronRight, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CadastrarIncorporacao = () => {
  const navigate = useNavigate();

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
              <div className="w-10 h-10 rounded-xl bg-accent-foreground/10 flex items-center justify-center">
                <Gift className="h-5 w-5 text-accent-foreground" />
              </div>
              Incorporações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Seção de Patrimônio */}
            <div className="flex flex-wrap items-end gap-4 pb-6 border-b border-border/50">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Patrimônio Inicial</Label>
                  <Input 
                    className="border-0 border-b-2 border-muted/50 rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent w-32 transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Patrimônio Final</Label>
                  <Input 
                    className="border-0 border-b-2 border-muted/50 rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent w-32 transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Quantidade de Objetos</Label>
                  <Input 
                    type="number"
                    className="border-0 border-b-2 border-muted/50 rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent w-24 transition-colors"
                  />
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all gap-2">
                PESQUISAR PATRIMÔNIO
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Equipamento */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center mt-2">
                <Plus className="h-4 w-4 text-primary/60" />
              </div>
              <div className="flex-1">
                <Input 
                  placeholder="Equipamento" 
                  className="border-2 border-muted/30 rounded-xl focus-visible:border-primary focus-visible:ring-0 bg-muted/10 transition-colors"
                />
              </div>
            </div>

            {/* Linha: Mês de Cadastro, Número da Pasta, Receb. N.F, Dia Lançamento */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Mês de Cadastro</Label>
                  <Input 
                    placeholder="---------- de ----" 
                    className="border-0 border-b-2 border-muted/50 rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Número da Pasta</Label>
                  <Input 
                    type="date"
                    className="border-0 border-b-2 border-muted/50 rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Receb. N.F/Liquidação</Label>
                  <Input 
                    type="date"
                    className="border-0 border-b-2 border-muted/50 rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Dia Lançamento</Label>
                  <Input 
                    type="date"
                    className="border-0 border-b-2 border-muted/50 rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Linha: Valor, Data NF, Número NF, Doador */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Valor R$</Label>
                  <Input 
                    type="number"
                    step="0.01"
                    className="border-0 border-b-2 border-muted/50 rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Data da Nota Fiscal</Label>
                  <Input 
                    type="date"
                    className="border-0 border-b-2 border-muted/50 rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Número da Nota Fiscal</Label>
                  <Input 
                    className="border-0 border-b-2 border-muted/50 rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Doador</Label>
                  <Input 
                    className="border-0 border-b-2 border-muted/50 rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Linha: Número do Cecam, Secretaria, Local */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Número do Cecam</Label>
                  <Input 
                    className="border-0 border-b-2 border-muted/50 rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Secretaria</Label>
                  <Input 
                    readOnly
                    className="border-0 border-b-2 border-muted/50 rounded-none focus-visible:ring-0 bg-muted/20"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-focus-within:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Local</Label>
                  <Input 
                    readOnly
                    className="border-0 border-b-2 border-muted/50 rounded-none focus-visible:ring-0 bg-muted/20"
                  />
                </div>
              </div>
            </div>

            {/* Conta Categoria */}
            <div className="flex items-center gap-3">
              <div className="flex-1 max-w-md">
                <Select>
                  <SelectTrigger className="border-2 border-muted/30 rounded-xl focus:ring-0 focus:border-primary bg-muted/10 transition-colors">
                    <SelectValue placeholder="CONTA CATEGORIA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equipamentos">Equipamentos</SelectItem>
                    <SelectItem value="mobiliario">Mobiliário</SelectItem>
                    <SelectItem value="veiculos">Veículos</SelectItem>
                    <SelectItem value="informatica">Informática</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-wrap justify-center gap-3 pt-6 border-t border-border/50">
              <Button variant="outline" className="gap-2 border-2 border-muted/50 hover:border-primary/50 hover:bg-primary/5 transition-all">
                LIMPAR
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
                SALVAR
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-2 border-2 border-muted/50 transition-all" disabled>
                EDITAR
              </Button>
              <Button variant="outline" className="gap-2 border-2 border-muted/50 transition-all" disabled>
                NÃO EDITA EQUIPAMENTO
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-2 border-2 border-muted/50 hover:border-destructive/50 hover:bg-destructive/5 hover:text-destructive transition-all" disabled>
                EXCLUIR
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CadastrarIncorporacao;
