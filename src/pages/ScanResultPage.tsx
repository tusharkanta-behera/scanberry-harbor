
import React from 'react';
import Navbar from '../components/Navbar';
import ScanResult from '../components/ScanResult';

const ScanResultPage = () => {
  return (
    <div className="min-h-screen bg-scanberry-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Scan Results</h1>
        <p className="text-gray-600 mb-8">Review the security analysis of your uploaded file.</p>
        
        <ScanResult />
      </div>
    </div>
  );
};

export default ScanResultPage;
