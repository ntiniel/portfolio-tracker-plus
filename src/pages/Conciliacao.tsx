import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Upload, ArrowUpDown, FileSpreadsheet, Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ConciliacaoRecord {
  id: string;
  numero_empenho: string;
  bens_empenhados: string;
  valores: string;
  data_empenho: string | null;
  processo_adm: string;
  valor_baixa: string;
  saldo_nao_liquidados: string;
  baixa_data_nota: string;
  conta_categoria: string;
  observacao: string;
  data_lancamento: string;
  data_liquidado: string;
  condicao: string;
  data_lancamento_planilha: string;
  prioridade_anteriores: string;
  valor_baixa_real: string;
  numero_contrato: string;
  numero_reempenho: string;
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
  const { user } = useAuth();
  const [records, setRecords] = useState<ConciliacaoRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState<keyof ConciliacaoRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadFromDatabase();
  }, []);

  const loadFromDatabase = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('conciliacao_records')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading records:', error);
        toast.error('Erro ao carregar registros');
        setRecords([]);
      } else {
        setRecords(data || []);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Erro inesperado ao carregar dados');
      setRecords([]);
    } finally {
      setLoading(false);
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
    const comparison = String(aVal).localeCompare(String(bVal), 'pt-BR', { numeric: true });
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const filteredRecords = sortedRecords.filter(record =>
    Object.values(record).some(value =>
      String(value || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDownloadCSV = () => {
    const csvContent = [
      CSV_HEADERS.join(';'),
      ...records.map(record => [
        record.numero_empenho,
        record.bens_empenhados,
        record.valores,
        record.data_empenho,
        record.processo_adm,
        record.valor_baixa,
        record.saldo_nao_liquidados,
        record.baixa_data_nota,
        record.conta_categoria,
        record.observacao,
        record.data_lancamento,
        record.data_liquidado,
        record.condicao,
        record.data_lancamento_planilha,
        record.prioridade_anteriores,
        record.valor_baixa_real,
        record.numero_contrato,
        record.numero_reempenho
      ].join(';'))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'conciliacao.csv';
    link.click();
    toast.success('Arquivo CSV baixado com sucesso!');
  };

  const handleUploadCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!user) {
      toast.error('Você precisa estar logado para importar dados');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length <= 1) {
          toast.error('Arquivo CSV vazio ou inválido');
          return;
        }

        const newRecords = lines.slice(1).map(line => {
          const values = line.split(';');
          return {
            numero_empenho: (values[0] || '').trim().slice(0, 50),
            bens_empenhados: (values[1] || '').trim().slice(0, 500),
            valores: (values[2] || '').trim().slice(0, 50),
            data_empenho: values[3] ? values[3].trim() : null,
            processo_adm: (values[4] || '').trim().slice(0, 100),
            valor_baixa: (values[5] || '').trim().slice(0, 50),
            saldo_nao_liquidados: (values[6] || '').trim().slice(0, 50),
            baixa_data_nota: (values[7] || '').trim().slice(0, 50),
            conta_categoria: (values[8] || '').trim().slice(0, 200),
            observacao: (values[9] || '').trim().slice(0, 1000),
            data_lancamento: (values[10] || '').trim().slice(0, 20),
            data_liquidado: (values[11] || '').trim().slice(0, 20),
            condicao: (values[12] || '').trim().slice(0, 50),
            data_lancamento_planilha: (values[13] || '').trim().slice(0, 50),
            prioridade_anteriores: (values[14] || '').trim().slice(0, 50),
            valor_baixa_real: (values[15] || '').trim().slice(0, 50),
            numero_contrato: (values[16] || '').trim().slice(0, 50),
            numero_reempenho: (values[17] || '').trim().slice(0, 50),
            created_by: user.id
          };
        }).filter(record => record.numero_empenho); // Filter out empty records

        if (newRecords.length === 0) {
          toast.error('Nenhum registro válido encontrado no CSV');
          return;
        }

        // Insert records into database
        const { error } = await supabase
          .from('conciliacao_records')
          .insert(newRecords);

        if (error) {
          console.error('Error inserting records:', error);
          toast.error('Erro ao importar registros: ' + error.message);
        } else {
          toast.success(`${newRecords.length} registros importados com sucesso!`);
          loadFromDatabase(); // Reload data
        }
      } catch (error) {
        console.error('Error processing CSV:', error);
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
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/5">
                      <SortableHeader column="numero_empenho" label="Nº Empenho" />
                      <SortableHeader column="bens_empenhados" label="Bens Emp. Não Liq." />
                      <SortableHeader column="valores" label="Valores" />
                      <SortableHeader column="data_empenho" label="Dt. Emp." />
                      <SortableHeader column="processo_adm" label="Proc. Adm" />
                      <SortableHeader column="valor_baixa" label="Valor Baixa" />
                      <SortableHeader column="saldo_nao_liquidados" label="Saldo Não Liq." />
                      <SortableHeader column="baixa_data_nota" label="Baixa: Data Nota" />
                      <SortableHeader column="conta_categoria" label="Conta/Categoria" />
                      <SortableHeader column="observacao" label="Obs" />
                      <SortableHeader column="data_lancamento" label="Data Lanç." />
                      <SortableHeader column="data_liquidado" label="Data Liquidado" />
                      <SortableHeader column="condicao" label="Condição" />
                      <SortableHeader column="data_lancamento_planilha" label="Data Lanç. Planilha" />
                      <SortableHeader column="prioridade_anteriores" label="Prio. Ant. Liq." />
                      <SortableHeader column="valor_baixa_real" label="Valor Baixa Real" />
                      <SortableHeader column="numero_contrato" label="Nº Contrato" />
                      <SortableHeader column="numero_reempenho" label="Nº Reempenho" />
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
                      filteredRecords.map((record) => (
                        <TableRow key={record.id} className="hover:bg-primary/5 transition-colors">
                          <TableCell className="font-medium">{record.numero_empenho}</TableCell>
                          <TableCell>{record.bens_empenhados}</TableCell>
                          <TableCell>{record.valores}</TableCell>
                          <TableCell>{record.data_empenho}</TableCell>
                          <TableCell>{record.processo_adm}</TableCell>
                          <TableCell>{record.valor_baixa}</TableCell>
                          <TableCell>{record.saldo_nao_liquidados}</TableCell>
                          <TableCell>{record.baixa_data_nota}</TableCell>
                          <TableCell>{record.conta_categoria}</TableCell>
                          <TableCell className="max-w-[200px] truncate" title={record.observacao}>{record.observacao}</TableCell>
                          <TableCell>{record.data_lancamento}</TableCell>
                          <TableCell>{record.data_liquidado}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                              {record.condicao}
                            </span>
                          </TableCell>
                          <TableCell>{record.data_lancamento_planilha}</TableCell>
                          <TableCell>{record.prioridade_anteriores}</TableCell>
                          <TableCell>{record.valor_baixa_real}</TableCell>
                          <TableCell>{record.numero_contrato}</TableCell>
                          <TableCell>{record.numero_reempenho}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
            
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
