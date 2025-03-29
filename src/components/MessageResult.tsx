
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MessageSquare, AlertTriangle, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

interface MessageResultState {
  message: string;
  scanDate: string;
  isLegitimate: boolean;
  spamScore: number;
  indicators: string[];
}

const MessageResult: React.FC = () => {
  const location = useLocation();
  const scanData = location.state as MessageResultState;
  
  if (!scanData) {
    return (
      <div className="p-8 text-center">
        <AlertTriangle className="h-12 w-12 text-scanberry-danger mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">No Analysis Data Available</h2>
        <p className="mb-6">Analysis information is not available. Please return to the message analysis page and try again.</p>
        <Link to="/message-analysis" className="px-4 py-2 bg-scanberry-primary text-white rounded-md hover:bg-blue-600 transition-colors">
          Return to Message Analysis
        </Link>
      </div>
    );
  }
  
  const scanDate = new Date(scanData.scanDate);
  const formattedDate = scanDate.toLocaleDateString();
  const formattedTime = scanDate.toLocaleTimeString();
  
  // Format spam score (rounded to 1 decimal place)
  const spamScore = Math.round(scanData.spamScore * 10) / 10;
  
  return (
    <div className="scan-card">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <MessageSquare className="text-scanberry-primary h-6 w-6 mr-3" />
          <h2 className="text-xl font-semibold">Message Analysis Results</h2>
        </div>
        <div className={`flex items-center ${scanData.isLegitimate ? 'text-scanberry-success' : 'text-scanberry-danger'}`}>
          {scanData.isLegitimate ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Legitimate</span>
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="font-medium">Suspicious</span>
            </>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <Calendar className="h-5 w-5 text-gray-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Analysis Date</p>
            <p className="font-medium">{formattedDate} at {formattedTime}</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Analyzed Message</h3>
          <div className="border rounded-md p-4 bg-white">
            <p className="whitespace-pre-wrap">{scanData.message}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Spam Analysis</h3>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span>Spam Score</span>
            <span className={`font-medium ${
              spamScore < 30 ? 'text-scanberry-success' : 
              spamScore < 70 ? 'text-yellow-600' : 
              'text-scanberry-danger'
            }`}>
              {spamScore}%
            </span>
          </div>
          <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                spamScore < 30 ? 'bg-scanberry-success' : 
                spamScore < 70 ? 'bg-yellow-500' : 
                'bg-scanberry-danger'
              }`}
              style={{ width: `${spamScore}%` }}
            ></div>
          </div>
        </div>
        
        {scanData.isLegitimate ? (
          <div className="bg-green-50 border border-green-100 rounded-lg p-6 flex">
            <CheckCircle className="h-8 w-8 text-scanberry-success mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-scanberry-success mb-1">This message appears to be legitimate</h3>
              <p className="text-gray-600">
                Our analysis did not detect common spam or phishing patterns in this message.
                It appears to be a legitimate communication.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-red-50 border border-red-100 rounded-lg p-6 mb-4 flex">
              <AlertTriangle className="h-8 w-8 text-scanberry-danger mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-scanberry-danger mb-1">This message may be spam or phishing</h3>
                <p className="text-gray-600">
                  Our analysis detected patterns commonly associated with spam or phishing messages.
                  We recommend treating this message with caution.
                </p>
              </div>
            </div>
            
            {scanData.indicators.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Suspicious Indicators</h4>
                <ul className="space-y-2">
                  {scanData.indicators.map((indicator, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-scanberry-danger mr-2 flex-shrink-0 mt-0.5" />
                      <span>{indicator}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <Link to="/message-analysis" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
          Analyze Another Message
        </Link>
        <button className="px-4 py-2 bg-scanberry-primary text-white rounded-md hover:bg-blue-600 transition-colors">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default MessageResult;
