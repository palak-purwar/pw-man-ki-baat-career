import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ParentQuiz from '@/components/ParentQuiz';
import ChildQuiz from '@/components/ChildQuiz';
import ProcessingScreen from '@/components/ProcessingScreen';
import Results from '@/components/Results';

type QuizPhase = 'welcome' | 'parent' | 'transition' | 'child' | 'processing' | 'results';

interface QuizData {
  parentChoice: string;
  childChoice: string;
  childAge: string;
  childClass: string;
  whatsappNumber: string;
}

const Index = () => {
  const [phase, setPhase] = useState<QuizPhase>('welcome');
  const [quizData, setQuizData] = useState<QuizData>({
    parentChoice: '',
    childChoice: '',
    childAge: '',
    childClass: '',
    whatsappNumber: ''
  });

  const handleParentComplete = (choice: string) => {
    setQuizData(prev => ({ ...prev, parentChoice: choice }));
    setPhase('transition');
  };

  const handleChildComplete = (choice: string) => {
    setQuizData(prev => ({ ...prev, childChoice: choice }));
    setPhase('processing');
  };

  const handleProcessingComplete = (data: { childAge: string; childClass: string; whatsappNumber: string }) => {
    setQuizData(prev => ({ ...prev, ...data }));
    setPhase('results');
  };

  const resetQuiz = () => {
    setPhase('welcome');
    setQuizData({ parentChoice: '', childChoice: '', childAge: '', childClass: '', whatsappNumber: '' });
  };

  if (phase === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-white text-4xl">👨‍👩‍👧‍👦</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-orange-600 mb-4">
              Dream Quest
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              A fun quiz to discover what parents dream for their kids... and what kids dream for themselves!
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How it works:</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <p className="text-gray-700">Parent answers: "What do you want your child to become?"</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <p className="text-gray-700">Pass the phone to your child</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <p className="text-gray-700">Child answers: "What do you want to become?"</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <p className="text-gray-700">See the results together!</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setPhase('parent')}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xl px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Start the Adventure! 🚀
          </Button>
        </div>
      </div>
    );
  }

  if (phase === 'parent') {
    return <ParentQuiz onComplete={handleParentComplete} />;
  }

  if (phase === 'transition') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
        <div className="max-w-xl text-center">
          <div className="w-32 h-32 bg-orange-500 rounded-full mx-auto mb-8 flex items-center justify-center animate-bounce">
            <span className="text-white text-6xl">📱</span>
          </div>
          <h2 className="text-3xl font-bold text-orange-600 mb-6">
            Time to pass the phone!
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Now it's your child's turn to share their dreams!
          </p>
          <Button 
            onClick={() => setPhase('child')}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xl px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            I'm ready! 🌟
          </Button>
        </div>
      </div>
    );
  }

  if (phase === 'child') {
    return <ChildQuiz onComplete={handleChildComplete} />;
  }

  if (phase === 'processing') {
    return <ProcessingScreen onComplete={handleProcessingComplete} />;
  }

  if (phase === 'results') {
    return <Results quizData={quizData} onRestart={resetQuiz} />;
  }

  return null;
};

export default Index;
