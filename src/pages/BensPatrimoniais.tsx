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

interface BemPatrimonial {
  id: string;
  sequencia: number;
  equipamento_material: string;
  empenho: string;
  data_nf: string | null;
  cecam: string;
  n_nota: string;
  serie: string;
  valor_bem: number;
  pasta: string;
  data_pasta: string | null;
  categoria: string;
  secretaria: string;
  doador: string;
  local: string;
  condicao: string;
  obs: string;
  data_lancamento: string | null;
  data_liquidado: string;
  data_recebimento_nf_liquidacao: string | null;
  data_planilha: string | null;
  item: string;
  reempenho: string;
  status: string;
  fotos: string;
  inicio_patrimoniamento: string;
  fim_patrimoniamento: string;
  data_arquivamento: string | null;
  obs_pastas: string;
  caixa_arquivo: string;
  numero_processo: string;
  numero_patrimonio: string;
  quantidade: number;
}

const CSV_HEADERS = [
  "SEQUÊNCIA",
  "EQUIPAMENTO / MATERIAL",
  "EMPENHO",
  "DATA N.F",
  "CECAM",
  "N NOTA",
  "SERIE",
  "VALOR DO BEM",
  "PASTA",
  "DATA",
  "CATEGORIA",
  "SECRETARIA",
  "DOADOR",
  "LOCAL",
  "CONDIÇÃO",
  "OBS",
  "DATA LANÇAMENTO",
  "DATA LIQUIDADO",
  "DATA RECEBIMENTO NOTA F. OU LIQUIDAÇÃO",
  "DATA PLANILHA",
  "ITEM",
  "REEMPENHO",
  "STATUS",
  "FOTOS",
  "INÍCIO PATRIMONIAMENTO",
  "FIM PATRIMONIAMENTO",
  "DATA DO ARQUIVAMENTO",
  "OBS PASTAS",
  "CAIXA ARQUIVO",
  "NÚMERO DO PROCESSO",
  "NÚMERO PATRIMÔNIO",
  "QUANTIDADE"
];

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  } catch {
    return dateStr || '';
  }
};

