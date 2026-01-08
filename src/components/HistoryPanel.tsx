import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

interface HistoryItem {
  description: string;
  date?: string;
}

const historyData: HistoryItem[] = [
  { description: "Transferência para Almoxarifado" },
  { description: "Baixa de Computador", date: "23/10" },
  { description: "Alteração de Responsável", date: "25/09" },
  { description: "Item Extraviado", date: "25/09" },
];

const HistoryPanel = () => {
  return (
    <Card className="p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          Histórico de Movimentações
        </h3>
        <Heart className="w-5 h-5 text-primary/40" />
      </div>
      
      <div className="space-y-3">
        {historyData.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-card-foreground">• {item.description}</span>
            {item.date && (
              <span className="text-muted-foreground">{item.date}</span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HistoryPanel;
