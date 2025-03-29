
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, History, File, Link as LinkIcon, MessageSquare, Phone, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Mock history data
const mockScanHistory = [
  { id: 1, type: 'file', name: 'document.pdf', date: '2023-07-15', status: 'clean' },
  { id: 2, type: 'url', name: 'https://example.com', date: '2023-07-14', status: 'threat' },
  { id: 3, type: 'message', name: 'Email from support@example.com', date: '2023-07-12', status: 'clean' },
  { id: 4, type: 'link', name: 'Multiple links (5)', date: '2023-07-10', status: 'clean' },
  { id: 5, type: 'phone', name: '+1234567890', date: '2023-07-08', status: 'threat' },
];

const DashboardPage = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [scanHistory, setScanHistory] = useState(mockScanHistory);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Get user info
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
    
    // In a real app, you would fetch the user's scan history from your backend
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-scanberry-background">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-scanberry-primary flex items-center">
            <Shield className="mr-2" />
            ScanBerry Harbor
          </Link>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {userEmail || 'User'}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center"
              onClick={handleLogout}
            >
              <LogOut className="mr-1 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <File className="mr-2 h-4 w-4 text-scanberry-primary" />
                File Scanning
              </CardTitle>
              <CardDescription>
                Upload and scan files for threats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/">
                <Button className="w-full">Scan a File</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <LinkIcon className="mr-2 h-4 w-4 text-scanberry-primary" />
                URL Scanning
              </CardTitle>
              <CardDescription>
                Check websites for malicious content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/url-scan">
                <Button className="w-full">Scan a URL</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <MessageSquare className="mr-2 h-4 w-4 text-scanberry-primary" />
                Message Analysis
              </CardTitle>
              <CardDescription>
                Analyze messages for phishing attempts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/message-analysis">
                <Button className="w-full">Analyze a Message</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <LinkIcon className="mr-2 h-4 w-4 text-scanberry-primary" />
                Link Analysis
              </CardTitle>
              <CardDescription>
                Check multiple links at once
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/link-analysis">
                <Button className="w-full">Analyze Links</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Phone className="mr-2 h-4 w-4 text-scanberry-primary" />
                Phone Number Analysis
              </CardTitle>
              <CardDescription>
                Check if a phone number is associated with spam
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/phone-analysis">
                <Button className="w-full">Analyze Phone Number</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <History className="mr-2 h-5 w-5" /> Your Scan History
          </h2>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="file">Files</TabsTrigger>
              <TabsTrigger value="url">URLs</TabsTrigger>
              <TabsTrigger value="message">Messages</TabsTrigger>
              <TabsTrigger value="phone">Phone Numbers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {scanHistory.map((scan) => (
                      <tr key={scan.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {scan.type === 'file' && <File className="h-4 w-4 text-scanberry-primary mr-2" />}
                            {scan.type === 'url' && <LinkIcon className="h-4 w-4 text-scanberry-primary mr-2" />}
                            {scan.type === 'message' && <MessageSquare className="h-4 w-4 text-scanberry-primary mr-2" />}
                            {scan.type === 'link' && <LinkIcon className="h-4 w-4 text-scanberry-primary mr-2" />}
                            {scan.type === 'phone' && <Phone className="h-4 w-4 text-scanberry-primary mr-2" />}
                            <span className="text-sm text-gray-900 capitalize">{scan.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {scan.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {scan.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                            scan.status === 'clean' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {scan.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="file">
              <div className="bg-white rounded-lg shadow-sm p-4">
                {scanHistory.filter(scan => scan.type === 'file').length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {scanHistory.filter(scan => scan.type === 'file').map((scan) => (
                        <tr key={scan.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {scan.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {scan.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                              scan.status === 'clean' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {scan.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 text-center py-4">No file scans in your history.</p>
                )}
              </div>
            </TabsContent>
            
            {/* Similar content for other tabs */}
            <TabsContent value="url">
              <div className="bg-white rounded-lg shadow-sm p-4">
                {scanHistory.filter(scan => scan.type === 'url').length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {scanHistory.filter(scan => scan.type === 'url').map((scan) => (
                        <tr key={scan.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {scan.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {scan.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                              scan.status === 'clean' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {scan.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 text-center py-4">No URL scans in your history.</p>
                )}
              </div>
            </TabsContent>
            
            {/* Additional tab content would be similar */}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
