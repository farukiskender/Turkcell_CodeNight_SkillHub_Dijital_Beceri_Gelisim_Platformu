import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LessonCard from './components/LessonCard';
import QuizModal from './components/QuizModal';
import Login from './components/Login';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Sparkles, Trophy, MapPin, CheckCircle, PlayCircle, ArrowLeft, FileText } from 'lucide-react';
import { USERS, LESSONS, CATEGORIES, QUIZ_RESULTS, BADGES, LEADERBOARD, QUIZZES, AUTH_USERS } from './mockData';
import { Lesson, QuizResult, User, Badge } from './types';
import { getPersonalizedRecommendation } from './services/aiService';

const App: React.FC = () => {
  // State for Auth and Data
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(USERS);
  const [allResults, setAllResults] = useState<QuizResult[]>(QUIZ_RESULTS);
  const [allBadges, setAllBadges] = useState<Badge[]>(BADGES);
  
  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null); // New state for lesson detail view
  const [activeQuiz, setActiveQuiz] = useState<{ lesson: Lesson, quiz: any } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  
  // Derived Current User Data
  const currentUser = currentUserId ? allUsers.find(u => u.user_id === currentUserId) || null : null;
  
  const userResults = currentUser 
    ? allResults.filter(r => r.user_id === currentUser.user_id) 
    : [];
    
  const userBadges = currentUser 
    ? allBadges.filter(b => b.user_id === currentUser.user_id) 
    : [];
  
  // Filtered Lessons based on search
  const filteredLessons = LESSONS.filter(l => 
      l.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      CATEGORIES.find(c => c.category_id === l.category_id)?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate progress for chart (Last 5 results)
  const progressData = userResults.slice(0, 5).map(r => {
      const lesson = LESSONS.find(l => l.lesson_id === r.lesson_id);
      return {
          name: lesson ? lesson.title.substring(0, 10) + '...' : r.lesson_id,
          score: r.score
      };
  });

  // Initialization Effect: Check LocalStorage
  useEffect(() => {
      const storedUserId = localStorage.getItem('skillhub_user_id');
      if (storedUserId) {
          // Verify user exists
          const userExists = USERS.find(u => u.user_id === storedUserId);
          if (userExists) {
              setCurrentUserId(storedUserId);
          }
      }
      setIsLoadingSession(false);
  }, []);

  // AI Suggestion Effect
  useEffect(() => {
    if (currentUser && activeTab === 'dashboard') {
        loadAiSuggestion();
    }
  }, [currentUser, activeTab, allResults]); 

  // Authentication Handlers
  const handleLogin = async (email: string, pass: string): Promise<boolean> => {
      return new Promise((resolve) => {
          setTimeout(() => {
              const authMatch = AUTH_USERS.find(u => u.email === email && u.password === pass);
              if (authMatch) {
                  const userDetails = allUsers.find(u => u.user_id === authMatch.user_id);
                  if (userDetails) {
                      setCurrentUserId(userDetails.user_id);
                      localStorage.setItem('skillhub_user_id', userDetails.user_id);
                      resolve(true);
                      return;
                  }
              }
              resolve(false);
          }, 800);
      });
  };

  const handleLogout = () => {
      setCurrentUserId(null);
      localStorage.removeItem('skillhub_user_id');
      setActiveTab('dashboard');
      setAiRecommendation('');
  };

  const loadAiSuggestion = async () => {
      setLoadingAi(true);
      const suggestion = await getPersonalizedRecommendation(userResults, LESSONS);
      setAiRecommendation(suggestion);
      setLoadingAi(false);
  };

  // Navigate to Lesson Detail View
  const handleLessonSelect = (lesson: Lesson) => {
      setSelectedLesson(lesson);
      setActiveTab('lesson-detail');
  };

  // Start Quiz from Lesson Detail View
  const handleStartQuiz = (lesson: Lesson) => {
    const quiz = QUIZZES.find(q => q.lesson_id === lesson.lesson_id);
    if (quiz) {
        setActiveQuiz({ lesson, quiz });
    } else {
        alert(`Content for "${lesson.title}" coming soon! (Missing quiz data)`);
    }
  };

  const handleQuizComplete = (score: number) => {
     if (!currentUser || !activeQuiz) return;
     
     // 1. Create new result
     const newResult: QuizResult = {
         result_id: `R${Date.now()}`,
         user_id: currentUser.user_id,
         lesson_id: activeQuiz.lesson.lesson_id,
         score: score,
         completed_at: new Date().toISOString()
     };

     // 2. Update All Results
     setAllResults(prev => [newResult, ...prev]);

     // 3. Update User Points
     if (score > 0) {
         setAllUsers(prevUsers => prevUsers.map(u => {
             if (u.user_id === currentUser.user_id) {
                 return { ...u, total_points: u.total_points + score };
             }
             return u;
         }));
     }
  };

  const handleTabChange = (tab: string) => {
      setActiveTab(tab);
      setSelectedLesson(null); // Reset selected lesson when changing tabs
      setIsSidebarOpen(false); 
  }

  // Render View: Lesson Detail
  const renderLessonDetail = () => {
    if (!selectedLesson) return null;
    const category = CATEGORIES.find(c => c.category_id === selectedLesson.category_id);

    return (
        <div className="h-full flex flex-col animate-in fade-in">
            <div className="mb-6 flex items-center gap-4">
                <button 
                    onClick={() => setActiveTab('courses')} 
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded text-white ${category?.color || 'bg-gray-500'}`}>
                        {category?.name}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-800 mt-1">{selectedLesson.title}</h2>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 flex-1">
                {/* Center: Video Placeholder */}
                <div className="flex-1 bg-black rounded-2xl flex items-center justify-center relative group overflow-hidden shadow-xl min-h-[300px] lg:min-h-0">
                     <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                         <div className="text-center">
                             <PlayCircle size={64} className="text-white/50 mx-auto mb-4" />
                             <p className="text-white/50 font-medium">Video Placeholder</p>
                             <p className="text-white/30 text-sm mt-2">{selectedLesson.duration_min} minutes</p>
                         </div>
                     </div>
                     {/* Hover Effect */}
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <PlayCircle size={80} className="text-white drop-shadow-lg scale-95 group-hover:scale-100 transition-transform" />
                     </div>
                </div>

                {/* Right: Test Button & Info */}
                <div className="w-full lg:w-80 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Lesson Actions</h3>
                        <button 
                            onClick={() => handleStartQuiz(selectedLesson)}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            <FileText size={20} />
                            Start Test
                        </button>
                        <p className="text-xs text-center text-gray-400 mt-4">
                            Complete the test to earn points and badges.
                        </p>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                        <h3 className="font-bold text-indigo-900 mb-2">About this lesson</h3>
                        <p className="text-indigo-700 text-sm leading-relaxed">
                            Master the concepts of {selectedLesson.title}. This module covers essential topics required for the {category?.name} track.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Panel: Active Lessons */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden animate-in slide-in-from-left-4 duration-500">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
            <Sparkles size={200} />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Welcome back, {currentUser?.name}!</h2>
            <p className="text-indigo-100 mb-6 max-w-md min-h-[3rem]">
              {loadingAi ? "Analyzing your skills for the best next step..." : aiRecommendation}
            </p>
            <div className="flex gap-4">
               <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg">
                  <span className="block text-2xl font-bold">{currentUser?.total_points}</span>
                  <span className="text-xs uppercase opacity-80">Total Points</span>
               </div>
               <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg">
                  <span className="block text-2xl font-bold">{userResults.length}</span>
                  <span className="text-xs uppercase opacity-80">Quizzes Done</span>
               </div>
            </div>
          </div>
        </div>

        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpenIcon className="text-indigo-600" /> Recommended Lessons
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLessons.slice(0, 4).map(lesson => (
                    <LessonCard 
                        key={lesson.lesson_id} 
                        lesson={lesson} 
                        category={CATEGORIES.find(c => c.category_id === lesson.category_id)}
                        onClick={() => handleLessonSelect(lesson)}
                    />
                ))}
            </div>
        </div>
      </div>

      {/* Right Panel: Progress & Leaderboard */}
      <div className="space-y-6">
        {/* Progress Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in slide-in-from-right-4 duration-500 delay-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Your Progress</h3>
            {progressData.length > 0 ? (
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={progressData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" hide />
                            <YAxis hide />
                            <Tooltip 
                                cursor={{fill: '#f3f4f6'}}
                                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                            />
                            <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="h-48 w-full flex items-center justify-center text-gray-400 text-sm bg-gray-50 rounded-lg">
                    No quiz data available yet.
                </div>
            )}
        </div>

        {/* Badges */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in slide-in-from-right-4 duration-500 delay-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex justify-between items-center">
                Badges 
                <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">{userBadges.length}</span>
            </h3>
            <div className="grid grid-cols-3 gap-2">
                {userBadges.length > 0 ? userBadges.map(badge => (
                    <div key={badge.badge_id} className="flex flex-col items-center text-center p-2 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-1">
                            <Trophy size={16} />
                        </div>
                        <span className="text-[10px] text-gray-600 font-medium leading-tight">{badge.name}</span>
                    </div>
                )) : <p className="col-span-3 text-sm text-gray-400 text-center py-4">No badges yet. Keep learning!</p>}
            </div>
        </div>

        {/* Mini Leaderboard */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in slide-in-from-right-4 duration-500 delay-300">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Top Learners</h3>
            <div className="space-y-4">
                {LEADERBOARD.slice(0, 5).map((entry, idx) => (
                    <div key={entry.user_id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className={`
                                w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                                ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : 
                                  idx === 1 ? 'bg-gray-200 text-gray-700' : 
                                  idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-500'}
                            `}>
                                {entry.rank}
                            </span>
                            <div>
                                <p className="text-sm font-bold text-gray-700">
                                    {allUsers.find(u => u.user_id === entry.user_id)?.name || entry.user_id}
                                </p>
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                    <MapPin size={10} /> {entry.city}
                                </p>
                            </div>
                        </div>
                        <span className="text-sm font-bold text-indigo-600">{entry.total_points}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Global Leaderboard</h2>
            <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900">
                <option>All Cities</option>
                <option>Istanbul</option>
                <option>Ankara</option>
                <option>Izmir</option>
            </select>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {LEADERBOARD.map((entry) => {
                         // Use allUsers state to get fresh data if possible
                         const user = allUsers.find(u => u.user_id === entry.user_id);
                         const isCurrentUser = entry.user_id === currentUser?.user_id;
                         return (
                            <tr key={entry.user_id} className={isCurrentUser ? "bg-indigo-50" : ""}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="font-bold text-gray-700">#{entry.rank}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${isCurrentUser ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                                        {user?.name.substring(0,2).toUpperCase() || 'U'}
                                    </div>
                                    <span className={`font-medium ${isCurrentUser ? 'text-indigo-700' : 'text-gray-900'}`}>
                                        {user?.name || entry.user_id} {isCurrentUser && '(You)'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{entry.city}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-bold text-indigo-600">{entry.total_points}</td>
                            </tr>
                         );
                    })}
                </tbody>
            </table>
        </div>
    </div>
  );

  const renderCourses = () => (
      <div className="space-y-6 animate-in fade-in">
          <h2 className="text-2xl font-bold text-gray-800">Explore Courses</h2>
          <div className="flex gap-2 overflow-x-auto pb-4">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium whitespace-nowrap">All</button>
              {CATEGORIES.map(cat => (
                  <button key={cat.category_id} className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors rounded-full text-sm font-medium whitespace-nowrap">
                      {cat.name}
                  </button>
              ))}
          </div>
          {filteredLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLessons.map(lesson => (
                    <LessonCard 
                        key={lesson.lesson_id} 
                        lesson={lesson} 
                        category={CATEGORIES.find(c => c.category_id === lesson.category_id)}
                        onClick={() => handleLessonSelect(lesson)}
                    />
                ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
                <p>No courses found matching "{searchTerm}"</p>
            </div>
          )}
      </div>
  );

  if (isLoadingSession) {
      return <div className="min-h-screen flex items-center justify-center text-indigo-600">Loading...</div>;
  }

  // If not logged in, show login screen
  if (!currentUser) {
      return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[#F8F9FD]">
      <Sidebar 
        isOpen={isSidebarOpen} 
        activeTab={activeTab === 'lesson-detail' ? 'courses' : activeTab} 
        setActiveTab={handleTabChange}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Header 
            user={currentUser} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
        />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-7xl mx-auto h-full">
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'leaderboard' && renderLeaderboard()}
                {activeTab === 'courses' && renderCourses()}
                {activeTab === 'lesson-detail' && renderLessonDetail()}
                {activeTab === 'badges' && (
                    <div className="text-center py-20 animate-in fade-in">
                        <Trophy size={64} className="mx-auto text-gray-300 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-400">Badge Collection</h2>
                        <p className="text-gray-400 mb-8">You have earned {userBadges.length} badges!</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                             {userBadges.map(b => (
                                 <div key={b.badge_id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                                     <div className="w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-4">
                                        <Trophy size={32} />
                                     </div>
                                     <h3 className="font-bold text-gray-800">{b.name}</h3>
                                     <p className="text-xs text-gray-500 mt-1">{new Date(b.awarded_at).toLocaleDateString()}</p>
                                 </div>
                             ))}
                        </div>
                    </div>
                )}
                 {activeTab === 'profile' && (
                    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-in fade-in">
                        <div className="text-center mb-8">
                             <img 
                                src={currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.name}`} 
                                alt={currentUser.name} 
                                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-50"
                            />
                            <h2 className="text-2xl font-bold text-gray-800">{currentUser.name}</h2>
                            <p className="text-indigo-600 font-medium">{currentUser.skill_level} Developer</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">University</p>
                                <p className="font-semibold text-gray-800">{currentUser.university}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">City</p>
                                <p className="font-semibold text-gray-800">{currentUser.city}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Total Points</p>
                                <p className="font-semibold text-gray-800">{currentUser.total_points}</p>
                            </div>
                             <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Badges</p>
                                <p className="font-semibold text-gray-800">{currentUser.badge_count}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
      </div>

      {/* Modals */}
      {activeQuiz && (
          <QuizModal 
            isOpen={true}
            lessonTitle={activeQuiz.lesson.title}
            quiz={activeQuiz.quiz}
            onClose={() => setActiveQuiz(null)}
            onComplete={handleQuizComplete}
          />
      )}
    </div>
  );
};

// Helper component for icon
const BookOpenIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);

export default App;