import { Heart, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  value: string;
  label: string;
  subtitle?: string;
  icon?: "heart" | "settings";
  variant?: "default" | "accent";
}

const KPICard = ({ value, label, subtitle, icon = "heart", variant = "default" }: KPICardProps) => {
  const Icon = icon === "heart" ? Heart : Settings;
  
  return (
    <Card className={cn(
      "p-6 relative overflow-hidden",
      variant === "accent" && "bg-accent"
    )}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-card-foreground">{value}</span>
            <span className="text-lg font-medium text-muted-foreground">{label}</span>
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <Icon className="w-8 h-8 text-primary/30" />
      </div>
    </Card>
  );
};

export default KPICard;
