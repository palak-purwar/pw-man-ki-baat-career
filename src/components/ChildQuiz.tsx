
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ChildQuizProps {
  onComplete: (choice: string) => void;
}

const dreamJobs = [
  { id: 'superhero', name: 'Superhero', emoji: '🦸‍♀️', description: 'Save the world!' },
  { id: 'astronaut', name: 'Astronaut', emoji: '🚀', description: 'Explore space!' },
  { id: 'doctor', name: 'Doctor', emoji: '👩‍⚕️', description: 'Help people feel better!' },
  { id: 'teacher', name: 'Teacher', emoji: '👩‍🏫', description: 'Teach other kids!' },
  { id: 'artist', name: 'Artist', emoji: '🎨', description: 'Make amazing art!' },
  { id: 'chef', name: 'Chef', emoji: '👨‍🍳', description: 'Cook yummy food!' },
  { id: 'firefighter', name: 'Firefighter', emoji: '🚒', description: 'Be a hero!' },
  { id: 'musician', name: 'Musician', emoji: '🎵', description: 'Make awesome music!' },
  { id: 'scientist', name: 'Scientist', emoji: '🔬', description: 'Discover cool things!' },
  { id: 'athlete', name: 'Athlete', emoji: '🏃‍♀️', description: 'Win medals!' },
  { id: 'gamer', name: 'Video Game Creator', emoji: '🎮', description: 'Make fun games!' },
  { id: 'veterinarian', name: 'Veterinarian', emoji: '🐕', description: 'Help animals!' }
];

const ChildQuiz: React.FC<ChildQuizProps> = ({ onComplete }) => {
  const [selectedDream, setSelectedDream] = useState<string>('');

  const handleSubmit = () => {
    if (selectedDream) {
      const dream = dreamJobs.find(option => option.id === selectedDream);
      onComplete(dream?.name || selectedDream);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
            <span className="text-white text-4xl">🌟</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-orange-600 mb-4">
            Hey there, superstar! 
          </h1>
          <p className="text-xl text-gray-700">
            What do YOU want to be when you grow up?
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {dreamJobs.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedDream(option.id)}
              className={`
                p-4 rounded-2xl border-3 cursor-pointer transition-all duration-200 transform hover:scale-105
                ${selectedDream === option.id 
                  ? 'border-orange-500 bg-orange-200 shadow-xl' 
                  : 'border-orange-200 bg-white hover:border-orange-400 hover:shadow-lg'
                }
              `}
            >
              <div className="text-center">
                <div className="text-5xl mb-2">{option.emoji}</div>
                <h3 className="font-bold text-gray-800 mb-1 text-sm">{option.name}</h3>
                <p className="text-xs text-gray-600">{option.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleSubmit}
            disabled={!selectedDream}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:bg-gray-300 text-white text-xl px-10 py-5 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 font-bold"
          >
            That's my dream! 🎉
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChildQuiz;
