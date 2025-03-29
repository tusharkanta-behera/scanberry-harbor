
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Globe, AlertTriangle, Calendar, Clock, CheckCircle, XCircle, Lock, Unlock, FileType } from 'lucide-react';

interface UrlResultState {
  url: string;
  scanDate: string;
  isSafe: boolean;
  category: string;
  details: {
    reputation: string;
    ssl: boolean;
    contentType: string;
  };
}

const UrlResult: React.FC = () => {
  const location = useLocation();
  const scanData = location.state as UrlResultState;
  
  if (!scanData) {
    return (
      <div className="p-8 text-center">
        <AlertTriangle className="h-12 w-12 text-scanberry-danger mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">No Scan Data Available</h2>
        <p className="mb-6">Scan information is not available. Please return to the URL scan page and try again.</p>
        <Link to="/url-scan" className="px-4 py-2 bg-scanberry-primary text-white rounded-md hover:bg-blue-600 transition-colors">
          Return to URL Scan
        </Link>
      </div>
    );
  }
  
  const scanDate = new Date(scanData.scanDate);
  const formattedDate = scanDate.toLocaleDateString();
  const formattedTime = scanDate.toLocaleTimeString();
  
  return (
    <div className="scan-card">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Globe className="text-scanberry-primary h-6 w-6 mr-3" />
          <h2 className="text-xl font-semibold">URL Scan Results</h2>
        </div>
        <div className={`flex items-center ${scanData.isSafe ? 'text-scanberry-success' : 'text-scanberry-danger'}`}>
          {scanData.isSafe ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Safe</span>
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="font-medium">Dangerous</span>
            </>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="font-medium break-all">{scanData.url}</span>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
            scanData.isSafe ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {scanData.category}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Scan Date</p>
              <p className="font-medium">{formattedDate}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Scan Time</p>
              <p className="font-medium">{formattedTime}</p>
            </div>
          </div>
        </div>
      </div>
      
      {scanData.isSafe ? (
        <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-6 flex">
          <CheckCircle className="h-8 w-8 text-scanberry-success mr-4 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-scanberry-success mb-1">This URL appears to be safe</h3>
            <p className="text-gray-600">
              Our scan didn't detect any malicious content, phishing attempts, or other security risks on this URL.
              It appears to be safe to visit.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-100 rounded-lg p-6 mb-6 flex">
          <AlertTriangle className="h-8 w-8 text-scanberry-danger mr-4 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-scanberry-danger mb-1">This URL may be dangerous!</h3>
            <p className="text-gray-600">
              Our scan detected potential security risks with this URL. 
              It may be involved in {scanData.category.toLowerCase()} activities.
              We strongly recommend not visiting this site.
            </p>
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Detailed Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FileType className="h-5 w-5 text-scanberry-primary mr-2" />
              <h4 className="font-medium">Content Type</h4>
            </div>
            <p className="text-sm">{scanData.details.contentType}</p>
          </div>
          
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center mb-2">
              {scanData.details.ssl ? (
                <Lock className="h-5 w-5 text-scanberry-success mr-2" />
              ) : (
                <Unlock className="h-5 w-5 text-scanberry-danger mr-2" />
              )}
              <h4 className="font-medium">SSL Certificate</h4>
            </div>
            <p className="text-sm">
              {scanData.details.ssl ? "Valid SSL certificate" : "Invalid or missing SSL certificate"}
            </p>
          </div>
          
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Globe className="h-5 w-5 text-scanberry-primary mr-2" />
              <h4 className="font-medium">Reputation</h4>
            </div>
            <p className="text-sm">{scanData.details.reputation}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Link to="/url-scan" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
          Scan Another URL
        </Link>
        <button className="px-4 py-2 bg-scanberry-primary text-white rounded-md hover:bg-blue-600 transition-colors">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default UrlResult;
