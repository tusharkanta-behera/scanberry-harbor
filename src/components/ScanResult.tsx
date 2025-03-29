
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Shield, AlertTriangle, FileText, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

interface ThreatInfo {
  type: string;
  name: string;
  severity: string;
}

interface ScanResultState {
  fileName: string;
  fileSize: string;
  scanDate: string;
  isClean: boolean;
  threats: ThreatInfo[];
}

const ScanResult: React.FC = () => {
  const location = useLocation();
  const scanData = location.state as ScanResultState;
  
  if (!scanData) {
    return (
      <div className="p-8 text-center">
        <AlertTriangle className="h-12 w-12 text-scanberry-danger mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">No Scan Data Available</h2>
        <p className="mb-6">Scan information is not available. Please return to the scan page and try again.</p>
        <Link to="/" className="px-4 py-2 bg-scanberry-primary text-white rounded-md hover:bg-blue-600 transition-colors">
          Return to Scan
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
          <FileText className="text-scanberry-primary h-6 w-6 mr-3" />
          <h2 className="text-xl font-semibold">Scan Results</h2>
        </div>
        <div className={`flex items-center ${scanData.isClean ? 'text-scanberry-success' : 'text-scanberry-danger'}`}>
          {scanData.isClean ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Clean</span>
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="font-medium">Threat Detected</span>
            </>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="font-medium mb-4">File Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">File Name</p>
              <p className="font-medium">{scanData.fileName}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Scan Date</p>
              <p className="font-medium">{formattedDate}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">File Size</p>
              <p className="font-medium">{scanData.fileSize}</p>
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
      
      {scanData.isClean ? (
        <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-6 flex">
          <CheckCircle className="h-8 w-8 text-scanberry-success mr-4 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-scanberry-success mb-1">No Threats Detected</h3>
            <p className="text-gray-600">
              Our scan did not detect any malware, viruses, or suspicious content in this file.
              The file appears to be safe to use.
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <div className="bg-red-50 border border-red-100 rounded-lg p-6 mb-4 flex">
            <AlertTriangle className="h-8 w-8 text-scanberry-danger mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-scanberry-danger mb-1">Threats Detected!</h3>
              <p className="text-gray-600">
                Our scan detected potentially harmful content in this file.
                We recommend not using this file or handling it with extreme caution.
              </p>
            </div>
          </div>
          
          <h3 className="font-medium mb-3">Detected Threats</h3>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {scanData.threats.map((threat, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm">{threat.type}</td>
                    <td className="px-4 py-3 text-sm font-medium">{threat.name}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        threat.severity === 'High' ? 'bg-red-100 text-red-800' :
                        threat.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {threat.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="flex justify-between">
        <Link to="/" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
          Scan Another File
        </Link>
        <button className="px-4 py-2 bg-scanberry-primary text-white rounded-md hover:bg-blue-600 transition-colors">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default ScanResult;
