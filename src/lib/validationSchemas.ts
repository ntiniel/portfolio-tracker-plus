import { z } from 'zod';

// Validation schema for Empenhados form
export const empenhoSchema = z.object({
  numeroEmpenho: z.string()
    .min(1, 'Número do empenho é obrigatório')
    .max(50, 'Número do empenho deve ter no máximo 50 caracteres')
    .trim(),
  valor: z.string()
    .refine((val) => val === '' || !isNaN(parseFloat(val)), {
      message: 'Valor deve ser um número válido',
    })
    .refine((val) => val === '' || parseFloat(val) >= 0, {
      message: 'Valor não pode ser negativo',
    }),
  processoAdm: z.string()
    .max(100, 'Processo administrativo deve ter no máximo 100 caracteres')
    .trim(),
  mesLancamento: z.string()
    .max(20, 'Mês de lançamento inválido'),
  mesLiquidado: z.string()
    .max(20, 'Mês liquidado inválido'),
  valorBaixa: z.string()
    .refine((val) => val === '' || !isNaN(parseFloat(val)), {
      message: 'Valor da baixa deve ser um número válido',
    })
    .refine((val) => val === '' || parseFloat(val) >= 0, {
      message: 'Valor da baixa não pode ser negativo',
    }),
  condicao: z.string()
    .max(50, 'Condição inválida'),
  reempenhado: z.string()
    .max(50, 'Reempenhado deve ter no máximo 50 caracteres')
    .trim(),
  fornecedor: z.string()
    .max(200, 'Fornecedor deve ter no máximo 200 caracteres')
    .trim(),
  dataEmpenho: z.string()
    .refine((val) => val === '' || /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: 'Data do empenho deve estar no formato YYYY-MM-DD',
    }),
  contaCategoria: z.string()
    .max(200, 'Conta/Categoria inválida'),
  contrato: z.string()
    .max(50, 'Contrato deve ter no máximo 50 caracteres')
    .trim(),
  observacao: z.string()
    .max(1000, 'Observação deve ter no máximo 1000 caracteres')
    .trim(),
});

export type EmpenhoFormData = z.infer<typeof empenhoSchema>;

// Validation result helper
export interface ValidationResult {
  success: boolean;
  errors: Record<string, string>;
}

export function validateEmpenhoForm(data: unknown): ValidationResult {
  const result = empenhoSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, errors: {} };
  }
  
  const errors: Record<string, string> = {};
  result.error.errors.forEach((err) => {
    const path = err.path.join('.');
    errors[path] = err.message;
  });
  
  return { success: false, errors };
}
