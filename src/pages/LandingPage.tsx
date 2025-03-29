
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, File, Link as LinkIcon, MessageSquare, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="flex justify-center mb-6">
          <Shield className="h-16 w-16 text-scanberry-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-scanberry-text">ScanBerry Harbor</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Comprehensive security scanning platform to protect you from viruses, malware, phishing, and spam threats.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/login">
            <Button className="bg-scanberry-primary hover:bg-blue-600 text-white px-8 py-6 text-lg">
              Get Started
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" className="border-scanberry-primary text-scanberry-primary hover:bg-blue-50 px-8 py-6 text-lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <File className="h-10 w-10 text-scanberry-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">File Scanning</h3>
              <p className="text-gray-600">Scan files for viruses, malware, and other threats to ensure they're safe.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <LinkIcon className="h-10 w-10 text-scanberry-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">URL Analysis</h3>
              <p className="text-gray-600">Check websites and URLs for potential phishing attempts and malicious content.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <MessageSquare className="h-10 w-10 text-scanberry-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Message Analysis</h3>
              <p className="text-gray-600">Detect spam and phishing in messages, emails, and mobile SMS threats.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <AlertCircle className="h-10 w-10 text-scanberry-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Link Analysis</h3>
              <p className="text-gray-600">Batch check multiple links at once to identify security threats.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-scanberry-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Protecting Yourself Today</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
            Create an account to track your scan history and access all security features.
          </p>
          <Link to="/register">
            <Button className="bg-white text-scanberry-primary hover:bg-gray-100 px-8 py-6 text-lg">
              Create Free Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
