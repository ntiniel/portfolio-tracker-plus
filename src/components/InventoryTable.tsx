import { Settings, BarChart3, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import { AlertTriangle } from "lucide-react";

interface InventoryItem {
  status: "ativo" | "transferencia" | "baixado" | "extraviado";
  localizacao: string;
  valor: number;
  responsavel: string | null;
  pendencias: boolean;
}

const inventoryData: InventoryItem[] = [
  { status: "ativo", localizacao: "Prédio Central", valor: 2800000, responsavel: "Carlos Souza", pendencias: false },
  { status: "transferencia", localizacao: "Almoxarifado", valor: 400000, responsavel: "Mariana Lima", pendencias: true },
  { status: "baixado", localizacao: "Arquivo Inativo", valor: 300000, responsavel: null, pendencias: false },
  { status: "extraviado", localizacao: "Desconhecida", valor: 60000, responsavel: null, pendencias: true },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const InventoryTable = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-card-foreground">
          Visão Geral da Secretaria de Educação
        </h2>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-muted rounded-md transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-md transition-colors">
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-md transition-colors">
            <Send className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border">
            <TableHead className="text-card-foreground font-semibold">Status</TableHead>
            <TableHead className="text-card-foreground font-semibold">Localização</TableHead>
            <TableHead className="text-card-foreground font-semibold">Valor (R$)</TableHead>
            <TableHead className="text-card-foreground font-semibold">Responsável</TableHead>
            <TableHead className="text-card-foreground font-semibold">Pendências</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryData.map((item, index) => (
            <TableRow key={index} className="border-b border-border/50">
              <TableCell className="py-3">
                <div className="w-36">
                  <StatusBadge status={item.status} />
                </div>
              </TableCell>
              <TableCell className="text-card-foreground">{item.localizacao}</TableCell>
              <TableCell className="text-card-foreground font-medium">
                {formatCurrency(item.valor)}
              </TableCell>
              <TableCell className="text-card-foreground">
                {item.responsavel || "–"}
              </TableCell>
              <TableCell>
                {item.pendencias ? (
                  <span className="flex items-center gap-1 text-destructive font-medium">
                    <AlertTriangle className="w-4 h-4" />
                    Pendências
                  </span>
                ) : (
                  <span className="text-muted-foreground">–</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default InventoryTable;
