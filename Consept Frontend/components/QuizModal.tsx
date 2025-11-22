import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { Quiz } from '../types';

interface QuizModalProps {
  lessonTitle: string;
  quiz: Quiz;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ lessonTitle, quiz, isOpen, onClose, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!selectedOption) return;
    const correct = selectedOption === quiz.correct_answer;
    setIsCorrect(correct);
    setIsSubmitted(true);
    
    // In a real app, we might wait a moment before closing
    setTimeout(() => {
        onComplete(correct ? 100 : 0);
        // Reset for next time
        setTimeout(() => {
            setIsSubmitted(false);
            setSelectedOption(null);
            onClose();
        }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-sm text-indigo-600 font-semibold uppercase tracking-wide">Quiz</h3>
            <h2 className="text-xl font-bold text-gray-900">{lessonTitle}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-lg text-gray-800 mb-6 font-medium">{quiz.question_text}</p>
          
          <div className="space-y-3">
            {quiz.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !isSubmitted && setSelectedOption(option)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all relative text-black font-medium
                  ${isSubmitted && option === quiz.correct_answer 
                    ? 'border-green-500 bg-green-50' 
                    : isSubmitted && selectedOption === option && option !== quiz.correct_answer
                    ? 'border-red-500 bg-red-50'
                    : selectedOption === option 
                    ? 'border-indigo-600 bg-indigo-50' 
                    : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'}
                `}
                disabled={isSubmitted}
              >
                {option}
                {isSubmitted && option === quiz.correct_answer && (
                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600" size={20} />
                )}
                {isSubmitted && selectedOption === option && option !== quiz.correct_answer && (
                    <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-600" size={20} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          {!isSubmitted ? (
            <button
                onClick={handleSubmit}
                disabled={!selectedOption}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Submit Answer
            </button>
          ) : (
            <div className={`font-bold text-lg ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? 'Correct! +100 Points' : 'Incorrect!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;