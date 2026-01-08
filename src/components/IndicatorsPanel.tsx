import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Indicator {
  label: string;
  value: string | number;
}

const indicators: Indicator[] = [
  { label: "Depreciação Anual:", value: "8.5%" },
  { label: "Itens Obsoletos:", value: 25 },
  { label: "Em Manutenção:", value: 7 },
  { label: "Aguardando Baixa:", value: 12 },
];

const IndicatorsPanel = () => {
  return (
    <Card className="p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          Indicadores
        </h3>
        <Heart className="w-5 h-5 text-primary/40" />
      </div>
      
      <div className="space-y-3">
        {indicators.map((indicator, index) => (
          <div key={index} className="flex items-center justify-between text-sm bg-muted/50 rounded-md p-2">
            <span className="text-card-foreground">{indicator.label}</span>
            <span className="font-semibold text-card-foreground">{indicator.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default IndicatorsPanel;
