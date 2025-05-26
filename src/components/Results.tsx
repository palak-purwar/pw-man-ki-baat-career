
import React from 'react';
import { Button } from '@/components/ui/button';

interface ResultsProps {
  quizData: {
    parentChoice: string;
    childChoice: string;
  };
  onRestart: () => void;
}

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

const Results: React.FC<ResultsProps> = ({ quizData, onRestart }) => {
  const isMatch = quizData.parentChoice.toLowerCase() === quizData.childChoice.toLowerCase();
  
  const getCombinedCareerPath = () => {
    return careerCombinations[quizData.parentChoice as keyof typeof careerCombinations]?.[quizData.childChoice as keyof typeof careerCombinations[keyof typeof careerCombinations]] || 'Exciting new possibilities await!';
  };

  const combinedPath = getCombinedCareerPath();

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

        {/* New Combined Career Path Section */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-white text-3xl">🚀</span>
            </div>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Perfect Career Combinations!</h2>
            <p className="text-lg text-gray-700 mb-4">
              Here are exciting career paths that combine both dreams:
            </p>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-purple-600 mb-3">Your Combined Path:</h3>
              <p className="text-2xl font-bold text-gray-800">{combinedPath}</p>
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
                  The career combinations above show how both dreams can work together! 🚀
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
