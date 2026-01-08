import { Badge } from '@/components/ui/badge';
import type { Divergencia } from '@/data/reconciliationTypes';

interface DivergenciasBadgeProps {
  status: Divergencia['status'];
}

const statusConfig: Record<Divergencia['status'], { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  liquidado: { label: 'Liquidado', variant: 'default' },
  pendente: { label: 'Pendente', variant: 'secondary' },
  parcial: { label: 'Parcial', variant: 'outline' },
  nao_encontrado: { label: 'Não Encontrado', variant: 'destructive' },
};

export function DivergenciasBadge({ status }: DivergenciasBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

interface TipoBadgeProps {
  tipo: Divergencia['tipo'];
}

const tipoConfig: Record<Divergencia['tipo'], { label: string; className: string }> = {
  valor: { label: 'Valor', className: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  data: { label: 'Data', className: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  categoria: { label: 'Categoria', className: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  reempenho: { label: 'Reempenho', className: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
  ausente: { label: 'Ausente', className: 'bg-red-500/10 text-red-600 border-red-500/20' },
};

export function TipoBadge({ tipo }: TipoBadgeProps) {
  const config = tipoConfig[tipo];
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
