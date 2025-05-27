
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ParentQuizProps {
  onComplete: (choice: string) => void;
}

const careerOptions = [
  { id: 'doctor', name: 'Doctor/Healthcare Professional', emoji: '👩‍⚕️', description: 'Helping people stay healthy' },
  { id: 'engineer', name: 'Engineer', emoji: '👩‍💻', description: 'Building the future' },
  { id: 'teacher', name: 'Teacher/Educator', emoji: '👩‍🏫', description: 'Inspiring young minds' },
  { id: 'defense', name: 'Police/Army/Defense Services', emoji: '👮‍♀️', description: 'Protecting and serving' },
  { id: 'artist', name: 'Artist/Creative Fields', emoji: '🎨', description: 'Creating beautiful things' },
  { id: 'sportsman', name: 'Sportsman', emoji: '🏃‍♀️', description: 'Athletic excellence' },
  { id: 'other', name: 'Other', emoji: '📝', description: 'Type your own choice' }
];

const ParentQuiz: React.FC<ParentQuizProps> = ({ onComplete }) => {
  const [selectedCareer, setSelectedCareer] = useState<string>('');
  const [customCareer, setCustomCareer] = useState<string>('');

  const handleCareerSelect = (careerId: string) => {
    setSelectedCareer(careerId);
    if (careerId !== 'other') {
      setCustomCareer('');
    }
  };

  const handleSubmit = () => {
    if (selectedCareer === 'other' && customCareer.trim()) {
      onComplete(customCareer.trim());
    } else if (selectedCareer && selectedCareer !== 'other') {
      const career = careerOptions.find(option => option.id === selectedCareer);
      onComplete(career?.name || selectedCareer);
    }
  };

  const isSubmitDisabled = !selectedCareer || (selectedCareer === 'other' && !customCareer.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-white text-3xl">👨‍👩‍👧‍👦</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
            Dear Parent
          </h1>
          <p className="text-xl text-gray-700">
            What do you hope your child becomes when they grow up?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {careerOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleCareerSelect(option.id)}
              className={`
                p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 transform hover:scale-105
                ${selectedCareer === option.id 
                  ? 'border-orange-500 bg-orange-100 shadow-lg' 
                  : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-md'
                }
              `}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{option.emoji}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{option.name}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedCareer === 'other' && (
          <div className="mb-8 max-w-md mx-auto">
            <div className="bg-white p-6 rounded-xl border-2 border-orange-200 shadow-md">
              <label htmlFor="custom-career" className="block text-lg font-semibold text-gray-800 mb-3">
                What career do you hope for your child?
              </label>
              <Input
                id="custom-career"
                type="text"
                value={customCareer}
                onChange={(e) => setCustomCareer(e.target.value)}
                placeholder="Enter your choice..."
                className="text-lg p-4 border-orange-300 focus:border-orange-500"
                maxLength={100}
              />
            </div>
          </div>
        )}

        <div className="text-center">
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white text-lg px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            That's my choice! ✨
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParentQuiz;
