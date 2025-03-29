
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Link as LinkIcon, AlertTriangle, Calendar, CheckCircle, XCircle, Globe } from 'lucide-react';

interface LinkResultItem {
  link: string;
  isSafe: boolean;
  category: string;
  reputation: string;
}

interface LinkResultState {
  links: string[];
  scanDate: string;
  results: LinkResultItem[];
}

const LinkResult: React.FC = () => {
  const location = useLocation();
  const scanData = location.state as LinkResultState;
  
  if (!scanData) {
    return (
      <div className="p-8 text-center">
        <AlertTriangle className="h-12 w-12 text-scanberry-danger mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">No Analysis Data Available</h2>
        <p className="mb-6">Analysis information is not available. Please return to the link analysis page and try again.</p>
        <Link to="/link-analysis" className="px-4 py-2 bg-scanberry-primary text-white rounded-md hover:bg-blue-600 transition-colors">
          Return to Link Analysis
        </Link>
      </div>
    );
  }
  
  const scanDate = new Date(scanData.scanDate);
  const formattedDate = scanDate.toLocaleDateString();
  const formattedTime = scanDate.toLocaleTimeString();
  
  // Calculate statistics
  const safeCount = scanData.results.filter(r => r.isSafe).length;
  const dangerousCount = scanData.results.length - safeCount;
  const safePercentage = Math.round((safeCount / scanData.results.length) * 100);
  
  return (
    <div className="scan-card">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <LinkIcon className="text-scanberry-primary h-6 w-6 mr-3" />
          <h2 className="text-xl font-semibold">Link Analysis Results</h2>
        </div>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-sm text-gray-500">
            {formattedDate} at {formattedTime}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-medium text-gray-500 mb-1">Links Scanned</h3>
          <p className="text-2xl font-semibold">{scanData.results.length}</p>
        </div>
        
        <div className="bg-green-50 border border-green-100 rounded-lg p-4">
          <h3 className="font-medium text-scanberry-success mb-1">Safe Links</h3>
          <p className="text-2xl font-semibold">{safeCount}</p>
        </div>
        
        <div className="bg-red-50 border border-red-100 rounded-lg p-4">
          <h3 className="font-medium text-scanberry-danger mb-1">Dangerous Links</h3>
          <p className="text-2xl font-semibold">{dangerousCount}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Safety Overview</h3>
        <div className="flex items-center mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
            <div 
              className="bg-scanberry-success h-2.5 rounded-full" 
              style={{ width: `${safePercentage}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{safePercentage}% Safe</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Detailed Results</h3>
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Link</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 hidden md:table-cell">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 hidden md:table-cell">Reputation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {scanData.results.map((result, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="truncate max-w-[200px]" title={result.link}>
                        {result.link}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {result.isSafe ? (
                      <div className="flex items-center text-scanberry-success">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span>Safe</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-scanberry-danger">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        <span>Dangerous</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm hidden md:table-cell">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      result.isSafe ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {result.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm hidden md:table-cell">{result.reputation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Link to="/link-analysis" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
          Analyze More Links
        </Link>
        <button className="px-4 py-2 bg-scanberry-primary text-white rounded-md hover:bg-blue-600 transition-colors">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default LinkResult;
