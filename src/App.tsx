
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
import ProfilePage from "./pages/ProfilePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AuthGuard from "./components/AuthGuard";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Scan features - publicly accessible */}
            <Route path="/file-scan" element={<Index />} />
            <Route path="/url-scan" element={<UrlScanPage />} />
            <Route path="/message-analysis" element={<MessageAnalysisPage />} />
            <Route path="/link-analysis" element={<LinkAnalysisPage />} />
            <Route path="/phone-analysis" element={<PhoneAnalysisPage />} />
            
            {/* Scan results - publicly accessible */}
            <Route path="/scan-result" element={<ScanResultPage />} />
            <Route path="/url-result" element={<UrlResultPage />} />
            <Route path="/message-result" element={<MessageResultPage />} />
            <Route path="/link-result" element={<LinkResultPage />} />
            <Route path="/phone-result" element={<PhoneResultPage />} />
            
            {/* Protected routes - require authentication */}
            <Route path="/dashboard" element={
              <AuthGuard requireAuth={true}>
                <DashboardPage />
              </AuthGuard>
            } />
            <Route path="/profile" element={
              <AuthGuard requireAuth={true}>
                <ProfilePage />
              </AuthGuard>
            } />
            <Route path="/admin" element={
              <AuthGuard requireAuth={true}>
                <AdminDashboardPage />
              </AuthGuard>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
