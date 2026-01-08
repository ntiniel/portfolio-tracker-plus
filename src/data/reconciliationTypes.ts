export interface EmpenhoPatrimonio {
  numeroEmpenho: string;
  fornecedor: string;
  valor: number;
  dataEmpenho: string;
  processoAdm: string;
  valorBaixa: number;
  saldoNaoLiquidado: number;
  contaCategoria: string;
  observacoes: string;
  dataLancamento: string;
  dataLiquidado: string;
  condicao: string;
  dataLancamentoPlanilha: string;
  valorBaixaReal: number;
  numeroReempenho: string;
}

export interface BemPatrimoniado {
  numeroEmpenho: string;
  valor: number;
  categoria: string;
  dataAquisicao: string;
  numeroPatrimonio: string;
  descricao: string;
}

export interface EmpenhoFinancas {
  empenho: string;
  dataLiquidacao: string;
  valorLiquidado: number;
  categoriaBem: string;
}

export interface Divergencia {
  numeroEmpenho: string;
  fornecedor: string;
  valorPatrimonio: number;
  valorFinancas: number;
  diferenca: number;
  status: 'liquidado' | 'pendente' | 'parcial' | 'nao_encontrado';
  observacoes: string;
  tipo: 'valor' | 'data' | 'categoria' | 'reempenho' | 'ausente';
}

export interface ReconciliationResult {
  divergencias: Divergencia[];
  resumo: {
    totalEmpenhos: number;
    empenhosOk: number;
    empenhosComDivergencia: number;
    valorTotalPatrimonio: number;
    valorTotalFinancas: number;
    diferencaTotal: number;
  };
  dataAnalise: string;
}

export const statusLabels: Record<Divergencia['status'], string> = {
  liquidado: 'Liquidado',
  pendente: 'Pendente',
  parcial: 'Parcial',
  nao_encontrado: 'Não Encontrado',
};

export const tipoLabels: Record<Divergencia['tipo'], string> = {
  valor: 'Diferença de Valor',
  data: 'Data Inconsistente',
  categoria: 'Categoria Divergente',
  reempenho: 'Reempenho Não Vinculado',
  ausente: 'Empenho Ausente',
};
