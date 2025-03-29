
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Phone, AlertTriangle, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock function to simulate analysis result
const getAnalysisResult = (phoneNumber: string) => {
  // In a real app, this would be an API call
  // For demo purposes, we'll return a random result based on the phone number
  const lastDigit = parseInt(phoneNumber.slice(-1));
  
  if (lastDigit % 3 === 0) {
    return {
      phoneNumber,
      riskLevel: 'high',
      riskScore: 85,
      spamLikelihood: 'Very likely',
      reportCount: 127,
      categories: ['Scam', 'Robocall'],
      lastReported: '2 days ago',
      recentActivity: 'High',
      location: 'Unknown / Spoofed',
      recommendation: 'Block this number immediately',
    };
  } else if (lastDigit % 3 === 1) {
    return {
      phoneNumber,
      riskLevel: 'medium',
      riskScore: 45,
      spamLikelihood: 'Possible',
      reportCount: 23,
      categories: ['Telemarketing'],
      lastReported: '2 weeks ago',
      recentActivity: 'Medium',
      location: 'New York, USA',
      recommendation: 'Exercise caution when answering',
    };
  } else {
    return {
      phoneNumber,
      riskLevel: 'low',
      riskScore: 12,
      spamLikelihood: 'Unlikely',
      reportCount: 2,
      categories: ['Unknown'],
      lastReported: '3 months ago',
      recentActivity: 'Low',
      location: 'California, USA',
      recommendation: 'Likely safe, but remain vigilant',
    };
  }
};

const PhoneResultPage = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const analyzedPhone = sessionStorage.getItem('analyzedPhone');
    
    if (!analyzedPhone) {
      navigate('/phone-analysis');
      return;
    }
    
    // Simulate API loading time
    const timer = setTimeout(() => {
      const analysisResult = getAnalysisResult(analyzedPhone);
      setResult(analysisResult);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-scanberry-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-scanberry-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg">Analyzing phone number...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-scanberry-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link to="/phone-analysis" className="inline-flex items-center text-scanberry-primary hover:underline mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Phone Analysis
        </Link>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Phone Number Analysis Results</h1>
        <p className="text-gray-600 mb-8">
          Analysis results for {result?.phoneNumber}
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-scanberry-primary" />
                    Phone Analysis Summary
                  </CardTitle>
                  
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result?.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                    result?.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {result?.riskLevel === 'high' && (
                      <span className="flex items-center">
                        <AlertTriangle className="mr-1 h-4 w-4" />
                        High Risk
                      </span>
                    )}
                    {result?.riskLevel === 'medium' && (
                      <span className="flex items-center">
                        <AlertCircle className="mr-1 h-4 w-4" />
                        Medium Risk
                      </span>
                    )}
                    {result?.riskLevel === 'low' && (
                      <span className="flex items-center">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Low Risk
                      </span>
                    )}
                  </div>
                </div>
                <CardDescription>
                  {result?.recommendation}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-4">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Risk Score</span>
                      <span className="text-sm font-bold">{result?.riskScore}/100</span>
                    </div>
                    <Progress value={result?.riskScore} className={`h-2 ${
                      result?.riskLevel === 'high' ? 'bg-red-200' :
                      result?.riskLevel === 'medium' ? 'bg-yellow-200' :
                      'bg-green-200'
                    }`} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Spam Likelihood</h3>
                      <p className="font-semibold">{result?.spamLikelihood}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Reports</h3>
                      <p className="font-semibold">{result?.reportCount} user reports</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Last Reported</h3>
                      <p className="font-semibold">{result?.lastReported}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Recent Activity</h3>
                      <p className="font-semibold">{result?.recentActivity}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Categories</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {result?.categories.map((category: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Estimated Location</h3>
                      <p className="font-semibold">{result?.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What should I do?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result?.riskLevel === 'high' && (
                    <div className="space-y-2">
                      <p className="font-medium">This number shows strong indicators of spam or scam activity:</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Block this number on your phone immediately</li>
                        <li>Do not return calls to this number</li>
                        <li>If you've shared personal information, monitor your accounts</li>
                        <li>Report the number to your local authorities if you've been scammed</li>
                        <li>Consider registering for identity theft protection</li>
                      </ul>
                    </div>
                  )}
                  
                  {result?.riskLevel === 'medium' && (
                    <div className="space-y-2">
                      <p className="font-medium">This number has some suspicious activity:</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Exercise caution when answering calls from this number</li>
                        <li>Don't share personal or financial information</li>
                        <li>Consider using your phone's spam filter or call screening</li>
                        <li>Report the number if you receive unwanted calls</li>
                      </ul>
                    </div>
                  )}
                  
                  {result?.riskLevel === 'low' && (
                    <div className="space-y-2">
                      <p className="font-medium">This number appears to be legitimate:</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>The number has very few or no spam reports</li>
                        <li>It's likely a legitimate business or individual</li>
                        <li>As always, be cautious about sharing sensitive information</li>
                        <li>If the behavior changes, you can always check again</li>
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  Add to Blocklist
                </Button>
                <Button className="w-full" variant="outline">
                  Report this Number
                </Button>
                <Button className="w-full" variant="outline">
                  Save to History
                </Button>
                <Button className="w-full" variant="outline">
                  Print Report
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Similar Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Try our other scanning tools:</p>
                <div className="space-y-2">
                  <Link to="/message-analysis">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Analyze a Message
                    </Button>
                  </Link>
                  <Link to="/url-scan">
                    <Button variant="outline" className="w-full justify-start">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Scan a URL
                    </Button>
                  </Link>
                  <Link to="/link-analysis">
                    <Button variant="outline" className="w-full justify-start">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Analyze Multiple Links
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneResultPage;
