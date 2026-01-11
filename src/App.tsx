import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Itens from "./pages/Itens";
import ItemDetail from "./pages/ItemDetail";
import Reconciliacao from "./pages/Reconciliacao";
import Conciliacao from "./pages/Conciliacao";
import CadastrarEmpenhados from "./pages/CadastrarEmpenhados";
import CadastrarRegistroBens from "./pages/CadastrarRegistroBens";
import CadastrarIncorporacao from "./pages/CadastrarIncorporacao";
import BensPatrimoniais from "./pages/BensPatrimoniais";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/itens" element={
              <ProtectedRoute>
                <Itens />
              </ProtectedRoute>
            } />
            <Route path="/itens/:id" element={
              <ProtectedRoute>
                <ItemDetail />
              </ProtectedRoute>
            } />
            <Route path="/reconciliacao" element={
              <ProtectedRoute>
                <Reconciliacao />
              </ProtectedRoute>
            } />
            <Route path="/conciliacao" element={
              <ProtectedRoute>
                <Conciliacao />
              </ProtectedRoute>
            } />
            <Route path="/cadastrar-empenhados" element={
              <ProtectedRoute>
                <CadastrarEmpenhados />
              </ProtectedRoute>
            } />
            <Route path="/cadastrar-registro-bens" element={
              <ProtectedRoute>
                <CadastrarRegistroBens />
              </ProtectedRoute>
            } />
            <Route path="/cadastrar-incorporacao" element={
              <ProtectedRoute>
                <CadastrarIncorporacao />
              </ProtectedRoute>
            } />
            <Route path="/bens-patrimoniais" element={
              <ProtectedRoute>
                <BensPatrimoniais />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
