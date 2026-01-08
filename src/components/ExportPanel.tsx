import { Heart, FileSpreadsheet, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ExportPanel = () => {
  return (
    <Card className="p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          Exportar Dados
        </h3>
        <Heart className="w-5 h-5 text-primary/40" />
      </div>
      
      <div className="space-y-3">
        <Button 
          variant="secondary" 
          className="w-full justify-start gap-3"
        >
          <FileSpreadsheet className="w-5 h-5" />
          Exportar Excel
        </Button>
        
        <Button 
          variant="secondary" 
          className="w-full justify-start gap-3"
        >
          <FileText className="w-5 h-5" />
          Exportar PDF
        </Button>
      </div>
    </Card>
  );
};

export default ExportPanel;
