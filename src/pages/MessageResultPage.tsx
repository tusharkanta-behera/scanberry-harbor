
import React from 'react';
import Navbar from '../components/Navbar';
import MessageResult from '../components/MessageResult';

const MessageResultPage = () => {
  return (
    <div className="min-h-screen bg-scanberry-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Message Analysis Results</h1>
        <p className="text-gray-600 mb-8">Review the spam/phishing analysis of your message.</p>
        
        <MessageResult />
      </div>
    </div>
  );
};

export default MessageResultPage;
