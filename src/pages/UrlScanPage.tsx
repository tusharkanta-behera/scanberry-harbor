
import React from 'react';
import Navbar from '../components/Navbar';
import UrlScan from '../components/UrlScan';

const UrlScanPage = () => {
  return (
    <div className="min-h-screen bg-scanberry-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">URL Scanner</h1>
        <p className="text-gray-600 mb-8">Check if a website or URL is safe before you visit it.</p>
        
        <UrlScan />
      </div>
    </div>
  );
};

export default UrlScanPage;
