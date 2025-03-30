
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, Check, AlertTriangle, MailCheck } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from '@/components/ThemeToggle';
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from '@/components/Navbar';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  // Handle first step submission
  const handleFirstStep = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please ensure both passwords match.",
      });
      return;
    }
    
    if (passwordStrength < 3) {
      toast({
        variant: "destructive",
        title: "Weak password",
        description: "Please choose a stronger password with at least 8 characters, including uppercase, numbers, and special characters.",
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: "Terms not accepted",
        description: "You must accept the terms of service to continue.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate sending verification code
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVerificationSent(true);
      
      toast({
        title: "Verification code sent",
        description: `A verification code has been sent to ${email}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "Could not send verification code.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Final registration submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verificationCode !== "123456") {
      toast({
        variant: "destructive",
        title: "Invalid verification code",
        description: "The verification code you entered is invalid. For demo, use '123456'.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes only
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', name);
      localStorage.setItem('userPhone', phone);
      
      toast({
        title: "Account created",
        description: "Welcome to ScanBerry Harbor!",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An error occurred during registration.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google sign up
  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', 'google-user@example.com');
      localStorage.setItem('userName', 'Google User');
      
      toast({
        title: "Google Registration successful",
        description: "Welcome to ScanBerry Harbor!",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google registration failed",
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
              <h2 className="mt-4 text-3xl font-extrabold text-foreground">Create secure credentials</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Already registered?{" "}
                <Link to="/login" className="font-medium text-scanberry-primary hover:text-blue-600 transition-colors">
                  Access your terminal
                </Link>
              </p>
            </div>
            
            {!verificationSent ? (
              // First step: Registration form
              <form className="mt-8 space-y-6" onSubmit={handleFirstStep}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Full Name</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-background"
                      placeholder="Agent Name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email address</span>
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
                    <Label htmlFor="phone" className="flex items-center space-x-2">
                      <span>Phone number (optional)</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-background"
                      placeholder="+1 (234) 567-8900"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>Secure password</span>
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        checkPasswordStrength(e.target.value);
                      }}
                      className="bg-background"
                    />
                    {password && (
                      <div className="space-y-1">
                        <div className="flex space-x-1 h-1.5">
                          <div className={`flex-1 rounded-full ${passwordStrength >= 1 ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                          <div className={`flex-1 rounded-full ${passwordStrength >= 2 ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                          <div className={`flex-1 rounded-full ${passwordStrength >= 3 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                          <div className={`flex-1 rounded-full ${passwordStrength >= 4 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                        </div>
                        <div className="text-xs space-y-1">
                          <p className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-muted-foreground'}`}>
                            {/[A-Z]/.test(password) ? <Check className="h-3 w-3 mr-1" /> : <span className="h-3 w-3 mr-1" />} Uppercase letter
                          </p>
                          <p className={`flex items-center ${/[0-9]/.test(password) ? 'text-green-500' : 'text-muted-foreground'}`}>
                            {/[0-9]/.test(password) ? <Check className="h-3 w-3 mr-1" /> : <span className="h-3 w-3 mr-1" />} Number
                          </p>
                          <p className={`flex items-center ${/[^A-Za-z0-9]/.test(password) ? 'text-green-500' : 'text-muted-foreground'}`}>
                            {/[^A-Za-z0-9]/.test(password) ? <Check className="h-3 w-3 mr-1" /> : <span className="h-3 w-3 mr-1" />} Special character
                          </p>
                          <p className={`flex items-center ${password.length >= 8 ? 'text-green-500' : 'text-muted-foreground'}`}>
                            {password.length >= 8 ? <Check className="h-3 w-3 mr-1" /> : <span className="h-3 w-3 mr-1" />} At least 8 characters
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>Confirm password</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-background"
                    />
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-500 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" /> Passwords do not match
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I accept the{" "}
                      <Link to="/terms" className="text-scanberry-primary hover:underline">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-scanberry-primary hover:underline">
                        privacy policy
                      </Link>
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
                      Processing...
                    </span>
                  ) : (
                    <>
                      Proceed to Verification
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
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                >
                  <svg className="h-4 w-4 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                  Sign up with Google
                </Button>
              </form>
            ) : (
              // Second step: Email verification
              <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-100 dark:border-blue-800">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <MailCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Verification required</h3>
                        <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                          <p>We've sent a verification code to {email}.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="verificationCode">Verification Code</Label>
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
                      For demo purposes, enter the code: 123456
                    </p>
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
                      Creating account...
                    </span>
                  ) : (
                    <>
                      Complete Registration
                    </>
                  )}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Didn't receive the code? <button type="button" className="text-scanberry-primary hover:underline">Resend code</button></p>
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

export default RegisterPage;
