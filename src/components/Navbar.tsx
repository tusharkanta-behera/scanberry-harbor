
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, AlertCircle, MessageSquare, Link as LinkIcon } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-scanberry-primary flex items-center">
          <Shield className="mr-2" />
          ScanBerry Harbor
        </Link>
        
        <div className="flex space-x-1">
          <Link 
            to="/" 
            className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
              isActive('/') ? 'bg-scanberry-primary text-white' : 'text-scanberry-text hover:bg-gray-100'
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
