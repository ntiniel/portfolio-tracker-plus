import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Upload, ArrowUpDown, FileSpreadsheet, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface ConciliacaoRecord {
  numeroEmpenho: string;
  bensEmpenhados: string;
  valores: string;
  dataEmpenho: string;
  processoAdm: string;
  valorBaixa: string;
  saldoNaoLiquidados: string;
  baixaDataNota: string;
  contaCategoria: string;
  observacao: string;
  dataLancamento: string;
  dataLiquidado: string;
  condicao: string;
  dataLancamentoPlanilha: string;
  prioridadeAnteriores: string;
  valorBaixaReal: string;
  numeroContrato: string;
  numeroReempenho: string;
}

const CSV_HEADERS = [
  "Nº EMPENHO",
  "BENS EMPENHADOS E NÃO LIQUIDADOS ANOS ANTERIORES",
  "VALORES",
  "DT. EMP.",
  "PROC. ADM",
  "VALOR BAIXA",
  "SALDO DE NÃO LIQUIDADOS",
  "BAIXA: DATA DA NOTA",
  "CONTA/CATEGORIA",
  "OBS",
  "DATA LANÇAMENTO",
  "DATA LIQUIDADO",
  "CONDIÇÃO",
  "DATA DO LANÇAMENTO NA PLANILHA",
  "PRIORIDADE ANTERIORES LIQUIDADAS NESTE MÊS",
  "VALOR BAIXA REAL",
  "NÚMERO DO CONTRATO",
  "NÚMERO DO REEMPENHO"
];

