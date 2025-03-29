
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, AlertCircle, MessageSquare, Link as LinkIcon, Phone, User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
    <nav className="bg-white shadow-sm py-4 px-6">
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
                  isActive('/dashboard') ? 'bg-scanberry-primary text-white' : 'text-scanberry-text hover:bg-gray-100'
                }`}
              >
                <User className="mr-1 h-4 w-4" />
                Dashboard
              </Link>
              
              <Link 
                to="/file-scan" 
                className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
                  isActive('/file-scan') ? 'bg-scanberry-primary text-white' : 'text-scanberry-text hover:bg-gray-100'
                }`}
              >
                <Shield className="mr-1 h-4 w-4" />
                File Scan
              </Link>
              
              <Link 
                to="/url-scan" 
                className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
                  isActive('/url-scan') ? 'bg-scanberry-primary text-white' : 'text-scanberry-text hover:bg-gray-100'
                }`}
              >
                <LinkIcon className="mr-1 h-4 w-4" />
                URL Scan
              </Link>
              
              <Link 
                to="/message-analysis" 
                className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
                  isActive('/message-analysis') ? 'bg-scanberry-primary text-white' : 'text-scanberry-text hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="mr-1 h-4 w-4" />
                Message Analysis
              </Link>
              
              <Link 
                to="/link-analysis" 
                className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
                  isActive('/link-analysis') ? 'bg-scanberry-primary text-white' : 'text-scanberry-text hover:bg-gray-100'
                }`}
              >
                <AlertCircle className="mr-1 h-4 w-4" />
                Link Analysis
              </Link>
              
              <Link 
                to="/phone-analysis" 
                className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
                  isActive('/phone-analysis') ? 'bg-scanberry-primary text-white' : 'text-scanberry-text hover:bg-gray-100'
                }`}
              >
                <Phone className="mr-1 h-4 w-4" />
                Phone Analysis
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm hidden md:inline">{userEmail}</span>
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
            <Link to="/login">
              <Button variant="outline" size="sm">Log in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
