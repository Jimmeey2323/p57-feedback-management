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

const logo = 'https://d.imgvision.net/jimmeey/Logo.png';

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
    <div className="min-h-screen bg-transparent">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-gradient-primary transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ boxShadow: 'var(--shadow-2)' }}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Physique 57" className="h-12 w-12 rounded-xl object-contain" />
              <span className="font-bold text-ghost-white text-lg">Physique 57</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[#1C1C1C] hover:text-[#0F3A7D] transition-colors p-2 hover:bg-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto lux-scroll">
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
                      ? 'text-white bg-white/20 shadow-xl' 
                      : 'text-ghost-white hover:bg-white/10'
                    }
                  `}
                  style={active ? { boxShadow: 'var(--shadow-2)' } : undefined}
                >
                  <Icon className={`w-5 h-5 ${active ? '' : 'group-hover:scale-110 transition-transform'}`} />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="pt-6 border-t border-[#E8EAED]">
            <div className="flex items-center space-x-3 mb-4 px-2">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1A4D99 0%, #0F3A7D 70%, #2C5AA0 100%)', boxShadow: 'var(--shadow-2)' }}
              >
                <span className="text-white font-semibold text-lg">
                  {user?.full_name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0F3A7D] truncate">
                  {user?.full_name || 'User'}
                </p>
                <p className="text-xs text-[#616161] truncate">{user?.email}</p>
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
          className="sticky top-0 z-10 flex items-center h-16 px-6 card-lux lg:hidden"
          style={{ boxShadow: 'var(--shadow-2)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#1C1C1C] hover:text-[#0F3A7D] p-2 hover:bg-white rounded-lg transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="ml-4 flex items-center space-x-2">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1A4D99 0%, #0F3A7D 70%, #2C5AA0 100%)', boxShadow: 'var(--shadow-2)' }}
            >
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="font-bold text-[#0F3A7D]">Physique 57</span>
          </div>
        </div>

        {/* Page content */}
        <main className="min-h-screen container-pro py-10 lg:py-12">
          <header className="flex items-center justify-between p-4 bg-white shadow-md">
            <img src={logo} alt="Logo" className="h-12" />
          </header>
          {children}
        </main>
      </div>
    </div>
  );
};
