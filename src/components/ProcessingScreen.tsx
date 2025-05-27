import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ProcessingScreenProps {
  onComplete: (data: { childClass: string; whatsappNumber: string; apiCareerSuggestion: string }) => void;
  quizData?: {
    parentChoice: string;
    childChoice: string;
  };
}

const processingSteps = [
  { text: "Analyzing compatibility patterns...", progress: 20 },
  { text: "Computing career intersections...", progress: 45 },
  { text: "Processing dream alignment...", progress: 70 },
  { text: "Generating personalized insights...", progress: 90 },
  { text: "Finalizing recommendations...", progress: 100 }
];

// Updated Google Apps Script URL for career suggestions
const CAREER_API_URL = 'https://script.google.com/macros/s/AKfycbyevSps0MQINwzF2y9tDKQY3MwI3R4xtBMcFTK6aMq2BG0P9XCCA1zPHBg7VBqDfsYX/exec';

// Hardcoded Google Apps Script URL for data logging
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4BJbIXZsAVM0QsbFPkA_DIxj9mt4CaJzH_-Cf6xbluSVA2iWRs3iwYG6X3uf2UzeZSw/exec';

// Original career matrix for fallback
const getCareerCombination = (parentChoice: string, childChoice: string): string => {
  const careerMatrix: { [key: string]: { [key: string]: string } } = {
    "Doctor": {
      "Doctor": "Medical Research or Specialized Medicine - Follow your shared passion for healing and make groundbreaking discoveries!",
      "Engineer": "Biomedical Engineering - Design medical devices and technology that save lives!",
      "Teacher": "Medical Education - Become a professor at medical colleges, shaping the next generation of doctors!",
      "Artist": "Medical Illustration - Create detailed anatomical drawings and educational materials for medical field!",
      "Sportsman": "Sports Medicine - Help athletes recover and perform at their best using medical expertise!"
    },
    "Engineer": {
      "Doctor": "Biomedical Engineering - Design medical devices and technology that save lives!",
      "Engineer": "Advanced Engineering - Specialize in cutting-edge fields like AI, robotics, or aerospace engineering!",
      "Teacher": "Engineering Education - Become a professor and inspire future engineers with practical knowledge!",
      "Artist": "Creative Technology - Design beautiful user interfaces and digital experiences!",
      "Sportsman": "Sports Technology - Create innovative sports equipment and performance analysis systems!"
    },
    "Teacher": {
      "Doctor": "Medical Education - Teach medical students and contribute to healthcare education!",
      "Engineer": "STEM Education - Inspire students in science, technology, engineering, and mathematics!",
      "Teacher": "Educational Leadership - Become a principal, educational consultant, or curriculum designer!",
      "Artist": "Arts Education - Share your passion for creativity and inspire artistic expression!",
      "Sportsman": "Physical Education - Combine teaching with sports to promote healthy lifestyles!"
    },
    "Artist": {
      "Doctor": "Medical Art - Create medical illustrations, therapy through art, or aesthetic medicine!",
      "Engineer": "Design Engineering - Combine creativity with technical skills in product design!",
      "Teacher": "Art Education - Share your passion for creativity and inspire artistic expression!",
      "Artist": "Professional Arts - Pursue fine arts, digital media, or creative entrepreneurship!",
      "Sportsman": "Sports Design - Design athletic wear, equipment, or create sports-related artwork!"
    },
    "Sportsman": {
      "Doctor": "Sports Medicine - Help athletes and promote fitness through medical expertise!",
      "Engineer": "Sports Technology - Develop innovative training equipment and performance analytics!",
      "Teacher": "Sports Education - Become a PE teacher or sports coach at schools!",
      "Artist": "Sports Media - Create sports content, photography, or athletic brand design!",
      "Sportsman": "Professional Sports - Excel in athletics, coaching, or sports management!"
    }
  };

  return careerMatrix[parentChoice]?.[childChoice] || 
         "Exciting new possibilities await! Your unique combination of interests opens doors to innovative career paths.";
};

