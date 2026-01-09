import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Plus, User, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CadastrarEmpenhados = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleLimpar = () => {
    // Reset form logic would go here
  };

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
            <CardTitle className="text-2xl font-normal">Cadastro de Empenhados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Section */}
            <div className="flex items-center gap-4 pb-4 border-b">
              <User className="h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Número do Empenho" 
                className="max-w-xs border-b border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
              />
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                PESQUISAR
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Plus className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input 
                    placeholder="Valor R$" 
                    type="number" 
                    step="0.01"
                    className="border-b border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Plus className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input 
                    placeholder="Processo administrativo" 
                    className="border-b border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4" />
                  <div className="flex gap-4 flex-1">
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground">Mês Lançamento</label>
                      <Select>
                        <SelectTrigger className="border-b border-t-0 border-x-0 rounded-none px-0 focus:ring-0">
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
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground">Mês Liquidado</label>
                      <Select>
                        <SelectTrigger className="border-b border-t-0 border-x-0 rounded-none px-0 focus:ring-0">
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

                <div className="flex items-center gap-3">
                  <Plus className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input 
                    placeholder="Valor da Baixa R$" 
                    type="number" 
                    step="0.01"
                    className="border-b border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4" />
                  <Select>
                    <SelectTrigger className="border-b border-t-0 border-x-0 rounded-none px-0 focus:ring-0">
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
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Plus className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input 
                    placeholder="Reempenhado" 
                    className="border-b border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Plus className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1">
                    <Input 
                      placeholder="Fornecedor" 
                      className="border-b border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Plus className="h-4 w-4 text-muted-foreground shrink-0 mt-2" />
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Data do Empenho</label>
                    <Input 
                      type="date"
                      defaultValue="2026-01-09"
                      className="border-b border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Plus className="h-4 w-4 text-muted-foreground shrink-0 mt-2" />
                  <Select>
                    <SelectTrigger className="border-b border-t-0 border-x-0 rounded-none px-0 focus:ring-0">
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

                <div className="flex items-center gap-3">
                  <Plus className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input 
                    placeholder="Contrato" 
                    className="border-b border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Observations */}
            <div className="flex items-start gap-3 pt-4">
              <Plus className="h-4 w-4 text-muted-foreground shrink-0 mt-2" />
              <Textarea 
                placeholder="Observações..." 
                className="min-h-[120px] border rounded-md"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={handleLimpar}
                className="min-w-[100px]"
              >
                LIMPAR
                <Send className="ml-2 h-4 w-4" />
              </Button>
              <Button className="min-w-[100px]">
                SALVAR
              </Button>
              <Button 
                variant="outline" 
                disabled={!isEditing}
                className="min-w-[100px]"
              >
                EDITAR
              </Button>
              <Button 
                variant="outline" 
                disabled={!isEditing}
                className="min-w-[100px]"
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
