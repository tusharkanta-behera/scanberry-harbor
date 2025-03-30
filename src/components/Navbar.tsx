
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, AlertCircle, MessageSquare, Link as LinkIcon, Phone, User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  useEffect(() => {
    // Check authentication status
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      setUserEmail(localStorage.getItem('userEmail'));
    }
  }, [location.pathname]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
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
    <nav className="bg-background border-b border-border py-4 px-6 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-scanberry-primary flex items-center">
          <Shield className="mr-2" />
          ScanBerry Harbor
        </Link>
        
        {isLoggedIn ? (
          <>
            <div className="hidden md:flex space-x-1">
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
                  isActive('/dashboard') ? 'bg-scanberry-primary text-white' : 'text-foreground hover:bg-accent'
                }`}
              >
                <User className="mr-1 h-4 w-4" />
                Dashboard
              </Link>
              
              <Link 
                to="/file-scan" 
                className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
                  isActive('/file-scan') ? 'bg-scanberry-primary text-white' : 'text-foreground hover:bg-accent'
                }`}
              >
                <Shield className="mr-1 h-4 w-4" />
                File Scan
              </Link>
              
              <Link 
                to="/url-scan" 
                className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
                  isActive('/url-scan') ? 'bg-scanberry-primary text-white' : 'text-foreground hover:bg-accent'
                }`}
              >
                <LinkIcon className="mr-1 h-4 w-4" />
                URL Scan
              </Link>
              
              <Link 
                to="/message-analysis" 
                className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
                  isActive('/message-analysis') ? 'bg-scanberry-primary text-white' : 'text-foreground hover:bg-accent'
                }`}
              >
                <MessageSquare className="mr-1 h-4 w-4" />
                Message Analysis
              </Link>
              
              <Link 
                to="/link-analysis" 
                className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
                  isActive('/link-analysis') ? 'bg-scanberry-primary text-white' : 'text-foreground hover:bg-accent'
                }`}
              >
                <AlertCircle className="mr-1 h-4 w-4" />
                Link Analysis
              </Link>
              
              <Link 
                to="/phone-analysis" 
                className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
                  isActive('/phone-analysis') ? 'bg-scanberry-primary text-white' : 'text-foreground hover:bg-accent'
                }`}
              >
                <Phone className="mr-1 h-4 w-4" />
                Phone Analysis
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <span className="text-sm hidden md:inline text-foreground">{userEmail}</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={handleLogout}
              >
                <LogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={() => navigate('/login')}>Log in</Button>
            <Button size="sm" onClick={() => navigate('/register')}>Sign up</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
