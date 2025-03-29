
import React from 'react';
import Navbar from '../components/Navbar';
import FileUpload from '../components/FileUpload';

const Index = () => {
  return (
    <div className="min-h-screen bg-scanberry-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">File Scanner</h1>
        <p className="text-gray-600 mb-8">Upload a file to scan for viruses, malware, and other threats.</p>
        
        <FileUpload />
      </div>
    </div>
  );
};

export default Index;
