import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogIn, Mail, Lock, MailCheck, AlertTriangle, Check, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from '@/components/ThemeToggle';
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Navbar from '@/components/Navbar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Generate a simple captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptchaValue(`${num1} + ${num2}`);
    setCaptchaAnswer((num1 + num2).toString());
  };

  // Handle email verification step
  const handleSendVerification = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email required",
        description: "Please enter your email address first.",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setEmailVerificationSent(true);
    
    toast({
      title: "Verification code sent",
      description: `A verification code has been sent to ${email}. For demo, use 123456.`,
    });
    
    // For demo purposes, we're using a fixed code "123456"
  };

  // When user submits the first step (email + password)
  const handleFirstStep = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please enter both email and password.",
      });
      return;
    }
    
    // Generate captcha challenge
    generateCaptcha();
    setShowCaptcha(true);
  };

  // Final login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verify captcha if shown
    if (showCaptcha) {
      if (verificationCode !== "123456") {
        toast({
          variant: "destructive",
          title: "Invalid verification code",
          description: "The verification code you entered is invalid. For demo, use '123456'.",
        });
        return;
      }
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes - in a real app with proper auth
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      
      toast({
        title: "Login successful",
        description: "Welcome back to ScanBerry Harbor!",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', 'google-user@example.com');
      
      toast({
        title: "Google Login successful",
        description: "Welcome to ScanBerry Harbor!",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google login failed",
        description: "An error occurred with Google authentication.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg border border-border relative overflow-hidden transition-all duration-300">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
            {Array(20).fill(0).map((_, i) => (
              <div 
                key={i} 
                className="absolute text-scanberry-primary text-xs font-mono"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.3,
                  animation: `matrixDrop ${5 + Math.random() * 10}s infinite ${Math.random() * 5}s linear`
                }}
              >
                {Math.random() > 0.5 ? '10' : '01'}
              </div>
            ))}
          </div>
          
          <div className="relative z-10">
            <div className="text-center">
              <Link to="/" className="inline-flex items-center">
                <div className="relative">
                  <Shield className="h-12 w-12 text-scanberry-primary mx-auto animate-pulse-glow" />
                  <div className="absolute inset-0 bg-scanberry-primary/10 blur-lg rounded-full animate-pulse-slow"></div>
                </div>
              </Link>
              <h2 className="mt-4 text-3xl font-extrabold text-foreground">Sign in to secure terminal</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Or{" "}
                <Link to="/register" className="font-medium text-scanberry-primary hover:text-blue-600 transition-colors">
                  initialize new access protocol
                </Link>
              </p>
            </div>
            
            {!showCaptcha ? (
              // First step: Email and password
              <form className="mt-8 space-y-6" onSubmit={handleFirstStep}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Authentication identifier</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background"
                      placeholder="agent@scanberry.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="flex items-center space-x-2">
                        <Lock className="h-4 w-4" />
                        <span>Access code</span>
                      </Label>
                      <div className="text-sm">
                        <Link to="/forgot-password" className="font-medium text-scanberry-primary hover:text-blue-600 transition-colors">
                          Code recovery
                        </Link>
                      </div>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Maintain secure session
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full flex justify-center py-6 group overflow-hidden relative"
                  disabled={isLoading}
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-40 group-hover:h-40 opacity-10"></span>
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </span>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" /> Proceed to Verification
                    </>
                  )}
                </Button>
                
                <Separator className="my-4">
                  <span className="px-2 text-xs text-muted-foreground">OR</span>
                </Separator>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full py-6 border-scanberry-primary/50 hover:bg-scanberry-primary/5"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <svg className="h-4 w-4 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                  Continue with Google
                </Button>
              </form>
            ) : (
              // Second step: Two-factor authentication
              <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-100 dark:border-blue-800">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <MailCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Verification required</h3>
                        <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                          <p>For your security, we need to verify your identity.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="verificationCode" className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>Verification Code</span>
                    </Label>
                    
                    {!emailVerificationSent ? (
                      <div className="flex gap-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="flex-1"
                          onClick={handleSendVerification}
                          disabled={isLoading}
                        >
                          Send code to my email
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Input
                          id="verificationCode"
                          name="verificationCode"
                          type="text"
                          required
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className="bg-background"
                          placeholder="Enter the 6-digit code (use 123456 for demo)"
                        />
                        <p className="text-xs text-muted-foreground">
                          A verification code has been sent to {email}. For demo purposes, use code: 123456
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full flex justify-center py-6 group overflow-hidden relative"
                  disabled={isLoading || !emailVerificationSent}
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-40 group-hover:h-40 opacity-10"></span>
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </span>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" /> Complete Authentication
                    </>
                  )}
                </Button>
                
                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCaptcha(false)}
                    className="text-scanberry-primary"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Go back
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* Add animation keyframes */}
      <style>
        {`
          @keyframes matrixDrop {
            0% { opacity: 0; transform: translateY(-20px); }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { opacity: 0; transform: translateY(100px); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { filter: drop-shadow(0 0 5px rgba(41, 98, 255, 0.5)); }
            50% { filter: drop-shadow(0 0 20px rgba(41, 98, 255, 0.8)); }
          }
          
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 0.8; }
          }
          
          .animate-pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
