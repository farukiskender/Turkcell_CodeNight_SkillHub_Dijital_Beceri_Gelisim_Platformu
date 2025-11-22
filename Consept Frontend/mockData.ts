import { User, Category, Lesson, Quiz, QuizResult, Badge, LeaderboardEntry } from './types';

// Auth credentials extracted from provided UsersLogin CSV data
// Using a simple interface for mock auth
interface AuthUser {
    user_id: string;
    email: string;
    password: string; // In a real app, this would be hashed
}

export const AUTH_USERS: AuthUser[] = [
    { user_id: 'U1', email: 'ayşe@example.com', password: 'R8XUKhcV' },
    { user_id: 'U2', email: 'ali@example.com', password: '85vpGLCq' },
    { user_id: 'U3', email: 'deniz@example.com', password: 'lqETUO3T' },
    { user_id: 'U4', email: 'fatma@example.com', password: 'f0t6QLQ9' },
    { user_id: 'U10', email: 'ceren@example.com', password: 'EQyOyxKS' },
    { user_id: 'U13', email: 'kemal@example.com', password: 'qRyJ6zea' },
    { user_id: 'U17', email: 'ozan@example.com', password: 'PeOS1BCM' },
    { user_id: 'U20', email: 'buse@example.com', password: 'VvExHD9F' },
    { user_id: 'U29', email: 'yusuf@example.com', password: 'm6OlV5Ln' },
    { user_id: 'U32', email: 'nazlı@example.com', password: 'XWm9jA8p' },
];

