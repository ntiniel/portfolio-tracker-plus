import { Settings, ChevronDown, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Itens", href: "/itens" },
  { label: "Reconciliação", href: "/reconciliacao" },
  { label: "Auditoria", href: "#" },
  { label: "Relatórios", href: "#" },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso!');
    navigate('/login');
  };

  const displayName = user?.email?.split('@')[0] || 'Usuário';

  return (
    <header className="bg-primary text-primary-foreground px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-lg font-semibold">Sistema de Gestão de Patrimônio</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary-foreground/80",
                isActive(item.href)
                  ? "text-primary-foreground"
                  : "text-primary-foreground/70"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="hidden sm:flex items-center gap-2 text-sm text-primary-foreground hover:bg-primary-foreground/10"
            >
              <span>Olá, {displayName}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