const BensPatrimoniais = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [records, setRecords] = useState<BemPatrimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState<keyof BemPatrimonial | null>('sequencia');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadFromDatabase();
  }, []);

  const loadFromDatabase = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bens_patrimoniais')
        .select('*')
        .order('sequencia', { ascending: false });

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

  const handleSort = (column: keyof BemPatrimonial) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedRecords = [...records].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    const comparison = String(aVal || '').localeCompare(String(bVal || ''), 'pt-BR', { numeric: true });
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
        record.sequencia,
        record.equipamento_material,
        record.empenho,
        formatDate(record.data_nf),
        record.cecam,
        record.n_nota,
        record.serie,
        record.valor_bem,
        record.pasta,
        formatDate(record.data_pasta),
        record.categoria,
        record.secretaria,
        record.doador,
        record.local,
        record.condicao,
        record.obs,
        formatDate(record.data_lancamento),
        record.data_liquidado,
        formatDate(record.data_recebimento_nf_liquidacao),
        formatDate(record.data_planilha),
        record.item,
        record.reempenho,
        record.status,
        record.fotos,
        record.inicio_patrimoniamento,
        record.fim_patrimoniamento,
        formatDate(record.data_arquivamento),
        record.obs_pastas,
        record.caixa_arquivo,
        record.numero_processo,
        record.numero_patrimonio,
        record.quantidade
      ].join(';'))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'bd2026.csv';
    link.click();
    toast.success('Arquivo bd2026.csv baixado com sucesso!');
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
            equipamento_material: (values[1] || '').trim().slice(0, 500),
            empenho: (values[2] || '').trim().slice(0, 50),
            data_nf: values[3] ? values[3].trim() : null,
            cecam: (values[4] || '').trim().slice(0, 50),
            n_nota: (values[5] || '').trim().slice(0, 50),
            serie: (values[6] || '').trim().slice(0, 20),
            valor_bem: parseFloat(values[7]) || 0,
            pasta: (values[8] || '').trim().slice(0, 50),
            data_pasta: values[9] ? values[9].trim() : null,
            categoria: (values[10] || '').trim().slice(0, 200),
            secretaria: (values[11] || '').trim().slice(0, 200),
            doador: (values[12] || '').trim().slice(0, 200),
            local: (values[13] || '').trim().slice(0, 200),
            condicao: (values[14] || '').trim().slice(0, 50),
            obs: (values[15] || '').trim().slice(0, 1000),
            data_lancamento: values[16] ? values[16].trim() : null,
            data_liquidado: (values[17] || '').trim().slice(0, 50),
            data_recebimento_nf_liquidacao: values[18] ? values[18].trim() : null,
            data_planilha: values[19] ? values[19].trim() : null,
            item: (values[20] || '').trim().slice(0, 50),
            reempenho: (values[21] || '').trim().slice(0, 50),
            status: (values[22] || 'ATIVO').trim().slice(0, 50),
            fotos: (values[23] || '').trim().slice(0, 500),
            inicio_patrimoniamento: (values[24] || '').trim().slice(0, 50),
            fim_patrimoniamento: (values[25] || '').trim().slice(0, 50),
            data_arquivamento: values[26] ? values[26].trim() : null,
            obs_pastas: (values[27] || '').trim().slice(0, 500),
            caixa_arquivo: (values[28] || '').trim().slice(0, 50),
            numero_processo: (values[29] || '').trim().slice(0, 100),
            numero_patrimonio: (values[30] || '').trim().slice(0, 50),
            quantidade: parseInt(values[31]) || 1,
            created_by: user.id
          };
        }).filter(record => record.empenho && record.equipamento_material);

        if (newRecords.length === 0) {
          toast.error('Nenhum registro válido encontrado no CSV');
          return;
        }

        const { error } = await supabase
          .from('bens_patrimoniais')
          .insert(newRecords as any);

        if (error) {
          console.error('Error inserting records:', error);
          toast.error('Erro ao importar registros: ' + error.message);
        } else {
          toast.success(`${newRecords.length} registros importados com sucesso!`);
          loadFromDatabase();
        }
      } catch (error) {
        console.error('Error processing CSV:', error);
        toast.error('Erro ao processar arquivo CSV');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const SortableHeader = ({ column, label }: { column: keyof BemPatrimonial; label: string }) => (
    <TableHead 
      className="cursor-pointer hover:bg-primary/10 transition-colors whitespace-nowrap text-xs"
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
                Bens Patrimoniais (BD2026)
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
                  Baixar bd2026.csv
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/cadastrar-registro-bens')}
                  className="gap-2 border-2 border-primary/30 hover:bg-primary/10"
                >
                  Novo Cadastro
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
                      <SortableHeader column="sequencia" label="Seq." />
                      <SortableHeader column="numero_patrimonio" label="Patrimônio" />
                      <SortableHeader column="equipamento_material" label="Equipamento/Material" />
                      <SortableHeader column="empenho" label="Empenho" />
                      <SortableHeader column="valor_bem" label="Valor" />
                      <SortableHeader column="categoria" label="Categoria" />
                      <SortableHeader column="secretaria" label="Secretaria" />
                      <SortableHeader column="local" label="Local" />
                      <SortableHeader column="condicao" label="Condição" />
                      <SortableHeader column="status" label="Status" />
                      <SortableHeader column="data_nf" label="Data NF" />
                      <SortableHeader column="n_nota" label="Nº Nota" />
                      <SortableHeader column="pasta" label="Pasta" />
                      <SortableHeader column="numero_processo" label="Processo" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={14} className="text-center py-12 text-muted-foreground">
                          <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 opacity-30" />
                          <p className="text-lg">Nenhum registro encontrado</p>
                          <p className="text-sm mt-1">Adicione registros pelo Cadastro de Registro de Bens ou carregue um arquivo CSV</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRecords.map((record) => (
                        <TableRow key={record.id} className="hover:bg-primary/5 transition-colors">
                          <TableCell className="font-medium">{record.sequencia}</TableCell>
                          <TableCell>{record.numero_patrimonio}</TableCell>
                          <TableCell className="max-w-[200px] truncate" title={record.equipamento_material}>
                            {record.equipamento_material}
                          </TableCell>
                          <TableCell>{record.empenho}</TableCell>
                          <TableCell>R$ {record.valor_bem?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="max-w-[150px] truncate" title={record.categoria}>
                            {record.categoria}
                          </TableCell>
                          <TableCell>{record.secretaria}</TableCell>
                          <TableCell>{record.local}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                              {record.condicao}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              record.status === 'ATIVO' ? 'bg-green-100 text-green-700' :
                              record.status === 'BAIXADO' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {record.status}
                            </span>
                          </TableCell>
                          <TableCell>{formatDate(record.data_nf)}</TableCell>
                          <TableCell>{record.n_nota}</TableCell>
                          <TableCell>{record.pasta}</TableCell>
                          <TableCell>{record.numero_processo}</TableCell>
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

export default BensPatrimoniais;
