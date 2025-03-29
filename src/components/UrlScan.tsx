
import React, { useState, FormEvent } from 'react';
import { Globe, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const UrlScan: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error('Please enter a URL to scan');
      return;
    }
    
    // Simple URL validation
    try {
      // Check if it has a protocol, if not add https://
      const urlToCheck = url.startsWith('http') ? url : `https://${url}`;
      new URL(urlToCheck);
      
      setIsLoading(true);
      
      // Simulate URL scanning process
      setTimeout(() => {
        setIsLoading(false);
        
        // Randomly determine if the URL is safe or malicious
        const isSafe = Math.random() > 0.4;
        
        // Navigate to results page with URL data
        navigate('/url-result', { 
          state: { 
            url: urlToCheck,
            scanDate: new Date().toISOString(),
            isSafe: isSafe,
            category: isSafe ? 'Safe' : Math.random() > 0.5 ? 'Phishing' : 'Malware',
            details: isSafe ? 
              { reputation: 'Good', ssl: true, contentType: 'text/html' } : 
              { reputation: 'Poor', ssl: Math.random() > 0.5, contentType: 'text/html' }
          }
        });
      }, 2000);
      
    } catch (error) {
      toast.error('Please enter a valid URL');
    }
  };
  
  return (
    <div className="scan-card">
      <div className="flex items-center mb-6">
        <Globe className="text-scanberry-primary h-6 w-6 mr-3" />
        <h2 className="text-xl font-semibold">URL Scanner</h2>
      </div>
      
      <p className="mb-6 text-gray-600">
        Check if a website or URL is safe before you visit. Enter the full URL including https:// for best results.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Enter URL to scan:
          </label>
          <div className="flex">
            <input
              type="text"
              id="url"
              placeholder="https://example.com"
              className="flex-1 border border-gray-300 rounded-l-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-scanberry-primary focus:border-transparent"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-scanberry-primary text-white px-4 py-3 rounded-r-md hover:bg-blue-600 transition-colors disabled:bg-blue-400"
            >
              {isLoading ? 'Scanning...' : 'Scan'}
            </button>
          </div>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-scanberry-primary p-4 rounded-md mb-6">
          <div className="flex">
            <AlertTriangle className="h-6 w-6 text-scanberry-primary mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Why scan URLs?</h4>
              <p className="text-sm text-gray-600">
                Malicious websites can install malware, steal your personal information, or trick you into revealing sensitive data.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-3">Scan Options</h3>
          <div className="space-y-3 mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-scanberry-primary focus:ring-scanberry-primary" defaultChecked />
              <span>Check for phishing</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-scanberry-primary focus:ring-scanberry-primary" defaultChecked />
              <span>Check for malware</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-scanberry-primary focus:ring-scanberry-primary" defaultChecked />
              <span>Verify SSL certificate</span>
            </label>
          </div>
          
          <button 
            type="submit" 
            className="scan-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-opacity-50 border-t-white rounded-full animate-spin mr-2"></div>
                Scanning...
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 mr-1" />
                Scan URL
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UrlScan;
