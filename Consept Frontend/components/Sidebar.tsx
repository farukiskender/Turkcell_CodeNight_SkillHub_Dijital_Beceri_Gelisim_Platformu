import React from 'react';
import { Home, BookOpen, Award, BarChart2, User, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'leaderboard', label: 'Leaderboard', icon: BarChart2 },
    { id: 'badges', label: 'Badges', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="p-6 flex items-center justify-between lg:justify-start">
        <h2 className="text-2xl font-bold text-indigo-600">SkillHub</h2>
      </div>
      
      <nav className="mt-6 px-4 flex flex-col gap-2 h-full">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
              ${activeTab === item.id 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}

        <div className="mt-auto mb-8 pt-4 border-t border-gray-100">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:text-red-600 transition-colors text-sm font-medium"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;