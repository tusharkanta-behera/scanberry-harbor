
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UrlScanPage from "./pages/UrlScanPage";
import MessageAnalysisPage from "./pages/MessageAnalysisPage";
import LinkAnalysisPage from "./pages/LinkAnalysisPage";
import ScanResultPage from "./pages/ScanResultPage";
import UrlResultPage from "./pages/UrlResultPage";
import MessageResultPage from "./pages/MessageResultPage";
import LinkResultPage from "./pages/LinkResultPage";
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
          <Route path="/url-scan" element={<UrlScanPage />} />
          <Route path="/message-analysis" element={<MessageAnalysisPage />} />
          <Route path="/link-analysis" element={<LinkAnalysisPage />} />
          <Route path="/scan-result" element={<ScanResultPage />} />
          <Route path="/url-result" element={<UrlResultPage />} />
          <Route path="/message-result" element={<MessageResultPage />} />
          <Route path="/link-result" element={<LinkResultPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
