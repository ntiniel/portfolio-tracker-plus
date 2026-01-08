import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CadastrarEmpenhados = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-6 max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Cadastrar Empenhados</CardTitle>
            <p className="text-muted-foreground">
              Registre empenhos de bens adquiridos pela prefeitura
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numeroEmpenho">Nº Empenho</Label>
                <Input id="numeroEmpenho" placeholder="Ex: 12345" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataEmpenho">Data Empenho</Label>
                <Input id="dataEmpenho" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Input id="fornecedor" placeholder="Nome do fornecedor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input id="valor" type="number" step="0.01" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="processoAdm">Processo ADM</Label>
                <Input id="processoAdm" placeholder="Número do processo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Conta/Categoria</Label>
                <Input id="categoria" placeholder="Ex: 1.2.3.1.1.01.02" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numeroReempenho">Nº Reempenho (opcional)</Label>
                <Input id="numeroReempenho" placeholder="Ex: 18205" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condicao">Condição</Label>
                <Input id="condicao" placeholder="Ex: Novo, Pendente" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea id="observacoes" placeholder="Observações adicionais..." />
            </div>
            <div className="flex gap-4">
              <Button className="flex-1">Salvar Empenho</Button>
              <Button variant="outline" onClick={() => navigate("/")}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CadastrarEmpenhados;
