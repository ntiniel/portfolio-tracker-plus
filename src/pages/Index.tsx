import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Package, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Sistema de Controle Patrimonial
          </h1>
          <p className="text-muted-foreground">
            Selecione uma opção para começar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cadastrar Empenhados */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Cadastrar Empenhados</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Registre empenhos de bens adquiridos com recursos próprios da prefeitura
              </p>
              <Button 
                className="w-full"
                onClick={() => navigate("/cadastrar-empenhados")}
              >
                Acessar
              </Button>
            </CardContent>
          </Card>

          {/* Cadastrar Registro de Bens */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Package className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Cadastrar Registro de Bens</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Registre bens móveis adquiridos pela prefeitura com recursos próprios
              </p>
              <Button 
                className="w-full"
                onClick={() => navigate("/cadastrar-registro-bens")}
              >
                Acessar
              </Button>
            </CardContent>
          </Card>

          {/* Cadastrar Incorporação */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Gift className="h-10 w-10 text-accent-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Cadastrar Incorporação</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Registre bens recebidos por doação, transferência ou permuta
              </p>
              <Button 
                variant="secondary"
                className="w-full"
                onClick={() => navigate("/cadastrar-incorporacao")}
              >
                Acessar
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
