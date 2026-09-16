import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Mic, PenLine, PenTool, BarChart3, User, LogOut, Target } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/topics', icon: BookOpen, label: 'Topics' },
  { path: '/practice', icon: Mic, label: 'Speaking' },
  { path: '/writing', icon: PenLine, label: 'Writing' },
  { path: '/grammar', icon: PenTool, label: 'Grammar' },
  { path: '/progress', icon: BarChart3, label: 'Progress' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const bottomNavItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/topics', icon: BookOpen, label: 'Topics' },
  { path: '/practice', icon: Mic, label: 'Speak' },
  { path: '/writing', icon: PenLine, label: 'Write' },
  { path: '/grammar', icon: PenTool, label: 'Grammar' },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300 min-w-[56px]',
                isActive ? 'text-primary' : 'text-text-muted hover:text-text-secondary'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive && 'text-primary')} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-surface border-r border-border fixed left-0 top-0">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">SpeakUp</span>
        </Link>
      </div>

      {/* User Info */}
      {user && (
        <div className="px-4 mb-4">
          <div className="card p-3 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="text-lg font-bold">{user.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                {user.level ? (
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3 text-primary" />
                    <span className="text-xs text-primary font-medium">Level {user.level}</span>
                  </div>
                ) : (
                  <span className="text-xs text-warning">No level yet</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 space-y-2">
        <Link
          to="/interview"
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
            location.pathname === '/interview'
              ? 'bg-accent/10 text-accent border border-accent/20'
              : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
          )}
        >
          <Target className="w-5 h-5" />
          <span className="font-medium">AI Interview</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-error/10 hover:text-error transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
