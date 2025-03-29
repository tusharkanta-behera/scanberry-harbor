
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
import PhoneAnalysisPage from "./pages/PhoneAnalysisPage";
import PhoneResultPage from "./pages/PhoneResultPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AuthGuard from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          } />
          <Route path="/file-scan" element={
            <AuthGuard>
              <Index />
            </AuthGuard>
          } />
          <Route path="/url-scan" element={
            <AuthGuard>
              <UrlScanPage />
            </AuthGuard>
          } />
          <Route path="/message-analysis" element={
            <AuthGuard>
              <MessageAnalysisPage />
            </AuthGuard>
          } />
          <Route path="/link-analysis" element={
            <AuthGuard>
              <LinkAnalysisPage />
            </AuthGuard>
          } />
          <Route path="/phone-analysis" element={
            <AuthGuard>
              <PhoneAnalysisPage />
            </AuthGuard>
          } />
          
          {/* Result pages */}
          <Route path="/scan-result" element={
            <AuthGuard>
              <ScanResultPage />
            </AuthGuard>
          } />
          <Route path="/url-result" element={
            <AuthGuard>
              <UrlResultPage />
            </AuthGuard>
          } />
          <Route path="/message-result" element={
            <AuthGuard>
              <MessageResultPage />
            </AuthGuard>
          } />
          <Route path="/link-result" element={
            <AuthGuard>
              <LinkResultPage />
            </AuthGuard>
          } />
          <Route path="/phone-result" element={
            <AuthGuard>
              <PhoneResultPage />
            </AuthGuard>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
