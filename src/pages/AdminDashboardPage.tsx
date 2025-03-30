
import React, { useState, useEffect } from 'react';
import { 
  Users, User, Shield, Activity, Calendar, Search, 
  ChevronDown, MoreHorizontal, FileText, UserX, UserCheck,
  Settings, LogOut
} from 'lucide-react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';

// Sample data for demonstration
const mockUsers = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', status: 'active', role: 'user', lastLogin: '2023-10-20 14:30', scans: 23 },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', status: 'active', role: 'user', lastLogin: '2023-10-19 09:15', scans: 12 },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', status: 'inactive', role: 'user', lastLogin: '2023-10-10 11:45', scans: 5 },
  { id: 4, name: 'Dave Brown', email: 'dave@example.com', status: 'active', role: 'admin', lastLogin: '2023-10-20 16:20', scans: 45 },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', status: 'active', role: 'user', lastLogin: '2023-10-18 13:10', scans: 8 },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', status: 'inactive', role: 'user', lastLogin: '2023-09-30 10:00', scans: 0 },
  { id: 7, name: 'Grace Wilson', email: 'grace@example.com', status: 'active', role: 'user', lastLogin: '2023-10-17 08:30', scans: 17 },
];

// Calculate dates for analytics
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);

// Sample scan data for analytics
const mockScanData = {
  today: {
    total: 156,
    malicious: 23,
    clean: 133,
    byType: {
      file: 42,
      url: 78,
      message: 29,
      link: 7
    }
  },
  yesterday: {
    total: 143,
    malicious: 18,
    clean: 125,
    byType: {
      file: 38,
      url: 67,
      message: 31,
      link: 7
    }
  },
  lastWeek: {
    total: 892,
    malicious: 134,
    clean: 758,
    byType: {
      file: 245,
      url: 412,
      message: 178,
      link: 57
    }
  },
};

const AdminDashboardPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [scanData, setScanData] = useState(mockScanData.today);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if user has admin privileges
  useEffect(() => {
    // For demo purposes, we'll allow access for the current user
    // In a real app, you would check for admin role
    const isAdmin = true;
    
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "You don't have permissions to view the admin dashboard.",
      });
      navigate('/dashboard');
    }
  }, [navigate, toast]);
  
  // Update scan data based on selected time range
  useEffect(() => {
    if (selectedTimeRange === 'today') {
      setScanData(mockScanData.today);
    } else if (selectedTimeRange === 'yesterday') {
      setScanData(mockScanData.yesterday);
    } else if (selectedTimeRange === 'week') {
      setScanData(mockScanData.lastWeek);
    }
  }, [selectedTimeRange]);
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle user status toggle
  const handleToggleUserStatus = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        
        toast({
          title: `User ${newStatus}`,
          description: `${user.name} has been set to ${newStatus}.`,
        });
        
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users and monitor system activity</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Select
              value={selectedTimeRange}
              onValueChange={setSelectedTimeRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
              </SelectContent>
            </Select>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Dashboard Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/')}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-scanberry-primary/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">{users.length}</div>
                <div className="bg-scanberry-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-scanberry-primary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {users.filter(u => u.status === 'active').length} active users
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-scanberry-primary/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">{scanData.total}</div>
                <div className="bg-scanberry-primary/10 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-scanberry-primary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {scanData.malicious} threats detected
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-scanberry-success/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Clean Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">
                  {Math.round((scanData.clean / scanData.total) * 100)}%
                </div>
                <div className="bg-scanberry-success/10 p-3 rounded-full">
                  <Activity className="h-6 w-6 text-scanberry-success" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {scanData.clean} clean scans detected
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-scanberry-danger/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Threat Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">
                  {Math.round((scanData.malicious / scanData.total) * 100)}%
                </div>
                <div className="bg-scanberry-danger/10 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-scanberry-danger" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {scanData.malicious} threats identified
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Scan Distribution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Scan Distribution by Type</CardTitle>
            <CardDescription>
              Breakdown of scans performed by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex-1 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">File Scans</h3>
                  <span className="text-xs bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-300 py-1 px-2 rounded">
                    {Math.round((scanData.byType.file / scanData.total) * 100)}%
                  </span>
                </div>
                <div className="text-2xl font-bold">{scanData.byType.file}</div>
              </div>
              
              <div className="flex-1 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">URL Scans</h3>
                  <span className="text-xs bg-purple-100 dark:bg-purple-800/50 text-purple-800 dark:text-purple-300 py-1 px-2 rounded">
                    {Math.round((scanData.byType.url / scanData.total) * 100)}%
                  </span>
                </div>
                <div className="text-2xl font-bold">{scanData.byType.url}</div>
              </div>
              
              <div className="flex-1 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Message Scans</h3>
                  <span className="text-xs bg-green-100 dark:bg-green-800/50 text-green-800 dark:text-green-300 py-1 px-2 rounded">
                    {Math.round((scanData.byType.message / scanData.total) * 100)}%
                  </span>
                </div>
                <div className="text-2xl font-bold">{scanData.byType.message}</div>
              </div>
              
              <div className="flex-1 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Link Scans</h3>
                  <span className="text-xs bg-orange-100 dark:bg-orange-800/50 text-orange-800 dark:text-orange-300 py-1 px-2 rounded">
                    {Math.round((scanData.byType.link / scanData.total) * 100)}%
                  </span>
                </div>
                <div className="text-2xl font-bold">{scanData.byType.link}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* User Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage system users
                </CardDescription>
              </div>
              
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Scans</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} />
                          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-1 ${
                        user.status === 'active' 
                          ? 'text-scanberry-success' 
                          : 'text-scanberry-danger'
                      }`}>
                        <span className={`flex h-2 w-2 rounded-full ${
                          user.status === 'active' 
                            ? 'bg-scanberry-success' 
                            : 'bg-scanberry-danger'
                        }`} />
                        <span className="capitalize">{user.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin' 
                          ? 'bg-scanberry-primary/10 text-scanberry-primary' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                      }`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>{user.scans}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <User className="h-4 w-4 mr-2" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            View scan history
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id)}>
                            {user.status === 'active' ? (
                              <>
                                <UserX className="h-4 w-4 mr-2 text-scanberry-danger" />
                                <span className="text-scanberry-danger">Deactivate</span>
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4 mr-2 text-scanberry-success" />
                                <span className="text-scanberry-success">Activate</span>
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
