import { cn } from "@/lib/utils";
import { StatusType, statusLabels, statusColors } from "@/data/inventoryData";

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "md";
}

const StatusBadge = ({ status, size = "md" }: StatusBadgeProps) => {
  const label = statusLabels[status];
  const colorClass = statusColors[status];

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium text-primary-foreground",
        colorClass,
        size === "sm" ? "px-2 py-1 text-xs" : "px-4 py-2 text-sm w-full"
      )}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
