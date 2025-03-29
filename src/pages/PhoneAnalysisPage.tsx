
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Phone, Shield } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

const PhoneAnalysisPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      toast({
        variant: "destructive",
        title: "Phone number required",
        description: "Please enter a phone number to analyze.",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store the phone number in session storage for the result page
      sessionStorage.setItem('analyzedPhone', phoneNumber);
      
      // Navigate to the result page
      navigate('/phone-result');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "An error occurred during phone number analysis.",
      });
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-scanberry-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Phone Number Analysis</h1>
        <p className="text-gray-600 mb-8">Check if a phone number is associated with spam or scams.</p>
        
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-50 p-3 rounded-full">
              <Phone className="h-8 w-8 text-scanberry-primary" />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-center mb-6">
            Enter a phone number to check
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="+1 (123) 456-7890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Include country code for best results (e.g., +1 for US numbers)
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <span>Analyzing...</span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Shield className="mr-2 h-4 w-4" /> Analyze Phone Number
                  </span>
                )}
              </Button>
            </div>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-md font-medium mb-2">How it works:</h3>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
              <li>Enter any phone number you've received suspicious calls or messages from</li>
              <li>Our system will check the number against our database of known spam numbers</li>
              <li>We'll analyze call patterns and behavior associated with the number</li>
              <li>You'll receive a detailed report on the number's reputation and risk level</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneAnalysisPage;
