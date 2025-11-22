import React from 'react';
import { PlayCircle, Clock, BarChart } from 'lucide-react';
import { Lesson, Category } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  category?: Category;
  onClick: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, category, onClick }) => {
  const difficultyColor = {
    'Beginner': 'text-green-600 bg-green-50',
    'Intermediate': 'text-yellow-600 bg-yellow-50',
    'Advanced': 'text-red-600 bg-red-50',
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 overflow-hidden group"
    >
      <div className={`h-2 w-full ${category?.color || 'bg-gray-300'}`}></div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColor[lesson.difficulty]}`}>
            {lesson.difficulty}
          </span>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            {category?.name}
          </span>
        </div>
        <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-indigo-600 transition-colors">
          {lesson.title}
        </h3>
        <div className="flex items-center gap-4 text-gray-500 text-sm mt-4">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{lesson.duration_min} min</span>
          </div>
          <div className="flex items-center gap-1">
            <PlayCircle size={16} />
            <span>Video Lesson</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;