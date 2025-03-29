
import React from 'react';
import Navbar from '../components/Navbar';
import LinkResult from '../components/LinkResult';

const LinkResultPage = () => {
  return (
    <div className="min-h-screen bg-scanberry-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Link Analysis Results</h1>
        <p className="text-gray-600 mb-8">Review the security analysis of your scanned links.</p>
        
        <LinkResult />
      </div>
    </div>
  );
};

export default LinkResultPage;
