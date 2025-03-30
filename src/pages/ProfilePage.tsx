
import React, { useState, useEffect } from 'react';
import { Shield, User, Mail, Phone, Lock, Save, LogOut, AlertTriangle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Fetch user data from localStorage
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName') || 'Agent User';
    const userPhone = localStorage.getItem('userPhone') || '';
    
    setEmail(userEmail || '');
    setName(userName);
    setPhone(userPhone);
    
    // Generate avatar with initials
    const initials = userName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();
    setAvatarUrl(`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=2962ff&color=fff`);
  }, []);
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update localStorage
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPhone', phone);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Could not update profile information.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "New password and confirmation do not match.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Could not update password.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Sidebar */}
            <div className="w-full md:w-72 space-y-4">
              <Card className="border-scanberry-primary/30">
                <CardContent className="pt-6 pb-4 text-center">
                  <div className="mb-4 flex justify-center">
                    <Avatar className="h-24 w-24 ring-2 ring-scanberry-primary/50 ring-offset-2">
                      <AvatarImage src={avatarUrl} alt={name} />
                      <AvatarFallback className="bg-scanberry-primary text-white text-lg">
                        {name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="text-xl font-bold">{name}</h3>
                  <p className="text-muted-foreground text-sm">{email}</p>
                  
                  <div className="mt-6 space-y-2">
                    <Button 
                      variant="destructive" 
                      className="w-full justify-start" 
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Security Status</CardTitle>
                </CardHeader>
                <CardContent className="pb-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Two-factor Authentication</span>
                    <span className="text-xs bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500 py-1 px-2 rounded">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Login</span>
                    <span className="text-xs text-muted-foreground">Today, 10:30 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Password Status</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500 py-1 px-2 rounded">Good</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile">Profile Information</TabsTrigger>
                  <TabsTrigger value="security">Security & Password</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal information and contact details.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleProfileUpdate}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span>Full Name</span>
                            </Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="bg-background"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span>Email Address</span>
                            </Label>
                            <Input
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="bg-background"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>Phone Number</span>
                            </Label>
                            <Input
                              id="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="bg-background"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                              <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Updating...
                              </span>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>
                        Update your password to keep your account secure.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePasswordChange}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                              id="currentPassword"
                              type="password"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              className="bg-background"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                              id="newPassword"
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="bg-background"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="bg-background"
                            />
                          </div>
                        </div>
                        
                        <Alert className="mt-4">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Password Requirements</AlertTitle>
                          <AlertDescription>
                            <ul className="text-sm list-disc list-inside">
                              <li>At least 8 characters</li>
                              <li>Include uppercase and lowercase letters</li>
                              <li>Include at least one number</li>
                              <li>Include at least one special character</li>
                            </ul>
                          </AlertDescription>
                        </Alert>
                        
                        <div className="mt-6">
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                              <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Updating...
                              </span>
                            ) : (
                              <>
                                <Lock className="mr-2 h-4 w-4" />
                                Update Password
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
