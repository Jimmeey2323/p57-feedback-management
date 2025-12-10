import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  LayoutDashboard, 
  Ticket, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../ui/Button';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tickets', href: '/tickets', icon: Ticket },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-dark-900/40 backdrop-blur-sm z-20 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-72 card-elevated transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ boxShadow: '0 30px 80px -30px rgba(32, 40, 62, 0.25)' }}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #1f2937 0%, #0f172a 60%, #5961f9 100%)', boxShadow: '0 18px 56px -22px rgba(17, 24, 39, 0.28)' }}>
                <span className="text-white font-bold text-2xl">P</span>
              </div>
              <span className="font-bold text-dark-900 text-lg">Physique 57</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-dark-600 hover:text-dark-900 transition-colors p-2 hover:bg-white/60 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                    transition-all duration-300 group
                    ${active 
                      ? 'text-white bg-[linear-gradient(135deg,#1f2937_0%,#0f172a_50%,#5961f9_100%)]' 
                      : 'text-dark-700 hover:bg-white/70'
                    }
                  `}
                  style={active ? { boxShadow: '0 18px 56px -22px rgba(17, 24, 39, 0.28)' } : undefined}
                >
                  <Icon className={`w-5 h-5 ${active ? '' : 'group-hover:scale-110 transition-transform'}`} />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="pt-6 border-t border-white/20">
            <div className="flex items-center space-x-3 mb-4 px-2">
              <div 
                className="w-12 h-12 bg-gradient-to-br from-dark-700 to-dark-900 rounded-xl flex items-center justify-center"
                style={{ boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.1)' }}
              >
                <span className="text-white font-semibold text-lg">
                  {user?.full_name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-dark-900 truncate">
                  {user?.full_name || 'User'}
                </p>
                <p className="text-xs text-dark-600 truncate">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="glass"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <div 
          className="sticky top-0 z-10 flex items-center h-16 px-6 card-elevated lg:hidden"
          style={{ boxShadow: '0 30px 80px -30px rgba(32, 40, 62, 0.25)' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-dark-700 hover:text-dark-900 p-2 hover:bg-white/60 rounded-lg transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="ml-4 flex items-center space-x-2">
            <div 
              className="w-10 h-10 bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl flex items-center justify-center"
              style={{ boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.1)' }}
            >
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="font-bold text-dark-900">Physique 57</span>
          </div>
        </div>

        {/* Page content */}
        <main className="min-h-screen container-pro py-8">{children}</main>
      </div>
    </div>
  );
};
