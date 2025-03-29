
import React, { useState, FormEvent } from 'react';
import { MessageSquare, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const MessageAnalysis: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error('Please enter a message to analyze');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate message analysis process
    setTimeout(() => {
      setIsLoading(false);
      
      // Randomly determine if the message is spam or legitimate
      const isLegitimate = Math.random() > 0.4;
      
      // Navigate to results page with message analysis data
      navigate('/message-result', { 
        state: { 
          message: message,
          scanDate: new Date().toISOString(),
          isLegitimate: isLegitimate,
          spamScore: isLegitimate ? Math.random() * 30 : 60 + Math.random() * 40,
          indicators: isLegitimate ? [] : [
            'Suspicious keywords detected',
            'Unusual message structure',
            'Contains suspicious links',
            'Asks for personal information'
          ].slice(0, Math.floor(Math.random() * 3) + 1)
        }
      });
    }, 1500);
  };
  
  return (
    <div className="scan-card">
      <div className="flex items-center mb-6">
        <MessageSquare className="text-scanberry-primary h-6 w-6 mr-3" />
        <h2 className="text-xl font-semibold">Message Analyzer</h2>
      </div>
      
      <p className="mb-6 text-gray-600">
        Check if a message is legitimate or potentially spam/phishing. Paste the suspicious message below.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Enter message to analyze:
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder="Paste your suspicious message here..."
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-scanberry-primary focus:border-transparent"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-scanberry-primary p-4 rounded-md mb-6">
          <div className="flex">
            <AlertTriangle className="h-6 w-6 text-scanberry-primary mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Protect yourself from scams!</h4>
              <p className="text-sm text-gray-600">
                Always be cautious of messages asking for personal information, containing urgent requests,
                or offering deals that seem too good to be true.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-3">Analysis Options</h3>
          <div className="space-y-3 mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-scanberry-primary focus:ring-scanberry-primary" defaultChecked />
              <span>Check for phishing indicators</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-scanberry-primary focus:ring-scanberry-primary" defaultChecked />
              <span>Scan for suspicious links</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-scanberry-primary focus:ring-scanberry-primary" defaultChecked />
              <span>Check for spam patterns</span>
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
                Analyzing...
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 mr-1" />
                Analyze Message
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageAnalysis;
