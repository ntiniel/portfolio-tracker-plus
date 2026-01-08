import { ArrowRight, Package, RefreshCw, FileEdit, XCircle, Wrench } from "lucide-react";
import { Movement, movementTypeLabels, formatDate } from "@/data/inventoryData";
import { cn } from "@/lib/utils";

interface MovementTimelineProps {
  movements: Movement[];
}

const movementIcons: Record<Movement["type"], React.ReactNode> = {
  aquisicao: <Package className="w-4 h-4" />,
  transferencia: <RefreshCw className="w-4 h-4" />,
  alteracao: <FileEdit className="w-4 h-4" />,
  baixa: <XCircle className="w-4 h-4" />,
  manutencao: <Wrench className="w-4 h-4" />,
};

const movementColors: Record<Movement["type"], string> = {
  aquisicao: "bg-emerald-500",
  transferencia: "bg-blue-500",
  alteracao: "bg-amber-500",
  baixa: "bg-red-500",
  manutencao: "bg-purple-500",
};

const MovementTimeline = ({ movements }: MovementTimelineProps) => {
  // Sort movements by date (most recent first)
  const sortedMovements = [...movements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

      <div className="space-y-6">
        {sortedMovements.map((movement, index) => (
          <div key={movement.id} className="relative flex gap-4">
            {/* Icon */}
            <div
              className={cn(
                "relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-primary-foreground",
                movementColors[movement.type]
              )}
            >
              {movementIcons[movement.type]}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-foreground">
                  {movementTypeLabels[movement.type]}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(movement.date)}
                </span>
              </div>

              <p className="text-muted-foreground mb-2">{movement.description}</p>

              {movement.from && movement.to && (
                <div className="flex items-center gap-2 text-sm bg-muted/50 rounded-md px-3 py-2 w-fit">
                  <span className="text-foreground">{movement.from}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">{movement.to}</span>
                </div>
              )}

              <p className="text-xs text-muted-foreground mt-2">
                Por: {movement.user}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovementTimeline;
