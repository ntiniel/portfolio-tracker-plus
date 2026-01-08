import { Settings, ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Itens", href: "#" },
  { label: "Auditoria", href: "#" },
  { label: "Relatórios", href: "#" },
  { label: "Exportar Dados", href: "#" },
];

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-lg font-semibold">Sistema de Gestão de Patrimônio</span>
        </div>
        
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary-foreground/80 ${
                item.active ? "text-primary-foreground" : "text-primary-foreground/70"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span>Olá, Administrador</span>
          <ChevronDown className="w-4 h-4" />
        </div>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
