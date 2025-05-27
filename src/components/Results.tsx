
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResultsProps {
  quizData: {
    parentChoice: string;
    childChoice: string;
    childClass: string;
    whatsappNumber: string;
    apiCareerSuggestion: string;
  };
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ quizData, onRestart }) => {
  const { toast } = useToast();
  const isMatch = quizData.parentChoice.toLowerCase() === quizData.childChoice.toLowerCase();
  
  const formatCareerSuggestion = (suggestion: string) => {
    // Format the API response for better display
    return suggestion || 'Exciting new possibilities await! Your unique combination of interests opens doors to innovative career paths.';
  };

  const combinedPath = formatCareerSuggestion(quizData.apiCareerSuggestion);

  const handleShare = async () => {
    const classText = quizData.childClass ? ` (Class ${quizData.childClass})` : '';

    const shareText = `🎯 Dream Quest Results! 🌟

👨‍👩‍👧‍👦 Parent's Hope: ${quizData.parentChoice}
🌟 Child's Dream${classText}: ${quizData.childChoice}
🚀 Perfect Career Combination: ${combinedPath}

${isMatch ? '🎉 Perfect Match! Great communication between parent and child!' : '🌈 Different dreams can work together beautifully!'}

Try the quiz yourself: ${window.location.origin}

#DreamQuest #CareerGoals #FamilyDreams`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Dream Quest Results',
          text: shareText,
          url: window.location.origin,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Copied to clipboard! 📋",
          description: "Share your results with family and friends!",
        });
      }
    } catch (error) {
      console.log('Share cancelled or failed');
    }
  };

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

        {/* API-Generated Career Path Section */}
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
              <div className="text-lg text-gray-800 whitespace-pre-line">{combinedPath}</div>
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

        {/* Action Buttons */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onRestart}
              className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
            >
              Play Again! 🎮
            </Button>
            <Button 
              onClick={handleShare}
              variant="outline"
              className="border-orange-500 text-orange-600 hover:bg-orange-50 text-lg px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
            >
              <Share className="w-5 h-5 mr-2" />
              Share Results! 📱
            </Button>
          </div>
          
          <p className="text-gray-600">
            Thanks for playing Mann Ki Baat: Career Edition! Keep dreaming big! ✨
          </p>
          
          {/* PhysicsWallah Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm font-light">
              Created with Care by PhysicsWallah 💙
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
