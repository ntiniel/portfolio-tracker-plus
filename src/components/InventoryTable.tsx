import { Settings, BarChart3, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import { AlertTriangle } from "lucide-react";
import { inventoryData, formatCurrency, StatusType } from "@/data/inventoryData";

interface InventorySummary {
  status: StatusType;
  localizacao: string;
  valor: number;
  responsavel: string | null;
  pendencias: boolean;
}

// Group inventory by status for summary view
const getInventorySummary = (): InventorySummary[] => {
  const statusGroups: Record<StatusType, InventorySummary> = {
    ativo: { status: "ativo", localizacao: "Prédio Central", valor: 0, responsavel: null, pendencias: false },
    transferencia: { status: "transferencia", localizacao: "Almoxarifado", valor: 0, responsavel: null, pendencias: false },
    baixado: { status: "baixado", localizacao: "Arquivo Inativo", valor: 0, responsavel: null, pendencias: false },
    extraviado: { status: "extraviado", localizacao: "Desconhecida", valor: 0, responsavel: null, pendencias: false },
    manutencao: { status: "manutencao", localizacao: "Oficina", valor: 0, responsavel: null, pendencias: false },
    cedido: { status: "cedido", localizacao: "Externo", valor: 0, responsavel: null, pendencias: false },
  };

  inventoryData.forEach((item) => {
    const group = statusGroups[item.status];
    group.valor += item.valor;
    if (item.responsavel && !group.responsavel) {
      group.responsavel = item.responsavel;
    }
    if (item.pendencias) {
      group.pendencias = true;
    }
  });

  // Only return groups that have items
  return Object.values(statusGroups).filter(group => group.valor > 0);
};

const InventoryTable = () => {
  const summaryData = getInventorySummary();

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
          {summaryData.map((item, index) => (
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
