import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Sparkles, LogOut, Sun, Moon, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAiSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    try {
      const response = await apiClient.get(`/products/ai-search?query=${searchQuery}`);
      alert('AI identified search intent: ' + JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
          EazyDeals AI
        </Link>
        
        <form onSubmit={handleAiSearch} className="flex-1 max-w-lg mx-8 relative group hidden md:block">
          <input 
            type="text" 
            placeholder="Search naturally (e.g. 'gaming laptop under 70000')"
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Sparkles className="absolute left-3 top-2.5 text-purple-500 w-5 h-5 group-focus-within:animate-pulse" />
          <button type="submit" className="hidden">Search</button>
        </form>

        <div className="flex items-center gap-4 sm:gap-6">
          <button onClick={() => setDarkMode(!darkMode)} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <Link to="/gift-finder" className="hidden sm:flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Gift Finder</span>
          </Link>
          
          <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link to="/admin/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors" title="Admin Dashboard">
                  <LayoutDashboard className="w-6 h-6" />
                </Link>
              )}
              <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors flex items-center gap-2">
                <User className="w-6 h-6" />
                <span className="hidden sm:block font-medium truncate max-w-[100px]">{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors" title="Logout">
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
