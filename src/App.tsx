import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Itens from "./pages/Itens";
import ItemDetail from "./pages/ItemDetail";
import Reconciliacao from "./pages/Reconciliacao";
import Conciliacao from "./pages/Conciliacao";
import CadastrarEmpenhados from "./pages/CadastrarEmpenhados";
import CadastrarRegistroBens from "./pages/CadastrarRegistroBens";
import CadastrarIncorporacao from "./pages/CadastrarIncorporacao";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/itens" element={<Itens />} />
          <Route path="/itens/:id" element={<ItemDetail />} />
          <Route path="/reconciliacao" element={<Reconciliacao />} />
          <Route path="/conciliacao" element={<Conciliacao />} />
          <Route path="/cadastrar-empenhados" element={<CadastrarEmpenhados />} />
          <Route path="/cadastrar-registro-bens" element={<CadastrarRegistroBens />} />
          <Route path="/cadastrar-incorporacao" element={<CadastrarIncorporacao />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
