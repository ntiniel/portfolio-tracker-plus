import { cn } from "@/lib/utils";
import { StatusType } from "@/data/inventoryData";

interface StatusBadgeProps {
  status: StatusType;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  ativo: {
    label: "Ativo",
    className: "bg-emerald-500 text-primary-foreground",
  },
  transferencia: {
    label: "Em Transferência",
    className: "bg-orange-400 text-primary-foreground",
  },
  baixado: {
    label: "Baixado",
    className: "bg-amber-400 text-primary-foreground",
  },
  extraviado: {
    label: "Extraviado",
    className: "bg-purple-500 text-primary-foreground",
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium w-full justify-center",
      config.className
    )}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
