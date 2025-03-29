
import React, { useState, FormEvent } from 'react';
import { Link as LinkIcon, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const LinkAnalysis: React.FC = () => {
  const [links, setLinks] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!links.trim()) {
      toast.error('Please enter at least one link to analyze');
      return;
    }
    
    // Get array of links
    const linkArray = links.split('\n').filter(link => link.trim());
    
    if (linkArray.length === 0) {
      toast.error('Please enter at least one valid link');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate link analysis process
    setTimeout(() => {
      setIsLoading(false);
      
      // Generate random results for each link
      const results = linkArray.map(link => {
        const isSafe = Math.random() > 0.3;
        return {
          link: link.trim(),
          isSafe,
          category: isSafe ? 'Safe' : ['Phishing', 'Malware', 'Suspicious', 'Scam'][Math.floor(Math.random() * 4)],
          reputation: isSafe ? 'Good' : 'Poor'
        };
      });
      
      // Navigate to results page with link analysis data
      navigate('/link-result', { 
        state: { 
          links: linkArray,
          scanDate: new Date().toISOString(),
          results
        }
      });
    }, 2000);
  };
  
  return (
    <div className="scan-card">
      <div className="flex items-center mb-6">
        <LinkIcon className="text-scanberry-primary h-6 w-6 mr-3" />
        <h2 className="text-xl font-semibold">Bulk Link Analyzer</h2>
      </div>
      
      <p className="mb-6 text-gray-600">
        Check multiple links at once. Enter one URL per line to analyze multiple links simultaneously.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="links" className="block text-sm font-medium text-gray-700 mb-2">
            Enter links to analyze (one per line):
          </label>
          <textarea
            id="links"
            rows={6}
            placeholder="https://example1.com&#10;https://example2.com&#10;https://example3.com"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-scanberry-primary focus:border-transparent"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
          ></textarea>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-scanberry-primary p-4 rounded-md mb-6">
          <div className="flex">
            <AlertTriangle className="h-6 w-6 text-scanberry-primary mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Bulk Link Checking</h4>
              <p className="text-sm text-gray-600">
                Perfect for checking links in emails, documents, or messages. Results will show which links are safe and which might be dangerous.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-3">Analysis Options</h3>
          <div className="space-y-3 mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-scanberry-primary focus:ring-scanberry-primary" defaultChecked />
              <span>Check domain reputation</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-scanberry-primary focus:ring-scanberry-primary" defaultChecked />
              <span>Verify SSL certificates</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-scanberry-primary focus:ring-scanberry-primary" defaultChecked />
              <span>Check for redirects</span>
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
                Analyzing Links...
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 mr-1" />
                Analyze Links
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LinkAnalysis;
