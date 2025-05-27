
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ProcessingScreenProps {
  onComplete: (data: { childClass: string; whatsappNumber: string }) => void;
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

// Hardcoded Google Apps Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4BJbIXZsAVM0QsbFPkA_DIxj9mt4CaJzH_-Cf6xbluSVA2iWRs3iwYG6X3uf2UzeZSw/exec';

// Career combinations mapping
const careerCombinations = {
  'Doctor/Healthcare Professional': {
    'Doctor/Healthcare Professional': 'Healthcare',
    'Engineer': 'Biomedical Engineering, Med Tech',
    'Teacher/Educator': 'Medical Educator, Health Coach',
    'Police/Army/Defense Services': 'Forensic Medicine, Medical Corps',
    'Artist/Creative Fields': 'Medical Illustration, Health Communication',
    'Sportsman': 'Sports Medicine, Physiotherapy'
  },
  'Engineer': {
    'Doctor/Healthcare Professional': 'Biomedical Engineering, Med Tech',
    'Engineer': 'Engineering',
    'Teacher/Educator': 'STEM Teacher, Tech Trainer',
    'Police/Army/Defense Services': 'Defense Technology, Engineering Corps',
    'Artist/Creative Fields': 'UX/UI Design, Creative Tech',
    'Sportsman': 'Sports Equipment Design, Tech in Sports'
  },
  'Teacher/Educator': {
    'Doctor/Healthcare Professional': 'Health Educator, Public Health',
    'Engineer': 'STEM Education, EdTech Developer',
    'Teacher/Educator': 'Teaching',
    'Police/Army/Defense Services': 'Police Academy Instructor',
    'Artist/Creative Fields': 'Arts Educator, Creative Workshop',
    'Sportsman': 'Physical Education Teacher, Sports Coaching'
  },
  'Police/Army/Defense Services': {
    'Doctor/Healthcare Professional': 'Medical Corps, Paramedic',
    'Engineer': 'Defense Technology, Cybersecurity',
    'Teacher/Educator': 'Training Officer, Leadership Coach',
    'Police/Army/Defense Services': 'Defense Services',
    'Artist/Creative Fields': 'Crisis Communication, Tactical Media',
    'Sportsman': 'Physical Training Instructor, Sports in Defense'
  },
  'Artist/Creative Fields': {
    'Doctor/Healthcare Professional': 'Medical Illustration, Therapeutic Arts',
    'Engineer': 'Creative Tech, Animation Engineering',
    'Teacher/Educator': 'Arts Educator, Drama Teacher',
    'Police/Army/Defense Services': 'Media Relations, Creative Communication',
    'Artist/Creative Fields': 'Creative Fields',
    'Sportsman': 'Sports Branding, Performance Arts'
  },
  'Sportsman': {
    'Doctor/Healthcare Professional': 'Sports Medicine, Physiotherapy',
    'Engineer': 'Sports Tech, Equipment Design',
    'Teacher/Educator': 'Physical Education Teacher, Coach',
    'Police/Army/Defense Services': 'Physical Training Instructor',
    'Artist/Creative Fields': 'Sports Branding, Sports Media',
    'Sportsman': 'Professional Athlete, Sports Management'
  }
};

const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onComplete, quizData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [childClass, setChildClass] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
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

  const getCombinedCareerPath = () => {
    if (!quizData) return 'Exciting new possibilities await!';
    return careerCombinations[quizData.parentChoice as keyof typeof careerCombinations]?.[quizData.childChoice as keyof typeof careerCombinations[keyof typeof careerCombinations]] || 'Exciting new possibilities await!';
  };

  const sendToGoogleSheet = async (formData: {
    parentChoice: string;
    childChoice: string;
    childClass: string;
    whatsappNumber: string;
  }) => {
    try {
      const isMatch = formData.parentChoice.toLowerCase() === formData.childChoice.toLowerCase();
      const suggestedCareer = getCombinedCareerPath();
      
      const dataToSend = {
        timestamp: new Date().toISOString(),
        parentChoice: formData.parentChoice,
        childChoice: formData.childChoice,
        childClass: formData.childClass,
        whatsappNumber: formData.whatsappNumber,
        isMatch: isMatch,
        matchStatus: isMatch ? 'Perfect Match' : 'Different Dreams',
        suggestedCareer: suggestedCareer,
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
      });
    }

    setTimeout(() => {
      onComplete({ childClass: childClass || 'Not specified', whatsappNumber: whatsappNumber || 'Not provided' });
    }, 1000);
  };

  const handleSkip = async () => {
    if (quizData) {
      await sendToGoogleSheet({
        parentChoice: quizData.parentChoice,
        childChoice: quizData.childChoice,
        childClass: 'Skipped',
        whatsappNumber: 'Skipped',
      });
    }

    setTimeout(() => {
      onComplete({ childClass: 'Not specified', whatsappNumber: 'Not provided' });
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
              className="bg-orange-500 hover:bg-orange-600 text-white text-xl px-12 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 w-full"
            >
              Generate My Results! ✨
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
              Processing in background...
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
