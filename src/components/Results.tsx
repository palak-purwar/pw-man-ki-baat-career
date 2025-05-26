
import React from 'react';
import { Button } from '@/components/ui/button';

interface ResultsProps {
  quizData: {
    parentChoice: string;
    childChoice: string;
  };
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ quizData, onRestart }) => {
  const isMatch = quizData.parentChoice.toLowerCase() === quizData.childChoice.toLowerCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="max-w-3xl mx-auto py-8">
        <div className="text-center mb-8">
          <div className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center ${
            isMatch ? 'bg-green-500' : 'bg-orange-500'
          }`}>
            <span className="text-white text-6xl">
              {isMatch ? '🎉' : '💭'}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-orange-600 mb-4">
            Results are in!
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Parent's Hope</h3>
              <p className="text-2xl font-bold text-orange-600">{quizData.parentChoice}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Child's Dream</h3>
              <p className="text-2xl font-bold text-yellow-600">{quizData.childChoice}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {isMatch ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-600 mb-4">Perfect Match! 🎯</h2>
              <p className="text-lg text-gray-700 mb-4">
                Wow! You both have the same vision. This shows great communication and 
                understanding between parent and child!
              </p>
              <div className="bg-green-100 p-4 rounded-xl">
                <p className="text-green-800 font-semibold">
                  Keep nurturing this shared dream together! 💚
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-orange-600 mb-4">Different Dreams! 🌈</h2>
              <p className="text-lg text-gray-700 mb-4">
                This is perfectly normal and wonderful! Different perspectives can lead to 
                great conversations about hopes, dreams, and possibilities.
              </p>
              <div className="bg-orange-100 p-4 rounded-xl">
                <p className="text-orange-800 font-semibold">
                  Talk about both dreams - there might be ways to combine them or explore new paths! 🚀
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center space-y-4">
          <Button 
            onClick={onRestart}
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Play Again! 🎮
          </Button>
          <p className="text-gray-600">
            Thanks for playing Dream Quest! Keep dreaming big! ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;