const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onComplete, quizData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [childClass, setChildClass] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [apiCareerSuggestion, setApiCareerSuggestion] = useState('');
  const [isLoadingCareerSuggestion, setIsLoadingCareerSuggestion] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch career suggestion from API with timeout fallback
  useEffect(() => {
    if (quizData?.parentChoice && quizData?.childChoice) {
      fetchCareerSuggestion();
    }
  }, [quizData]);

  const fetchCareerSuggestion = async () => {
    if (!quizData) return;
    
    setIsLoadingCareerSuggestion(true);
    try {
      console.log('Calling Career API with:', {
        parentCareer: quizData.parentChoice,
        kidCareer: quizData.childChoice
      });

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(CAREER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentCareer: quizData.parentChoice,
          kidCareer: quizData.childChoice
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();
      console.log('Career API response:', data);

      if (data.status === 'success' && data.feedback) {
        setApiCareerSuggestion(data.feedback);
      } else {
        // Fallback to original matrix
        const fallbackSuggestion = getCareerCombination(quizData.parentChoice, quizData.childChoice);
        setApiCareerSuggestion(fallbackSuggestion);
      }
    } catch (error) {
      console.error('Error fetching career suggestion:', error);
      // Fallback to original matrix
      const fallbackSuggestion = getCareerCombination(quizData.parentChoice, quizData.childChoice);
      setApiCareerSuggestion(fallbackSuggestion);
      
      if (error.name === 'AbortError') {
        console.log('API request timed out, using fallback');
      }
    } finally {
      setIsLoadingCareerSuggestion(false);
    }
  };

  const sendToGoogleSheet = async (formData: {
    parentChoice: string;
    childChoice: string;
    childClass: string;
    whatsappNumber: string;
    apiCareerSuggestion: string;
  }) => {
    try {
      const isMatch = formData.parentChoice.toLowerCase() === formData.childChoice.toLowerCase();
      
      const dataToSend = {
        timestamp: new Date().toISOString(),
        parentChoice: formData.parentChoice,
        childChoice: formData.childChoice,
        childClass: formData.childClass,
        whatsappNumber: formData.whatsappNumber,
        isMatch: isMatch,
        matchStatus: isMatch ? 'Perfect Match' : 'Different Dreams',
        suggestedCareer: formData.apiCareerSuggestion,
      };

      console.log('Sending data to Google Sheet:', dataToSend);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(dataToSend),
      });

      console.log('Data sent to Google Sheet successfully');
      
    } catch (error) {
      console.error('Error sending data to Google Sheet:', error);
    }
  };

  const handleSubmit = async () => {
    if (quizData) {
      await sendToGoogleSheet({
        parentChoice: quizData.parentChoice,
        childChoice: quizData.childChoice,
        childClass: childClass || 'Not specified',
        whatsappNumber: whatsappNumber || 'Not provided',
        apiCareerSuggestion: apiCareerSuggestion || 'API suggestion not available',
      });
    }

    setTimeout(() => {
      onComplete({ 
        childClass: childClass || 'Not specified', 
        whatsappNumber: whatsappNumber || 'Not provided',
        apiCareerSuggestion: apiCareerSuggestion || 'Exciting new possibilities await!'
      });
    }, 1000);
  };

  const handleSkip = async () => {
    if (quizData) {
      await sendToGoogleSheet({
        parentChoice: quizData.parentChoice,
        childChoice: quizData.childChoice,
        childClass: 'Skipped',
        whatsappNumber: 'Skipped',
        apiCareerSuggestion: apiCareerSuggestion || 'API suggestion not available',
      });
    }

    setTimeout(() => {
      onComplete({ 
        childClass: 'Not specified', 
        whatsappNumber: 'Not provided',
        apiCareerSuggestion: apiCareerSuggestion || 'Exciting new possibilities await!'
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-white text-4xl">🎯</span>
          </div>
          <h1 className="text-4xl font-bold text-orange-600 mb-4">
            Mann Ki Baat: Career Edition
          </h1>
          <p className="text-xl text-gray-700">
            Let's gather some details while we prepare your results!
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Child Details 🎯
            </h2>
            <p className="text-gray-600">
              Help us personalize your experience:
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="childClass" className="text-gray-700 font-semibold">
                Child's Class
              </Label>
              <Select value={childClass} onValueChange={setChildClass}>
                <SelectTrigger className="mt-2 text-lg p-4">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((classNum) => (
                    <SelectItem key={classNum} value={classNum.toString()}>
                      Class {classNum}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="whatsapp" className="text-gray-700 font-semibold">
                WhatsApp Number
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
              disabled={isLoadingCareerSuggestion}
              className="bg-orange-500 hover:bg-orange-600 text-white text-xl px-12 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 w-full disabled:opacity-50"
            >
              {isLoadingCareerSuggestion ? 'Generating Suggestions...' : 'Generate My Results! ✨'}
            </Button>
            
            <Button
              onClick={handleSkip}
              variant="ghost"
              className="text-gray-600 hover:text-gray-800 text-lg px-8 py-2 w-full"
            >
              Skip and continue →
            </Button>
          </div>
        </div>

        {/* Background Processing Animation */}
        <div className="bg-orange-100/50 rounded-2xl p-6">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
              <span className="text-white text-2xl">🧬</span>
            </div>
            <h3 className="text-lg font-semibold text-orange-700 mb-2">
              {isLoadingCareerSuggestion ? 'Generating career suggestions...' : 'Processing in background...'}
            </h3>
          </div>
          
          <div className="space-y-3">
            {processingSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                  index <= currentStep ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {index <= currentStep ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${
                    index <= currentStep ? 'text-orange-700' : 'text-gray-500'
                  }`}>
                    {step.text}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-1000 ${
                        index <= currentStep ? 'bg-orange-500' : 'bg-gray-300'
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

        {/* PhysicsWallah Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm font-light">
            Created with Care by PhysicsWallah 💙
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen;
