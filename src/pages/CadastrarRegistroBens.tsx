import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, User, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CadastrarRegistroBens = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-6 max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Registro de Bens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Seção de Pesquisa por Empenho */}
            <div className="flex items-end gap-4 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <div className="space-y-1">
                  <Label htmlFor="numEmpenho" className="text-sm text-muted-foreground">Número do Empenho</Label>
                  <Input 
                    id="numEmpenho" 
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary bg-transparent w-48"
                  />
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                PESQUISAR
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Linha: Condição e Conta Categoria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Condição</Label>
                  <Select>
                    <SelectTrigger className="border-0 border-b border-border rounded-none focus:ring-0 bg-transparent">
                      <SelectValue placeholder="(Selecione)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="liquidacao">LIQUIDAÇÃO</SelectItem>
                      <SelectItem value="liquidacao_parcial">LIQUIDAÇÃO PARCIAL</SelectItem>
                      <SelectItem value="prioridade">PRIORIDADE</SelectItem>
                      <SelectItem value="prioridade_parcial">PRIORIDADE PARCIAL</SelectItem>
                      <SelectItem value="reempenhado">REEMPENHADO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Conta Categoria</Label>
                  <Select>
                    <SelectTrigger className="border-0 border-b border-border rounded-none focus:ring-0 bg-transparent">
                      <SelectValue placeholder="(Selecione)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equipamentos">Equipamentos</SelectItem>
                      <SelectItem value="mobiliario">Mobiliário</SelectItem>
                      <SelectItem value="veiculos">Veículos</SelectItem>
                      <SelectItem value="informatica">Informática</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Linha: Mês Lançamento, Mês Liquidado, Valor */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Mês Lançamento</Label>
                  <Input 
                    placeholder="---------- de ----" 
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Mês Liquidado</Label>
                  <Input 
                    placeholder="---------- de ----" 
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Valor R$</Label>
                  <Input 
                    type="number" 
                    step="0.01"
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Observação */}
            <div className="flex items-start gap-2">
              <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-3" />
              <div className="flex-1 space-y-1">
                <Textarea 
                  placeholder="Observação" 
                  className="border border-border rounded min-h-[80px]"
                />
              </div>
            </div>

            {/* Seção de Patrimônio */}
            <div className="flex flex-wrap items-end gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Patrimônio Inicial</Label>
                  <Input 
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent w-32"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Patrimônio Final</Label>
                  <Input 
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent w-32"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Quantidade de Objetos</Label>
                  <Input 
                    type="number"
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent w-24"
                  />
                </div>
              </div>
              <Button variant="outline" className="gap-2 border-muted-foreground/30">
                PESQUISAR PATRIMÔNIO
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Equipamento */}
            <div className="flex items-start gap-2">
              <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-3" />
              <div className="flex-1 space-y-1">
                <Input 
                  placeholder="Equipamento" 
                  className="border border-border rounded"
                />
              </div>
            </div>

            {/* Linha: Mês de Cadastro, Número da Pasta, Receb. N.F, Dia Lançamento */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Mês de Cadastro</Label>
                  <Input 
                    placeholder="---------- de ----" 
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Número da Pasta</Label>
                  <Input 
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Receb. N.F/Liquidação</Label>
                  <Input 
                    type="date"
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Dia Lançamento</Label>
                  <Input 
                    type="date"
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Linha: Valor, Data NF, Número NF, Cálculo */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Valor R$</Label>
                  <Input 
                    type="number"
                    step="0.01"
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Data da Nota Fiscal</Label>
                  <Input 
                    type="date"
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Número da Nota Fiscal</Label>
                  <Input 
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Cálculo R$</Label>
                  <Input 
                    type="number"
                    step="0.01"
                    readOnly
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-muted/50"
                  />
                </div>
              </div>
            </div>

            {/* Linha: Número do Cecam, Secretaria, Local */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Número do Cecam</Label>
                  <Input 
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Secretaria</Label>
                  <Input 
                    readOnly
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-muted/50"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <Label className="text-sm text-muted-foreground">Local</Label>
                  <Input 
                    readOnly
                    className="border-0 border-b border-border rounded-none focus-visible:ring-0 bg-muted/50"
                  />
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-border">
              <Button variant="outline" className="gap-2 border-muted-foreground/30">
                LIMPAR
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-2 border-muted-foreground/30">
                SALVAR
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-2 border-muted-foreground/30" disabled>
                EDITAR
              </Button>
              <Button variant="outline" className="gap-2 border-muted-foreground/30" disabled>
                NÃO EDITA EQUIPAMENTO
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-2 border-muted-foreground/30" disabled>
                EXCLUIR
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CadastrarRegistroBens;
