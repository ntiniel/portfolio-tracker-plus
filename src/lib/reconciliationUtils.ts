import * as XLSX from 'xlsx';
import type { EmpenhoPatrimonio, EmpenhoFinancas, Divergencia, ReconciliationResult } from '@/data/reconciliationTypes';

export function parsePatrimonioExcel(file: File): Promise<EmpenhoPatrimonio[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Try to find "Situação Empenho" sheet or use first sheet
        const sheetName = workbook.SheetNames.find(name => 
          name.toLowerCase().includes('situa') || 
          name.toLowerCase().includes('empenho')
        ) || workbook.SheetNames[0];
        
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        
        const empenhos: EmpenhoPatrimonio[] = jsonData.map((row: any) => ({
          numeroEmpenho: String(row['Nº Empenho'] || row['N Empenho'] || row['Empenho'] || row['NumeroEmpenho'] || '').trim(),
          fornecedor: String(row['Fornecedor'] || '').trim(),
          valor: parseFloat(String(row['Valores (R$)'] || row['Valor'] || row['Valores'] || 0).replace(/[^\d,.-]/g, '').replace(',', '.')) || 0,
          dataEmpenho: String(row['Data Empenho'] || row['DataEmpenho'] || ''),
          processoAdm: String(row['Processo ADM'] || row['ProcessoADM'] || ''),
          valorBaixa: parseFloat(String(row['Valor Baixa'] || 0).replace(/[^\d,.-]/g, '').replace(',', '.')) || 0,
          saldoNaoLiquidado: parseFloat(String(row['Saldo Não Liquidado'] || row['Saldo de Não Liquidados'] || 0).replace(/[^\d,.-]/g, '').replace(',', '.')) || 0,
          contaCategoria: String(row['Conta/Categoria'] || row['Categoria'] || ''),
          observacoes: String(row['Observações'] || row['Observacoes'] || ''),
          dataLancamento: String(row['Data Lançamento'] || ''),
          dataLiquidado: String(row['Data Liquidado'] || row['DataLiquidado'] || ''),
          condicao: String(row['Condição'] || row['Condicao'] || ''),
          dataLancamentoPlanilha: String(row['Data do Lançamento na Planilha'] || ''),
          valorBaixaReal: parseFloat(String(row['Valor Baixa Real'] || 0).replace(/[^\d,.-]/g, '').replace(',', '.')) || 0,
          numeroReempenho: String(row['Nº Reempenho'] || row['NumeroReempenho'] || row['Reempenho'] || '').trim(),
        })).filter(e => e.numeroEmpenho);
        
        resolve(empenhos);
      } catch (error) {
        reject(new Error('Erro ao processar planilha do Patrimônio'));
      }
    };
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsArrayBuffer(file);
  });
}

export function parseFinancasData(text: string): EmpenhoFinancas[] {
  const lines = text.split('\n').filter(line => line.trim());
  const empenhos: EmpenhoFinancas[] = [];
  
  for (const line of lines) {
    // Try to parse each line - adjust regex based on actual PDF format
    const match = line.match(/(\d+)\s+(\d{2}\/\d{2}\/\d{4})\s+([\d.,]+)\s+(.+)/);
    if (match) {
      empenhos.push({
        empenho: match[1],
        dataLiquidacao: match[2],
        valorLiquidado: parseFloat(match[3].replace(/\./g, '').replace(',', '.')) || 0,
        categoriaBem: match[4].trim(),
      });
    }
  }
  
  return empenhos;
}

export function parseFinancasExcel(file: File): Promise<EmpenhoFinancas[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        
        const empenhos: EmpenhoFinancas[] = jsonData.map((row: any) => ({
          empenho: String(row['Empenho'] || row['Nº Empenho'] || row['NumeroEmpenho'] || '').trim(),
          dataLiquidacao: String(row['Data de Liquidação'] || row['Data Liquidação'] || row['DataLiquidacao'] || ''),
          valorLiquidado: parseFloat(String(row['Valor Liquidado (R$)'] || row['Valor Liquidado'] || row['ValorLiquidado'] || 0).replace(/[^\d,.-]/g, '').replace(',', '.')) || 0,
          categoriaBem: String(row['Categoria do Bem'] || row['Categoria'] || ''),
        })).filter(e => e.empenho);
        
        resolve(empenhos);
      } catch (error) {
        reject(new Error('Erro ao processar arquivo de Finanças'));
      }
    };
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsArrayBuffer(file);
  });
}

