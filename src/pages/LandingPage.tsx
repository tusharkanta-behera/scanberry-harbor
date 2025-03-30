
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Terminal, Link as LinkIcon, MessageSquare, AlertCircle, Zap, Database, Code, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from '@/components/ThemeToggle';
import Navbar from '@/components/Navbar';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Handle initial animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Handle scroll animations
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight / 2 && sectionTop > -window.innerHeight / 2) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Matrix-style Animated Background */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="absolute inset-0 overflow-hidden">
          {Array(40).fill(0).map((_, i) => (
            <div 
              key={i} 
              className="absolute text-scanberry-primary opacity-30 text-xs font-mono"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `matrixDrop ${5 + Math.random() * 10}s infinite ${Math.random() * 5}s linear`
              }}
            >
              {Math.random() > 0.5 ? '10' : '01'}
              {Math.random() > 0.5 ? '01' : '10'}
              {Math.random() > 0.5 ? '0' : '1'}
            </div>
          ))}
        </div>
      </div>

      {/* Noise Overlay */}
      <div className="fixed inset-0 bg-noise opacity-[0.03] z-0 pointer-events-none"></div>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-[90vh] flex items-center">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-6">
              <div className="relative animate-pulse-glow">
                <Shield className="h-20 w-20 text-scanberry-primary relative z-10" />
                <div className="absolute inset-0 bg-scanberry-primary/20 blur-xl rounded-full animate-pulse-slow"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-scanberry-primary to-[#39DBFF] animate-gradient">
                ScanBerry Harbor
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              Advanced security platform to protect against cyber threats, malware, phishing, and sophisticated attack vectors.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
              <Link to="/login">
                <Button className="bg-scanberry-primary hover:bg-blue-600 text-white px-8 py-6 text-lg group transition-all duration-300 relative overflow-hidden">
                  <span className="absolute right-full w-12 h-12 -mt-2 -mr-12 transition-all duration-500 ease-in-out transform translate-x-2 -translate-y-2 bg-white opacity-10 rotate-45 group-hover:translate-x-[400%] group-hover:-translate-y-1/2"></span>
                  Access Terminal
                  <Terminal className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="border-scanberry-primary text-scanberry-primary hover:bg-scanberry-primary/10 px-8 py-6 text-lg backdrop-blur-sm">
                  <Lock className="mr-2 w-5 h-5" />
                  Secure Registration
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-8 w-8 text-scanberry-primary opacity-70 rotate-90" />
        </div>
      </section>

      {/* Features Section with Cyber Theme */}
      <section id="features" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-scanberry-primary to-[#39DBFF] mb-2">
              Security Operations Arsenal
            </h2>
            <div className="mt-2 h-1 w-24 bg-scanberry-primary mx-auto"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Deploy our cutting-edge tools to identify and neutralize threats before they compromise your systems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* File Scanning */}
            <div className="backdrop-blur-sm bg-card/40 border border-scanberry-primary/30 rounded-lg p-6 text-center hover:shadow-[0_0_15px_rgba(41,98,255,0.3)] transition-all duration-300 group animate-slide-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <div className="flex justify-center mb-4 relative">
                <div className="absolute -inset-1 rounded-full bg-scanberry-primary/20 blur-md group-hover:bg-scanberry-primary/30 transition-all duration-300"></div>
                <Shield className="h-12 w-12 text-scanberry-primary relative" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">File Analysis Engine</h3>
              <p className="text-muted-foreground">Deep-scan files for malicious code, exploits, and zero-day vulnerabilities.</p>
              <Link to="/file-scan" className="mt-4 inline-block text-scanberry-primary hover:text-[#39DBFF] transition-colors duration-300 group">
                <div className="flex items-center">
                  <span>Execute Scan</span>
                  <Zap className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
            
            {/* URL Analysis */}
            <div className="backdrop-blur-sm bg-card/40 border border-scanberry-primary/30 rounded-lg p-6 text-center hover:shadow-[0_0_15px_rgba(41,98,255,0.3)] transition-all duration-300 group animate-slide-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              <div className="flex justify-center mb-4 relative">
                <div className="absolute -inset-1 rounded-full bg-scanberry-primary/20 blur-md group-hover:bg-scanberry-primary/30 transition-all duration-300"></div>
                <LinkIcon className="h-12 w-12 text-scanberry-primary relative" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">URL Reconnaissance</h3>
              <p className="text-muted-foreground">Identify phishing domains, malicious endpoints, and compromised websites.</p>
              <Link to="/url-scan" className="mt-4 inline-block text-scanberry-primary hover:text-[#39DBFF] transition-colors duration-300 group">
                <div className="flex items-center">
                  <span>Run Analysis</span>
                  <Code className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
            
            {/* Message Analysis */}
            <div className="backdrop-blur-sm bg-card/40 border border-scanberry-primary/30 rounded-lg p-6 text-center hover:shadow-[0_0_15px_rgba(41,98,255,0.3)] transition-all duration-300 group animate-slide-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <div className="flex justify-center mb-4 relative">
                <div className="absolute -inset-1 rounded-full bg-scanberry-primary/20 blur-md group-hover:bg-scanberry-primary/30 transition-all duration-300"></div>
                <MessageSquare className="h-12 w-12 text-scanberry-primary relative" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Message Decryption</h3>
              <p className="text-muted-foreground">Detect social engineering, spam patterns, and phishing attempts in messages.</p>
              <Link to="/message-analysis" className="mt-4 inline-block text-scanberry-primary hover:text-[#39DBFF] transition-colors duration-300 group">
                <div className="flex items-center">
                  <span>Parse Messages</span>
                  <Database className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
            
            {/* Link Analysis */}
            <div className="backdrop-blur-sm bg-card/40 border border-scanberry-primary/30 rounded-lg p-6 text-center hover:shadow-[0_0_15px_rgba(41,98,255,0.3)] transition-all duration-300 group animate-slide-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
              <div className="flex justify-center mb-4 relative">
                <div className="absolute -inset-1 rounded-full bg-scanberry-primary/20 blur-md group-hover:bg-scanberry-primary/30 transition-all duration-300"></div>
                <AlertCircle className="h-12 w-12 text-scanberry-primary relative" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Link Infiltration</h3>
              <p className="text-muted-foreground">Batch analyze multiple URLs to identify malicious endpoints and threats.</p>
              <Link to="/link-analysis" className="mt-4 inline-block text-scanberry-primary hover:text-[#39DBFF] transition-colors duration-300 group">
                <div className="flex items-center">
                  <span>Deploy Scanner</span>
                  <Terminal className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative z-10 py-20 border-t border-scanberry-primary/20">
        <div className="absolute inset-0 bg-gradient-to-b from-scanberry-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
            <h2 className="text-3xl font-bold text-foreground mb-4">Initialize Your Security Protocol</h2>
            <p className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto">
              Establish a secure connection to access advanced threat detection features and analytics.
            </p>
            <Link to="/register">
              <Button className="bg-scanberry-primary hover:bg-blue-600 text-white px-8 py-6 text-lg relative overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-scanberry-primary/10 to-transparent transform -skew-x-12 transition-transform group-hover:translate-x-full duration-700"></span>
                <Lock className="mr-2 h-5 w-5" />
                Establish Secure Connection
              </Button>
            </Link>
          </div>
          
          {/* Floating security elements */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-scanberry-primary/20 opacity-30 hidden lg:block">
            <pre className="text-xs font-mono">
              {Array(10).fill(0).map((_, i) => (
                <div key={i} className="animate-typing-effect" style={{ animationDelay: `${i * 0.2}s` }}>
                  {`> initializing secure protocol...`}
                </div>
              ))}
            </pre>
          </div>
          
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-scanberry-primary/20 opacity-30 hidden lg:block">
            <pre className="text-xs font-mono">
              {Array(10).fill(0).map((_, i) => (
                <div key={i} className="animate-typing-effect" style={{ animationDelay: `${i * 0.2}s` }}>
                  {`> scanning perimeter...`}
                </div>
              ))}
            </pre>
          </div>
        </div>
      </section>

      {/* Add animation keyframes */}
      <style>
        {`
          @keyframes matrixDrop {
            0% { opacity: 0; transform: translateY(-100px); }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { opacity: 0; transform: translateY(calc(100vh + 100px)); }
          }
          
          @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translateY(10px); }
            50% { opacity: 0.3; transform: translateY(0); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { filter: drop-shadow(0 0 5px rgba(41, 98, 255, 0.5)); }
            50% { filter: drop-shadow(0 0 20px rgba(41, 98, 255, 0.8)); }
          }
          
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 0.8; }
          }
          
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes typing-effect {
            0% { width: 0; overflow: hidden; white-space: nowrap; }
            10% { width: 100%; overflow: hidden; white-space: nowrap; }
            90% { opacity: 1; }
            100% { opacity: 0; }
          }
          
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 6s ease infinite;
          }
          
          .animate-pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
          
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
          
          .animate-slide-up {
            animation: slide-up 0.5s ease-out forwards;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
          
          .animate-typing-effect {
            overflow: hidden;
            white-space: nowrap;
            animation: typing-effect 4s steps(40, end) infinite;
          }
          
          .bg-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
