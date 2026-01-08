import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CadastrarRegistroBens = () => {
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
            <CardTitle className="text-2xl">Cadastrar Registro de Bens</CardTitle>
            <p className="text-muted-foreground">
              Registre bens móveis adquiridos pela prefeitura
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numeroPatrimonio">Nº Patrimônio</Label>
                <Input id="numeroPatrimonio" placeholder="Ex: PAT-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição do Bem</Label>
                <Input id="descricao" placeholder="Descrição do bem" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="empenhoVinculado">Empenho Vinculado</Label>
                <Input id="empenhoVinculado" placeholder="Nº do empenho" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataAquisicao">Data de Aquisição</Label>
                <Input id="dataAquisicao" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valorBem">Valor do Bem (R$)</Label>
                <Input id="valorBem" type="number" step="0.01" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoriaBem">Categoria</Label>
                <Input id="categoriaBem" placeholder="Ex: Equipamento de Comunicação" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="localizacao">Localização</Label>
                <Input id="localizacao" placeholder="Setor/Departamento" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado de Conservação</Label>
                <Input id="estado" placeholder="Ex: Novo, Bom, Regular" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="observacoesBem">Observações</Label>
              <Textarea id="observacoesBem" placeholder="Observações sobre o bem..." />
            </div>
            <div className="flex gap-4">
              <Button className="flex-1">Salvar Bem</Button>
              <Button variant="outline" onClick={() => navigate("/")}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CadastrarRegistroBens;
