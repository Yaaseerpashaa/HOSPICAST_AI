import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Layers, 
  UserRound, 
  Calendar, 
  Upload,
  Menu,
  X
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Forecasts', path: '/forecasts', icon: TrendingUp },
    { name: 'Patients', path: '/patients', icon: Users },
    { name: 'Staff', path: '/staff', icon: UserRound },
    { name: 'Ward Management', path: '/resources', icon: Layers },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Upload Data', path: '/upload', icon: Upload }
  ];

  const isActive = (path: string) => location.pathname === path || 
    (path === '/' && location.pathname === '/dashboard');

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-3 left-3 z-50 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden`}>
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 dark:bg-blue-500 w-8 h-8 rounded-md flex items-center justify-center text-white font-bold">HC</div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">HospiCast</span>
          </Link>
        </div>
        
        <nav className="flex-grow pt-4 pb-2 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-3">
            <div className="w-9 h-9 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mr-2">
              <span className="text-gray-800 dark:text-white font-semibold">H</span>
            </div>
            <div className="overflow-hidden">
              <div className="font-medium text-gray-900 dark:text-white truncate">Hospital Admin</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Pro Plan</div>
            </div>
          </div>
          <div className="flex justify-between">
            <ThemeToggle />
            <button
              onClick={handleSignOut}
              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main header - Content will be rendered by the Outlet in App.tsx */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 h-12 fixed top-0 right-0 left-0 md:left-64 z-20">
        <div className="px-3 h-full flex items-center justify-end">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="relative">
                  <Users className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2.5 h-2.5 text-[8px] flex items-center justify-center text-white">3</span>
                </span>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium">
              Export Report
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;