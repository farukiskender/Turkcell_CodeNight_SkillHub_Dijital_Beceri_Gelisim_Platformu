import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  toggleSidebar: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, toggleSidebar, searchTerm, onSearchChange }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-indigo-600 hidden sm:block">Turkcell SkillHub</h1>
      </div>

      <div className="flex items-center flex-1 max-w-md mx-4 bg-gray-100 rounded-lg px-3 py-2 border border-transparent focus-within:border-indigo-300 transition-all">
        <Search size={20} className="text-gray-400" />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search lessons, skills..." 
          className="bg-transparent border-none outline-none ml-2 w-full text-sm text-gray-900 placeholder-gray-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-50 rounded-full text-gray-600">
          <Bell size={24} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="flex items-center gap-2">
          <img 
            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} 
            alt={user.name} 
            className="w-10 h-10 rounded-full border-2 border-indigo-100"
          />
          <div className="hidden md:block text-sm">
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-gray-500 text-xs">{user.skill_level} Student</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;