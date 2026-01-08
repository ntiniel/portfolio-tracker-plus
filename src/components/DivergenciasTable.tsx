import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DivergenciasBadge, TipoBadge } from './DivergenciasBadge';
import type { Divergencia } from '@/data/reconciliationTypes';

interface DivergenciasTableProps {
  divergencias: Divergencia[];
}

export function DivergenciasTable({ divergencias }: DivergenciasTableProps) {
  if (divergencias.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Nenhuma divergência encontrada! ✓</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Divergências Identificadas ({divergencias.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº Empenho</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead className="text-right">Valor Patrimônio</TableHead>
                <TableHead className="text-right">Valor Finanças</TableHead>
                <TableHead className="text-right">Diferença</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Observações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {divergencias.map((div, index) => (
                <TableRow key={`${div.numeroEmpenho}-${index}`}>
                  <TableCell className="font-medium">{div.numeroEmpenho}</TableCell>
                  <TableCell>{div.fornecedor}</TableCell>
                  <TableCell className="text-right">
                    {div.valorPatrimonio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell className="text-right">
                    {div.valorFinancas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${div.diferenca > 0 ? 'text-destructive' : ''}`}>
                    {div.diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell>
                    <DivergenciasBadge status={div.status} />
                  </TableCell>
                  <TableCell>
                    <TipoBadge tipo={div.tipo} />
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                    {div.observacoes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