// Extracted from users.csv (subset)
export const USERS: User[] = [
  { user_id: 'U1', name: 'Ayşe', city: 'Gaziantep', university: 'Bogazici', skill_level: 'Beginner', total_points: 950, badge_count: 0, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse' },
  { user_id: 'U2', name: 'Ali', city: 'Izmir', university: 'Dokuz Eylul', skill_level: 'Advanced', total_points: 175, badge_count: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ali' },
  { user_id: 'U3', name: 'Deniz', city: 'Trabzon', university: 'ITU', skill_level: 'Intermediate', total_points: 580, badge_count: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deniz' },
  { user_id: 'U4', name: 'Fatma', city: 'Eskisehir', university: 'ITU', skill_level: 'Intermediate', total_points: 985, badge_count: 0, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatma' },
  { user_id: 'U10', name: 'Ceren', city: 'Istanbul', university: 'Hacettepe', skill_level: 'Beginner', total_points: 1000, badge_count: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ceren' },
  { user_id: 'U13', name: 'Kemal', city: 'Konya', university: 'Hacettepe', skill_level: 'Beginner', total_points: 1070, badge_count: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kemal' },
  { user_id: 'U17', name: 'Ozan', city: 'Trabzon', university: 'Dokuz Eylul', skill_level: 'Beginner', total_points: 1085, badge_count: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ozan' },
  { user_id: 'U20', name: 'Buse', city: 'Bursa', university: 'METU', skill_level: 'Advanced', total_points: 1090, badge_count: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Buse' },
  { user_id: 'U29', name: 'Yusuf', city: 'Bursa', university: 'ITU', skill_level: 'Beginner', total_points: 1125, badge_count: 0, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yusuf' },
  { user_id: 'U32', name: 'Nazlı', city: 'Ankara', university: 'METU', skill_level: 'Advanced', total_points: 1190, badge_count: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nazli' },
];

// Extracted from categories.csv
export const CATEGORIES: Category[] = [
  { category_id: 'C1', name: 'Software Development', description: 'Programming languages and tools.', color: 'bg-blue-500' },
  { category_id: 'C2', name: 'Artificial Intelligence', description: 'Machine learning and data science.', color: 'bg-purple-500' },
  { category_id: 'C3', name: 'Cybersecurity', description: 'Network and system security.', color: 'bg-red-500' },
  { category_id: 'C4', name: 'Entrepreneurship', description: 'Business models and innovation.', color: 'bg-green-500' },
];

// Extracted from lessons.csv (subset)
export const LESSONS: Lesson[] = [
  { lesson_id: 'L1', category_id: 'C1', title: 'Introduction to Python', duration_min: 45, difficulty: 'Beginner' },
  { lesson_id: 'L2', category_id: 'C1', title: 'Advanced Python', duration_min: 60, difficulty: 'Advanced' },
  { lesson_id: 'L3', category_id: 'C1', title: 'Java for Beginners', duration_min: 60, difficulty: 'Intermediate' },
  { lesson_id: 'L5', category_id: 'C1', title: 'Web Development with React', duration_min: 90, difficulty: 'Beginner' },
  { lesson_id: 'L16', category_id: 'C2', title: 'Machine Learning Basics', duration_min: 60, difficulty: 'Intermediate' },
  { lesson_id: 'L17', category_id: 'C2', title: 'Deep Learning Fundamentals', duration_min: 60, difficulty: 'Intermediate' },
  { lesson_id: 'L25', category_id: 'C2', title: 'Generative AI', duration_min: 45, difficulty: 'Beginner' },
  { lesson_id: 'L27', category_id: 'C3', title: 'Fundamentals of Cybersecurity', duration_min: 90, difficulty: 'Beginner' },
];

// Extracted from quizzes.csv (subset matching lessons)
export const QUIZZES: Quiz[] = [
  { question_id: 'Q1', lesson_id: 'L1', question_text: 'What is the correct file extension for Python files?', correct_answer: '.py', options: ['.pyth', '.pt', '.py', '.p'] },
  { question_id: 'Q2', lesson_id: 'L2', question_text: 'Which concept is NOT part of standard Python OOP?', correct_answer: 'Structs', options: ['Classes', 'Inheritance', 'Structs', 'Polymorphism'] },
  { question_id: 'Q3', lesson_id: 'L3', question_text: 'Which keyword is used to inherit a class in Java?', correct_answer: 'extends', options: ['implements', 'inherits', 'extends', 'uses'] },
  { question_id: 'Q5', lesson_id: 'L5', question_text: 'Which hook is used to manage state in functional components?', correct_answer: 'useState', options: ['useEffect', 'useState', 'useContext', 'useReducer'] },
  { question_id: 'Q16', lesson_id: 'L16', question_text: 'Which type of learning involves labeled data?', correct_answer: 'Supervised Learning', options: ['Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning', 'Deep Learning'] },
  { question_id: 'Q17', lesson_id: 'L17', question_text: 'What does a neuron in a neural network compute?', correct_answer: 'Weighted sum + activation', options: ['Just sum', 'Weighted sum + activation', 'Activation only', 'Difference'] },
  { question_id: 'Q25', lesson_id: 'L25', question_text: 'Which model type is known for generating new content?', correct_answer: 'Generative Models', options: ['Discriminative Models', 'Regression Models', 'Generative Models', 'Clustering'] },
  { question_id: 'Q27', lesson_id: 'L27', question_text: 'What does CIA stand for in security?', correct_answer: 'Confidentiality, Integrity, Availability', options: ['Central Intelligence Agency', 'Confidentiality, Integrity, Availability', 'Control, Integrity, Access', 'Code, Input, Access'] },
];

// Extracted from quiz_results.csv (subset for U1)
export const QUIZ_RESULTS: QuizResult[] = [
  { result_id: 'R1', user_id: 'U1', lesson_id: 'L3', score: 95, completed_at: '2025-11-09T10:00:00Z' },
  { result_id: 'R2', user_id: 'U1', lesson_id: 'L18', score: 85, completed_at: '2025-11-09T10:00:00Z' }, 
  { result_id: 'R3', user_id: 'U1', lesson_id: 'L14', score: 85, completed_at: '2025-11-09T10:00:00Z' },
  { result_id: 'R7', user_id: 'U1', lesson_id: 'L6', score: 90, completed_at: '2025-11-09T10:00:00Z' },
  { result_id: 'R8', user_id: 'U1', lesson_id: 'L7', score: 50, completed_at: '2025-11-09T10:00:00Z' },
  // Added results for U32
  { result_id: 'R295', user_id: 'U32', lesson_id: 'L22', score: 95, completed_at: '2025-11-09T10:00:00Z' },
  { result_id: 'R296', user_id: 'U32', lesson_id: 'L27', score: 75, completed_at: '2025-11-09T10:00:00Z' },
  { result_id: 'R305', user_id: 'U32', lesson_id: 'L13', score: 100, completed_at: '2025-11-09T10:00:00Z' },
  { result_id: 'R306', user_id: 'U32', lesson_id: 'L5', score: 85, completed_at: '2025-11-09T10:00:00Z' },
  { result_id: 'R309', user_id: 'U32', lesson_id: 'L23', score: 100, completed_at: '2025-11-09T10:00:00Z' },
];

// Extracted from badges.csv (subset)
export const BADGES: Badge[] = [
  { badge_id: 'B1', user_id: 'U2', name: 'Motivasyon Rozeti', awarded_at: '2025-11-10T12:00:00Z', icon: 'Star' },
  { badge_id: 'B2', user_id: 'U3', name: 'Uzman Rozeti', awarded_at: '2025-11-10T12:00:00Z', icon: 'Award' },
  { badge_id: 'B99', user_id: 'U1', name: 'Motivasyon Rozeti', awarded_at: '2025-11-11T10:00:00Z', icon: 'Zap' },
  // Badges for U32
  { badge_id: 'B66', user_id: 'U32', name: 'Uzman Rozeti', awarded_at: '2025-11-10T12:00:00Z', icon: 'Award' },
];

// Extracted from leaderboard.csv (subset)
export const LEADERBOARD: LeaderboardEntry[] = [
  { user_id: 'U32', rank: 1, total_points: 1190, city: 'Ankara' },
  { user_id: 'U29', rank: 2, total_points: 1125, city: 'Bursa' },
  { user_id: 'U20', rank: 3, total_points: 1090, city: 'Bursa' },
  { user_id: 'U17', rank: 4, total_points: 1085, city: 'Trabzon' },
  { user_id: 'U13', rank: 5, total_points: 1070, city: 'Konya' },
  { user_id: 'U1', rank: 13, total_points: 950, city: 'Gaziantep' },
];