export function compareData(
  patrimonioData: EmpenhoPatrimonio[],
  financasData: EmpenhoFinancas[]
): ReconciliationResult {
  const divergencias: Divergencia[] = [];
  let empenhosOk = 0;
  let valorTotalPatrimonio = 0;
  let valorTotalFinancas = 0;
  
  const financasMap = new Map<string, EmpenhoFinancas>();
  for (const fin of financasData) {
    financasMap.set(fin.empenho, fin);
    valorTotalFinancas += fin.valorLiquidado;
  }
  
  const processedEmpenhos = new Set<string>();
  
  for (const pat of patrimonioData) {
    valorTotalPatrimonio += pat.valor;
    processedEmpenhos.add(pat.numeroEmpenho);
    
    const fin = financasMap.get(pat.numeroEmpenho);
    
    if (!fin) {
      divergencias.push({
        numeroEmpenho: pat.numeroEmpenho,
        fornecedor: pat.fornecedor,
        valorPatrimonio: pat.valor,
        valorFinancas: 0,
        diferenca: pat.valor,
        status: 'nao_encontrado',
        observacoes: 'Empenho não encontrado no relatório de Finanças',
        tipo: 'ausente',
      });
      continue;
    }
    
    const diferenca = Math.abs(pat.valor - fin.valorLiquidado);
    
    if (diferenca > 0.01) {
      divergencias.push({
        numeroEmpenho: pat.numeroEmpenho,
        fornecedor: pat.fornecedor,
        valorPatrimonio: pat.valor,
        valorFinancas: fin.valorLiquidado,
        diferenca,
        status: pat.saldoNaoLiquidado > 0 ? 'parcial' : 'liquidado',
        observacoes: `Diferença de R$ ${diferenca.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        tipo: 'valor',
      });
    } else {
      empenhosOk++;
    }
    
    // Check for reempenho issues
    if (pat.numeroReempenho) {
      const reempenhoFin = financasMap.get(pat.numeroReempenho);
      if (!reempenhoFin) {
        divergencias.push({
          numeroEmpenho: pat.numeroEmpenho,
          fornecedor: pat.fornecedor,
          valorPatrimonio: pat.valor,
          valorFinancas: fin.valorLiquidado,
          diferenca: 0,
          status: 'pendente',
          observacoes: `Reempenho ${pat.numeroReempenho} não encontrado em Finanças`,
          tipo: 'reempenho',
        });
      }
    }
  }
  
  // Check for empenhos in Finanças but not in Patrimônio
  for (const fin of financasData) {
    if (!processedEmpenhos.has(fin.empenho)) {
      divergencias.push({
        numeroEmpenho: fin.empenho,
        fornecedor: '-',
        valorPatrimonio: 0,
        valorFinancas: fin.valorLiquidado,
        diferenca: fin.valorLiquidado,
        status: 'nao_encontrado',
        observacoes: 'Empenho presente em Finanças mas não no Patrimônio',
        tipo: 'ausente',
      });
    }
  }
  
  return {
    divergencias,
    resumo: {
      totalEmpenhos: patrimonioData.length,
      empenhosOk,
      empenhosComDivergencia: divergencias.length,
      valorTotalPatrimonio,
      valorTotalFinancas,
      diferencaTotal: Math.abs(valorTotalPatrimonio - valorTotalFinancas),
    },
    dataAnalise: new Date().toISOString(),
  };
}

export function exportReconciliationToExcel(result: ReconciliationResult, filename: string = 'reconciliacao') {
  const wb = XLSX.utils.book_new();
  
  // Divergências sheet
  const divergenciasData = result.divergencias.map(d => ({
    'Nº Empenho': d.numeroEmpenho,
    'Fornecedor': d.fornecedor,
    'Valor Patrimônio (R$)': d.valorPatrimonio,
    'Valor Finanças (R$)': d.valorFinancas,
    'Diferença (R$)': d.diferenca,
    'Status': d.status === 'liquidado' ? 'Liquidado' : 
              d.status === 'pendente' ? 'Pendente' : 
              d.status === 'parcial' ? 'Parcial' : 'Não Encontrado',
    'Tipo': d.tipo === 'valor' ? 'Diferença de Valor' :
            d.tipo === 'data' ? 'Data Inconsistente' :
            d.tipo === 'categoria' ? 'Categoria Divergente' :
            d.tipo === 'reempenho' ? 'Reempenho Não Vinculado' : 'Empenho Ausente',
    'Observações': d.observacoes,
  }));
  
  const wsDivergencias = XLSX.utils.json_to_sheet(divergenciasData);
  XLSX.utils.book_append_sheet(wb, wsDivergencias, 'Divergências');
  
  // Resumo sheet
  const resumoData = [
    { 'Métrica': 'Total de Empenhos Analisados', 'Valor': result.resumo.totalEmpenhos },
    { 'Métrica': 'Empenhos OK', 'Valor': result.resumo.empenhosOk },
    { 'Métrica': 'Empenhos com Divergência', 'Valor': result.resumo.empenhosComDivergencia },
    { 'Métrica': 'Valor Total Patrimônio', 'Valor': `R$ ${result.resumo.valorTotalPatrimonio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` },
    { 'Métrica': 'Valor Total Finanças', 'Valor': `R$ ${result.resumo.valorTotalFinancas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` },
    { 'Métrica': 'Diferença Total', 'Valor': `R$ ${result.resumo.diferencaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` },
    { 'Métrica': 'Data da Análise', 'Valor': new Date(result.dataAnalise).toLocaleString('pt-BR') },
  ];
  
  const wsResumo = XLSX.utils.json_to_sheet(resumoData);
  XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo');
  
  const date = new Date().toISOString().split('T')[0];
  XLSX.writeFile(wb, `${filename}_${date}.xlsx`);
}
