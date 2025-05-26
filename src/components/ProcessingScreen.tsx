
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProcessingScreenProps {
  onComplete: (data: { childAge: string; childClass: string; whatsappNumber: string }) => void;
}

const processingSteps = [
  { text: "Analyzing compatibility patterns...", progress: 20 },
  { text: "Computing career intersections...", progress: 45 },
  { text: "Processing dream alignment...", progress: 70 },
  { text: "Generating personalized insights...", progress: 90 },
  { text: "Finalizing recommendations...", progress: 100 }
];

const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [childAge, setChildAge] = useState('');
  const [childClass, setChildClass] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        } else {
          setShowForm(true);
          clearInterval(timer);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    setTimeout(() => {
      onComplete({ childAge, childClass, whatsappNumber });
    }, 1000);
  };

  const handleSkip = () => {
    setTimeout(() => {
      onComplete({ childAge: '', childClass: '', whatsappNumber: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Scientific Header */}
        <div className="text-center mb-12">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin"></div>
            <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-3xl">🧬</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Career Analysis
          </h1>
          <p className="text-xl text-blue-200">
            Processing your family's dream compatibility...
          </p>
        </div>

        {/* Processing Animation */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
          <div className="space-y-6">
            {processingSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep ? 'bg-green-500' : 'bg-gray-600'
                }`}>
                  {index <= currentStep ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <p className={`text-lg ${
                    index <= currentStep ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.text}
                  </p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        index <= currentStep ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gray-600'
                      }`}
                      style={{ 
                        width: index <= currentStep ? '100%' : '0%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Collection Form */}
        {showForm && (
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Almost Ready! 🎯
              </h2>
              <p className="text-gray-600">
                Help us personalize your results (optional):
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="childAge" className="text-gray-700 font-semibold">
                  Your child's age (optional)
                </Label>
                <Input
                  id="childAge"
                  type="number"
                  placeholder="e.g., 8"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  className="mt-2 text-lg p-4"
                  min="1"
                  max="18"
                />
              </div>

              <div>
                <Label htmlFor="childClass" className="text-gray-700 font-semibold">
                  Your child's class/grade (optional)
                </Label>
                <Input
                  id="childClass"
                  type="text"
                  placeholder="e.g., Grade 3, Class 5"
                  value={childClass}
                  onChange={(e) => setChildClass(e.target.value)}
                  className="mt-2 text-lg p-4"
                />
              </div>
              
              <div>
                <Label htmlFor="whatsapp" className="text-gray-700 font-semibold">
                  Your WhatsApp number (optional)
                </Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  placeholder="e.g., +1234567890"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="mt-2 text-lg p-4"
                />
                <p className="text-sm text-gray-500 mt-1">
                  No updates, just for personalized tips
                </p>
              </div>
            </div>

            <div className="text-center mt-8 space-y-4">
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xl px-12 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Generate My Results! ✨
              </Button>
              <div>
                <Button
                  onClick={handleSkip}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Skip and see results →
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Scientific Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen;
