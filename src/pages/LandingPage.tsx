
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Terminal, Link as LinkIcon, MessageSquare, AlertCircle, Zap, Database, Code } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1A1F2C] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 overflow-hidden">
          {Array(20).fill(0).map((_, i) => (
            <div 
              key={i} 
              className="absolute text-[#2962ff] opacity-30 text-xs font-mono"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `fadeInOut ${5 + Math.random() * 10}s infinite ${Math.random() * 5}s`
              }}
            >
              {Math.random() > 0.5 ? '10' : '01'}
              {Math.random() > 0.5 ? '01' : '10'}
              {Math.random() > 0.5 ? '0' : '1'}
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="container relative z-10 mx-auto px-4 pt-20 pb-16 text-center">
        <div className="flex justify-center mb-6">
          <Shield className="h-20 w-20 text-[#2962ff]" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2962ff] to-[#39DBFF]">
            ScanBerry Harbor
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Advanced security platform to protect against cyber threats, malware, phishing, and sophisticated attack vectors.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/login">
            <Button className="bg-[#2962ff] hover:bg-blue-600 text-white px-8 py-6 text-lg group transition-all duration-300 relative overflow-hidden">
              <span className="absolute right-full w-12 h-12 -mt-2 -mr-12 transition-all duration-500 ease-in-out transform translate-x-2 -translate-y-2 bg-white opacity-10 rotate-45 group-hover:translate-x-[400%] group-hover:-translate-y-1/2"></span>
              Access Terminal
              <Terminal className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" className="border-[#2962ff] text-[#2962ff] hover:bg-[#0F172A]/50 px-8 py-6 text-lg backdrop-blur-sm">
              <Lock className="mr-2 w-5 h-5" />
              Secure Registration
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section with Cyber Theme */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#2962ff] to-[#39DBFF]">
              Security Operations Arsenal
            </h2>
            <div className="mt-2 h-1 w-24 bg-[#2962ff] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* File Scanning */}
            <div className="backdrop-blur-sm bg-[#1E293B]/40 border border-[#2962ff]/30 rounded-lg p-6 text-center hover:shadow-[0_0_15px_rgba(41,98,255,0.3)] transition-all duration-300 group">
              <div className="flex justify-center mb-4 relative">
                <div className="absolute -inset-1 rounded-full bg-[#2962ff]/20 blur-md group-hover:bg-[#2962ff]/30 transition-all duration-300"></div>
                <Shield className="h-12 w-12 text-[#2962ff] relative" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">File Analysis Engine</h3>
              <p className="text-gray-400">Deep-scan files for malicious code, exploits, and zero-day vulnerabilities.</p>
              <Link to="/file-scan" className="mt-4 inline-block text-[#2962ff] hover:text-[#39DBFF] transition-colors duration-300">
                <div className="flex items-center">
                  <span>Execute Scan</span>
                  <Zap className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </div>
            
            {/* URL Analysis */}
            <div className="backdrop-blur-sm bg-[#1E293B]/40 border border-[#2962ff]/30 rounded-lg p-6 text-center hover:shadow-[0_0_15px_rgba(41,98,255,0.3)] transition-all duration-300 group">
              <div className="flex justify-center mb-4 relative">
                <div className="absolute -inset-1 rounded-full bg-[#2962ff]/20 blur-md group-hover:bg-[#2962ff]/30 transition-all duration-300"></div>
                <LinkIcon className="h-12 w-12 text-[#2962ff] relative" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">URL Reconnaissance</h3>
              <p className="text-gray-400">Identify phishing domains, malicious endpoints, and compromised websites.</p>
              <Link to="/url-scan" className="mt-4 inline-block text-[#2962ff] hover:text-[#39DBFF] transition-colors duration-300">
                <div className="flex items-center">
                  <span>Run Analysis</span>
                  <Code className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </div>
            
            {/* Message Analysis */}
            <div className="backdrop-blur-sm bg-[#1E293B]/40 border border-[#2962ff]/30 rounded-lg p-6 text-center hover:shadow-[0_0_15px_rgba(41,98,255,0.3)] transition-all duration-300 group">
              <div className="flex justify-center mb-4 relative">
                <div className="absolute -inset-1 rounded-full bg-[#2962ff]/20 blur-md group-hover:bg-[#2962ff]/30 transition-all duration-300"></div>
                <MessageSquare className="h-12 w-12 text-[#2962ff] relative" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Message Decryption</h3>
              <p className="text-gray-400">Detect social engineering, spam patterns, and phishing attempts in messages.</p>
              <Link to="/message-analysis" className="mt-4 inline-block text-[#2962ff] hover:text-[#39DBFF] transition-colors duration-300">
                <div className="flex items-center">
                  <span>Parse Messages</span>
                  <Database className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </div>
            
            {/* Link Analysis */}
            <div className="backdrop-blur-sm bg-[#1E293B]/40 border border-[#2962ff]/30 rounded-lg p-6 text-center hover:shadow-[0_0_15px_rgba(41,98,255,0.3)] transition-all duration-300 group">
              <div className="flex justify-center mb-4 relative">
                <div className="absolute -inset-1 rounded-full bg-[#2962ff]/20 blur-md group-hover:bg-[#2962ff]/30 transition-all duration-300"></div>
                <AlertCircle className="h-12 w-12 text-[#2962ff] relative" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Link Infiltration</h3>
              <p className="text-gray-400">Batch analyze multiple URLs to identify malicious endpoints and threats.</p>
              <Link to="/link-analysis" className="mt-4 inline-block text-[#2962ff] hover:text-[#39DBFF] transition-colors duration-300">
                <div className="flex items-center">
                  <span>Deploy Scanner</span>
                  <Terminal className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 bg-gradient-to-r from-[#1A1F2C] to-[#1E293B] py-16 border-t border-[#2962ff]/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Initialize Your Security Protocol</h2>
          <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
            Establish a secure connection to access advanced threat detection features and analytics.
          </p>
          <Link to="/register">
            <Button className="bg-[#2962ff] hover:bg-blue-600 text-white px-8 py-6 text-lg relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#2962ff]/10 to-transparent transform -skew-x-12 transition-transform group-hover:translate-x-full duration-700"></span>
              <Lock className="mr-2 h-5 w-5" />
              Establish Secure Connection
            </Button>
          </Link>
        </div>
      </div>

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 0.3; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
