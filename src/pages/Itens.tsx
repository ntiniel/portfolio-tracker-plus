import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Grid3X3, List, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "@/components/StatusBadge";
import { inventoryData, formatCurrency, formatDate, StatusType, statusLabels } from "@/data/inventoryData";

const Itens = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const filteredItems = inventoryData.filter((item) => {
    const matchesSearch =
      item.patrimonio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.responsavel?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleItemClick = (id: string) => {
    navigate(`/itens/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Itens do Patrimônio</h1>
            <p className="text-muted-foreground">
              {filteredItems.length} itens encontrados
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por patrimônio, descrição ou responsável..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "table" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("table")}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Table View */}
        {viewMode === "table" && (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patrimônio</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Valor Atual</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleItemClick(item.id)}
                  >
                    <TableCell className="font-mono font-medium text-primary">
                      {item.patrimonio}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {item.descricao}
                    </TableCell>
                    <TableCell>
                      <div className="w-32">
                        <StatusBadge status={item.status} size="sm" />
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.localizacao}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(item.valorAtual)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.responsavel || "–"}
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="aspect-video bg-muted relative">
                  <img
                    src={item.foto}
                    alt={item.descricao}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <StatusBadge status={item.status} size="sm" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-mono text-sm text-primary mb-1">
                    {item.patrimonio}
                  </p>
                  <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">
                    {item.descricao}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.localizacao}</span>
                    <span className="font-medium">{formatCurrency(item.valorAtual)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Nenhum item encontrado com os filtros aplicados.</p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Itens;
