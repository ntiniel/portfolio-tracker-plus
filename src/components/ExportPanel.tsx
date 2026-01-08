import { Heart, FileSpreadsheet, FileText, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { inventoryData } from "@/data/inventoryData";
import { exportToExcel, exportToPDF } from "@/lib/exportUtils";

const ExportPanel = () => {
  const { toast } = useToast();
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const handleExportExcel = async () => {
    setIsExportingExcel(true);
    try {
      // Small delay for UX feedback
      await new Promise((resolve) => setTimeout(resolve, 500));
      exportToExcel(inventoryData, "inventario_patrimonio");
      toast({
        title: "Exportação concluída",
        description: "O arquivo Excel foi gerado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao exportar Excel:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível gerar o arquivo Excel.",
        variant: "destructive",
      });
    } finally {
      setIsExportingExcel(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      // Small delay for UX feedback
      await new Promise((resolve) => setTimeout(resolve, 500));
      exportToPDF(inventoryData, "inventario_patrimonio");
      toast({
        title: "Exportação concluída",
        description: "O arquivo PDF foi gerado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível gerar o arquivo PDF.",
        variant: "destructive",
      });
    } finally {
      setIsExportingPDF(false);
    }
  };

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
          onClick={handleExportExcel}
          disabled={isExportingExcel || isExportingPDF}
        >
          {isExportingExcel ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <FileSpreadsheet className="w-5 h-5" />
          )}
          {isExportingExcel ? "Exportando..." : "Exportar Excel"}
        </Button>

        <Button
          variant="secondary"
          className="w-full justify-start gap-3"
          onClick={handleExportPDF}
          disabled={isExportingExcel || isExportingPDF}
        >
          {isExportingPDF ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <FileText className="w-5 h-5" />
          )}
          {isExportingPDF ? "Exportando..." : "Exportar PDF"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        {inventoryData.length} itens serão exportados
      </p>
    </Card>
  );
};

export default ExportPanel;
