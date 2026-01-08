import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CadastrarIncorporacao = () => {
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
            <div className="flex items-center gap-2">
              <Gift className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Cadastrar Incorporação</CardTitle>
            </div>
            <p className="text-muted-foreground">
              Registre bens recebidos por doação ou transferência
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numeroPatrimonioInc">Nº Patrimônio</Label>
                <Input id="numeroPatrimonioInc" placeholder="Ex: PAT-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricaoInc">Descrição do Bem</Label>
                <Input id="descricaoInc" placeholder="Descrição do bem doado" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doador">Doador/Origem</Label>
                <Input id="doador" placeholder="Nome do doador ou órgão" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataIncorporacao">Data de Incorporação</Label>
                <Input id="dataIncorporacao" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valorEstimado">Valor Estimado (R$)</Label>
                <Input id="valorEstimado" type="number" step="0.01" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoriaInc">Categoria</Label>
                <Input id="categoriaInc" placeholder="Ex: Mobiliário, Veículo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="documentoDoacao">Documento de Doação</Label>
                <Input id="documentoDoacao" placeholder="Nº do termo de doação" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="localizacaoInc">Localização</Label>
                <Input id="localizacaoInc" placeholder="Setor/Departamento destino" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estadoInc">Estado de Conservação</Label>
                <Input id="estadoInc" placeholder="Ex: Novo, Bom, Regular" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipoIncorporacao">Tipo de Incorporação</Label>
                <Input id="tipoIncorporacao" placeholder="Doação, Transferência, Permuta" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="observacoesInc">Observações</Label>
              <Textarea id="observacoesInc" placeholder="Detalhes sobre a doação ou incorporação..." />
            </div>
            <div className="flex gap-4">
              <Button className="flex-1">Salvar Incorporação</Button>
              <Button variant="outline" onClick={() => navigate("/")}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CadastrarIncorporacao;
