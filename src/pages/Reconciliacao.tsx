import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUploadZone } from '@/components/FileUploadZone';
import { ReconciliationSummary } from '@/components/ReconciliationSummary';
import { DivergenciasTable } from '@/components/DivergenciasTable';
import { 
  parsePatrimonioExcel, 
  parseFinancasExcel, 
  compareData, 
  exportReconciliationToExcel 
} from '@/lib/reconciliationUtils';
import type { ReconciliationResult } from '@/data/reconciliationTypes';
import { Loader2, Download, RefreshCw, FileSpreadsheet } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Reconciliacao() {
  const [patrimonioFile, setPatrimonioFile] = useState<File | null>(null);
  const [financasFile, setFinancasFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ReconciliationResult | null>(null);

  const handleCompare = async () => {
    if (!patrimonioFile || !financasFile) {
      toast({
        title: 'Arquivos necessários',
        description: 'Por favor, carregue ambos os arquivos para comparação.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    try {
      const [patrimonioData, financasData] = await Promise.all([
        parsePatrimonioExcel(patrimonioFile),
        parseFinancasExcel(financasFile),
      ]);

      if (patrimonioData.length === 0) {
        throw new Error('Nenhum dado encontrado na planilha do Patrimônio');
      }

      if (financasData.length === 0) {
        throw new Error('Nenhum dado encontrado no arquivo de Finanças');
      }

      const comparisonResult = compareData(patrimonioData, financasData);
      setResult(comparisonResult);

      toast({
        title: 'Análise concluída',
        description: `${comparisonResult.resumo.totalEmpenhos} empenhos analisados, ${comparisonResult.resumo.empenhosComDivergencia} divergências encontradas.`,
      });
    } catch (error) {
      toast({
        title: 'Erro na análise',
        description: error instanceof Error ? error.message : 'Erro ao processar os arquivos.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = () => {
    if (result) {
      exportReconciliationToExcel(result);
      toast({
        title: 'Exportação concluída',
        description: 'A planilha de reconciliação foi baixada.',
      });
    }
  };

  const handleReset = () => {
    setPatrimonioFile(null);
    setFinancasFile(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reconciliação de Dados</h1>
            <p className="text-muted-foreground">
              Compare planilhas do Patrimônio com relatórios de Finanças
            </p>
          </div>
          
          {result && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Nova Análise
              </Button>
              <Button onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Exportar Excel
              </Button>
            </div>
          )}
        </div>

        {!result ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Upload de Arquivos
              </CardTitle>
              <CardDescription>
                Carregue a planilha do Patrimônio (Excel) e o relatório de Finanças (Excel) para iniciar a comparação.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Planilha do Patrimônio</h3>
                  <FileUploadZone
                    onFileSelect={setPatrimonioFile}
                    accept=".xlsx,.xls"
                    label="Planilha do Patrimônio"
                    description="Arraste ou clique para enviar (.xlsx, .xls)"
                    file={patrimonioFile}
                    icon="excel"
                  />
                  <p className="text-xs text-muted-foreground">
                    Deve conter a aba "Situação Empenho" com colunas: Nº Empenho, Fornecedor, Valores, etc.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Relatório de Finanças</h3>
                  <FileUploadZone
                    onFileSelect={setFinancasFile}
                    accept=".xlsx,.xls"
                    label="Relatório de Finanças"
                    description="Arraste ou clique para enviar (.xlsx, .xls)"
                    file={financasFile}
                    icon="excel"
                  />
                  <p className="text-xs text-muted-foreground">
                    Deve conter colunas: Empenho, Data de Liquidação, Valor Liquidado, Categoria do Bem.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  onClick={handleCompare}
                  disabled={!patrimonioFile || !financasFile || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analisando...
                    </>
                  ) : (
                    'Iniciar Comparação'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <ReconciliationSummary result={result} />
            <DivergenciasTable divergencias={result.divergencias} />
          </div>
        )}
      </main>
    </div>
  );
}
