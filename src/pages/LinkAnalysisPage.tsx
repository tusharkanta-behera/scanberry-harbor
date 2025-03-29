
import React from 'react';
import Navbar from '../components/Navbar';
import LinkAnalysis from '../components/LinkAnalysis';

const LinkAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-scanberry-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Link Analyzer</h1>
        <p className="text-gray-600 mb-8">Check multiple links at once for security threats.</p>
        
        <LinkAnalysis />
      </div>
    </div>
  );
};

export default LinkAnalysisPage;
