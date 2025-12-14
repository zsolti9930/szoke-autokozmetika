import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Szolgaltatasok from "./pages/Szolgaltatasok";
import Galeria from "./pages/Galeria";
import Rolunk from "./pages/Rolunk";
import Kapcsolat from "./pages/Kapcsolat";
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
          <Route path="/szolgaltatasok" element={<Szolgaltatasok />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/rolunk" element={<Rolunk />} />
          <Route path="/kapcsolat" element={<Kapcsolat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;