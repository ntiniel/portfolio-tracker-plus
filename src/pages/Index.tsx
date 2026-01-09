import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Package, Gift, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-background">
      <Header />
      
      <main className="p-6 max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
            Sistema de Controle Patrimonial
          </h1>
          <p className="text-muted-foreground text-lg">
            Selecione uma opção para começar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cadastrar Empenhados */}
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary/20 bg-card/80 backdrop-blur-sm animate-fade-in">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Cadastrar Empenhados</h2>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Registre empenhos de bens adquiridos com recursos próprios da prefeitura
              </p>
              <Button 
                className="w-full group-hover:shadow-md transition-all duration-300 bg-primary hover:bg-primary/90"
                onClick={() => navigate("/cadastrar-empenhados")}
              >
                Acessar
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Cadastrar Registro de Bens */}
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary/20 bg-card/80 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Package className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Cadastrar Registro de Bens</h2>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Registre bens móveis adquiridos pela prefeitura com recursos próprios
              </p>
              <Button 
                className="w-full group-hover:shadow-md transition-all duration-300 bg-primary hover:bg-primary/90"
                onClick={() => navigate("/cadastrar-registro-bens")}
              >
                Acessar
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Cadastrar Incorporação */}
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-accent-foreground/20 bg-card/80 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent-foreground/20 to-accent-foreground/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Gift className="h-10 w-10 text-accent-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Cadastrar Incorporação</h2>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Registre bens recebidos por doação, transferência ou permuta
              </p>
              <Button 
                variant="secondary"
                className="w-full group-hover:shadow-md transition-all duration-300"
                onClick={() => navigate("/cadastrar-incorporacao")}
              >
                Acessar
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
