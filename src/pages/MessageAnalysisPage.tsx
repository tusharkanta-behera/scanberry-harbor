
import React from 'react';
import Navbar from '../components/Navbar';
import MessageAnalysis from '../components/MessageAnalysis';

const MessageAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-scanberry-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Message Analyzer</h1>
        <p className="text-gray-600 mb-8">Check if a message is legitimate or potentially spam/phishing.</p>
        
        <MessageAnalysis />
      </div>
    </div>
  );
};

export default MessageAnalysisPage;
