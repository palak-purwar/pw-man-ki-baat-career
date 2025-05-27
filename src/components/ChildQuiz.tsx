
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChildQuizProps {
  onComplete: (choice: string) => void;
}

const dreamJobs = [
  { id: 'doctor', name: 'Doctor/Healthcare Professional', emoji: '👩‍⚕️', description: 'Help people feel better!' },
  { id: 'engineer', name: 'Engineer', emoji: '👩‍💻', description: 'Build amazing things!' },
  { id: 'teacher', name: 'Teacher/Educator', emoji: '👩‍🏫', description: 'Teach other kids!' },
  { id: 'defense', name: 'Police/Army/Defense Services', emoji: '👮‍♀️', description: 'Be a hero and protect!' },
  { id: 'artist', name: 'Artist/Creative Fields', emoji: '🎨', description: 'Make amazing art!' },
  { id: 'sportsman', name: 'Sportsman', emoji: '🏃‍♀️', description: 'Win medals and be strong!' },
  { id: 'other', name: 'Something else!', emoji: '📝', description: 'Tell us your dream!' }
];

const ChildQuiz: React.FC<ChildQuizProps> = ({ onComplete }) => {
  const [selectedDream, setSelectedDream] = useState<string>('');
  const [customDream, setCustomDream] = useState<string>('');

  const handleDreamSelect = (dreamId: string) => {
    setSelectedDream(dreamId);
    if (dreamId !== 'other') {
      setCustomDream('');
    }
  };

  const handleSubmit = () => {
    if (selectedDream === 'other' && customDream.trim()) {
      onComplete(customDream.trim());
    } else if (selectedDream && selectedDream !== 'other') {
      const dream = dreamJobs.find(option => option.id === selectedDream);
      onComplete(dream?.name || selectedDream);
    }
  };

  const isSubmitDisabled = !selectedDream || (selectedDream === 'other' && !customDream.trim());

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {dreamJobs.map((option) => (
            <div
              key={option.id}
              onClick={() => handleDreamSelect(option.id)}
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

        {selectedDream === 'other' && (
          <div className="mb-8 max-w-md mx-auto">
            <div className="bg-white p-6 rounded-2xl border-3 border-orange-300 shadow-lg">
              <label htmlFor="custom-dream" className="block text-lg font-bold text-gray-800 mb-3">
                What do you want to be? 🌈
              </label>
              <Input
                id="custom-dream"
                type="text"
                value={customDream}
                onChange={(e) => setCustomDream(e.target.value)}
                placeholder="Tell us your dream..."
                className="text-lg p-4 border-orange-300 focus:border-orange-500 rounded-xl"
                maxLength={100}
              />
            </div>
          </div>
        )}

        <div className="text-center">
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
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
