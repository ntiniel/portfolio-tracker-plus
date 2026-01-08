import Header from "@/components/Header";
import KPICard from "@/components/KPICard";
import InventoryTable from "@/components/InventoryTable";
import HistoryPanel from "@/components/HistoryPanel";
import PendingPanel from "@/components/PendingPanel";
import IndicatorsPanel from "@/components/IndicatorsPanel";
import ExportPanel from "@/components/ExportPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-6 max-w-7xl mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard
            value="84%"
            label="Inventariado"
            subtitle="Base Esperada: 1,200"
            icon="settings"
          />
          <KPICard
            value="12%"
            label="Pendências Cadastrais"
            subtitle="142 Itens com Pendências"
          />
          <KPICard
            value="R$ 3,560,000,00"
            label=""
            subtitle="Valor Total"
          />
          <KPICard
            value="15"
            label="Itens Extraviados"
            variant="accent"
          />
        </div>
        
        {/* Inventory Table */}
        <div className="mb-6">
          <InventoryTable />
        </div>
        
        {/* Bottom Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <HistoryPanel />
          <PendingPanel />
          <IndicatorsPanel />
          <ExportPanel />
        </div>
      </main>
    </div>
  );
};

export default Index;
