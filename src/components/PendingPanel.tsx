import { Heart, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PendingItem {
  description: string;
  completed: boolean;
}

const pendingData: PendingItem[] = [
  { description: "Cadastro Incompleto", completed: true },
  { description: "Itens Não Localizados", completed: true },
  { description: "Etiqueta Danificada", completed: true },
];

const PendingPanel = () => {
  return (
    <Card className="p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          Pendências
        </h3>
        <Heart className="w-5 h-5 text-primary/40" />
      </div>
      
      <div className="mb-4">
        <span className="text-3xl font-bold text-card-foreground">142</span>
        <span className="text-sm text-muted-foreground ml-2">Itens com Pendências</span>
      </div>
      
      <div className="space-y-3">
        {pendingData.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-accent-foreground">{item.description}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PendingPanel;
