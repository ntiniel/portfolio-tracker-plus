import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, User, Calendar, FileText, Building2, Package, TrendingDown, History, Printer } from "lucide-react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import StatusBadge from "@/components/StatusBadge";
import MovementTimeline from "@/components/MovementTimeline";
import { getItemById, formatCurrency, formatDate } from "@/data/inventoryData";

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = getItemById(id || "");

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="p-6 max-w-7xl mx-auto">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Item não encontrado.</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate("/itens")}>
              Voltar para Itens
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  const depreciacaoPercentual = item.valor > 0 
    ? (((item.valor - item.valorAtual) / item.valor) * 100).toFixed(1) 
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="p-6 max-w-7xl mx-auto">
        {/* Back Button & Actions */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate("/itens")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Itens
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            Imprimir Ficha
          </Button>
        </div>

        {/* Header Card */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <img
                  src={item.foto}
                  alt={item.descricao}
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                />
              </div>
            </div>

            {/* Main Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-mono text-lg text-primary font-semibold mb-1">
                    {item.patrimonio}
                  </p>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {item.descricao}
                  </h1>
                  <StatusBadge status={item.status} />
                </div>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {item.descricaoCompleta}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Categoria</p>
                    <p className="font-medium text-foreground">{item.categoria}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Localização</p>
                    <p className="font-medium text-foreground">{item.localizacao}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Responsável</p>
                    <p className="font-medium text-foreground">{item.responsavel || "Não atribuído"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Secretaria</p>
                    <p className="font-medium text-foreground">{item.secretaria}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="geral" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="geral">Dados Gerais</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
            <TabsTrigger value="movimentacoes">Movimentações</TabsTrigger>
          </TabsList>

          {/* Dados Gerais */}
          <TabsContent value="geral">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Identificação do Bem
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Número de Patrimônio</span>
                    <span className="font-mono font-medium text-foreground">{item.patrimonio}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Marca</span>
                    <span className="font-medium text-foreground">{item.marca}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Modelo</span>
                    <span className="font-medium text-foreground">{item.modelo}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Número de Série</span>
                    <span className="font-mono text-sm text-foreground">{item.numeroSerie}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Categoria</span>
                    <span className="font-medium text-foreground">{item.categoria}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Status</span>
                    <StatusBadge status={item.status} size="sm" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Localização e Responsabilidade
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Secretaria</span>
                    <span className="font-medium text-foreground">{item.secretaria}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Localização</span>
                    <span className="font-medium text-foreground">{item.localizacao}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Setor</span>
                    <span className="font-medium text-foreground">{item.setor}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Responsável</span>
                    <span className="font-medium text-foreground">{item.responsavel || "Não atribuído"}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Aquisição
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Data de Aquisição</span>
                    <span className="font-medium text-foreground">{formatDate(item.dataAquisicao)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Nota Fiscal</span>
                    <span className="font-mono text-foreground">{item.notaFiscal}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Fornecedor</span>
                    <span className="font-medium text-foreground">{item.fornecedor}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold text-foreground mb-4">Observações</h3>
                <p className="text-muted-foreground leading-relaxed">{item.observacoes}</p>
              </Card>
            </div>
          </TabsContent>

          {/* Financeiro */}
          <TabsContent value="financeiro">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-muted-foreground">Valor de Aquisição</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{formatCurrency(item.valor)}</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-emerald-500" />
                  </div>
                  <span className="text-muted-foreground">Valor Atual</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{formatCurrency(item.valorAtual)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Depreciação: {depreciacaoPercentual}%
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-muted-foreground">Depreciação Mensal</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{formatCurrency(item.depreciacaoMensal)}</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Detalhes Financeiros</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Valor Original</span>
                    <span className="font-medium text-foreground">{formatCurrency(item.valor)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Depreciação Acumulada</span>
                    <span className="font-medium text-destructive">
                      -{formatCurrency(item.valor - item.valorAtual)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Valor Contábil Atual</span>
                    <span className="font-bold text-foreground">{formatCurrency(item.valorAtual)}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Método de Depreciação</span>
                    <span className="font-medium text-foreground">{item.metodoDepreciacao}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Taxa Mensal</span>
                    <span className="font-medium text-foreground">{formatCurrency(item.depreciacaoMensal)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Data Base</span>
                    <span className="font-medium text-foreground">{formatDate(item.dataAquisicao)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Movimentações */}
          <TabsContent value="movimentacoes">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                Histórico de Movimentações
              </h3>
              <MovementTimeline movements={item.movimentacoes} />
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ItemDetail;