const Conciliacao = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<ConciliacaoRecord[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof ConciliacaoRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem('conciliacao_data');
    if (data) {
      try {
        setRecords(JSON.parse(data));
      } catch {
        setRecords([]);
      }
    }
  };

  const handleSort = (column: keyof ConciliacaoRecord) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedRecords = [...records].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn] || '';
    const bVal = b[sortColumn] || '';
    const comparison = aVal.localeCompare(bVal, 'pt-BR', { numeric: true });
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const filteredRecords = sortedRecords.filter(record =>
    Object.values(record).some(value =>
      value?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDownloadCSV = () => {
    const csvContent = [
      CSV_HEADERS.join(';'),
      ...records.map(record => [
        record.numeroEmpenho,
        record.bensEmpenhados,
        record.valores,
        record.dataEmpenho,
        record.processoAdm,
        record.valorBaixa,
        record.saldoNaoLiquidados,
        record.baixaDataNota,
        record.contaCategoria,
        record.observacao,
        record.dataLancamento,
        record.dataLiquidado,
        record.condicao,
        record.dataLancamentoPlanilha,
        record.prioridadeAnteriores,
        record.valorBaixaReal,
        record.numeroContrato,
        record.numeroReempenho
      ].join(';'))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'conciliacao.csv';
    link.click();
    toast.success('Arquivo CSV baixado com sucesso!');
  };

  const handleUploadCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length <= 1) {
          toast.error('Arquivo CSV vazio ou inválido');
          return;
        }

        const newRecords: ConciliacaoRecord[] = lines.slice(1).map(line => {
          const values = line.split(';');
          return {
            numeroEmpenho: values[0] || '',
            bensEmpenhados: values[1] || '',
            valores: values[2] || '',
            dataEmpenho: values[3] || '',
            processoAdm: values[4] || '',
            valorBaixa: values[5] || '',
            saldoNaoLiquidados: values[6] || '',
            baixaDataNota: values[7] || '',
            contaCategoria: values[8] || '',
            observacao: values[9] || '',
            dataLancamento: values[10] || '',
            dataLiquidado: values[11] || '',
            condicao: values[12] || '',
            dataLancamentoPlanilha: values[13] || '',
            prioridadeAnteriores: values[14] || '',
            valorBaixaReal: values[15] || '',
            numeroContrato: values[16] || '',
            numeroReempenho: values[17] || ''
          };
        });

        setRecords(newRecords);
        localStorage.setItem('conciliacao_data', JSON.stringify(newRecords));
        toast.success(`${newRecords.length} registros carregados com sucesso!`);
      } catch {
        toast.error('Erro ao processar arquivo CSV');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const SortableHeader = ({ column, label }: { column: keyof ConciliacaoRecord; label: string }) => (
    <TableHead 
      className="cursor-pointer hover:bg-primary/10 transition-colors whitespace-nowrap"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className="h-3 w-3" />
      </div>
    </TableHead>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-background">
      <Header />
      
      <main className="p-6 max-w-[98%] mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4 hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm animate-fade-in">
          <CardHeader className="pb-4 border-b border-border/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-2xl font-semibold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                </div>
                Conciliação
              </CardTitle>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-64 bg-muted/20 border-primary/20"
                  />
                </div>
                
                <input
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={handleUploadCSV}
                  className="hidden"
                />
                <Button 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2 border-2 border-primary/30 hover:bg-primary/10"
                >
                  <Upload className="h-4 w-4" />
                  Carregar CSV
                </Button>
                <Button 
                  onClick={handleDownloadCSV}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  <Download className="h-4 w-4" />
                  Baixar CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5">
                    <SortableHeader column="numeroEmpenho" label="Nº Empenho" />
                    <SortableHeader column="bensEmpenhados" label="Bens Emp. Não Liq." />
                    <SortableHeader column="valores" label="Valores" />
                    <SortableHeader column="dataEmpenho" label="Dt. Emp." />
                    <SortableHeader column="processoAdm" label="Proc. Adm" />
                    <SortableHeader column="valorBaixa" label="Valor Baixa" />
                    <SortableHeader column="saldoNaoLiquidados" label="Saldo Não Liq." />
                    <SortableHeader column="baixaDataNota" label="Baixa: Data Nota" />
                    <SortableHeader column="contaCategoria" label="Conta/Categoria" />
                    <SortableHeader column="observacao" label="Obs" />
                    <SortableHeader column="dataLancamento" label="Data Lanç." />
                    <SortableHeader column="dataLiquidado" label="Data Liquidado" />
                    <SortableHeader column="condicao" label="Condição" />
                    <SortableHeader column="dataLancamentoPlanilha" label="Data Lanç. Planilha" />
                    <SortableHeader column="prioridadeAnteriores" label="Prio. Ant. Liq." />
                    <SortableHeader column="valorBaixaReal" label="Valor Baixa Real" />
                    <SortableHeader column="numeroContrato" label="Nº Contrato" />
                    <SortableHeader column="numeroReempenho" label="Nº Reempenho" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={18} className="text-center py-12 text-muted-foreground">
                        <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 opacity-30" />
                        <p className="text-lg">Nenhum registro encontrado</p>
                        <p className="text-sm mt-1">Adicione registros pelo Cadastro de Empenhados ou carregue um arquivo CSV</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRecords.map((record, index) => (
                      <TableRow key={index} className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-medium">{record.numeroEmpenho}</TableCell>
                        <TableCell>{record.bensEmpenhados}</TableCell>
                        <TableCell>{record.valores}</TableCell>
                        <TableCell>{record.dataEmpenho}</TableCell>
                        <TableCell>{record.processoAdm}</TableCell>
                        <TableCell>{record.valorBaixa}</TableCell>
                        <TableCell>{record.saldoNaoLiquidados}</TableCell>
                        <TableCell>{record.baixaDataNota}</TableCell>
                        <TableCell>{record.contaCategoria}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={record.observacao}>{record.observacao}</TableCell>
                        <TableCell>{record.dataLancamento}</TableCell>
                        <TableCell>{record.dataLiquidado}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                            {record.condicao}
                          </span>
                        </TableCell>
                        <TableCell>{record.dataLancamentoPlanilha}</TableCell>
                        <TableCell>{record.prioridadeAnteriores}</TableCell>
                        <TableCell>{record.valorBaixaReal}</TableCell>
                        <TableCell>{record.numeroContrato}</TableCell>
                        <TableCell>{record.numeroReempenho}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            
            {records.length > 0 && (
              <div className="p-4 border-t border-border/50 bg-muted/20">
                <p className="text-sm text-muted-foreground">
                  Total: <span className="font-semibold text-foreground">{filteredRecords.length}</span> registros
                  {searchTerm && ` (de ${records.length} total)`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Conciliacao;
