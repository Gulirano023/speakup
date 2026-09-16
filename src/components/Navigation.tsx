import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, BarChart3, User, Mic } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/topics', icon: BookOpen, label: 'Topics' },
  { path: '/practice', icon: Mic, label: 'Practice' },
  { path: '/progress', icon: BarChart3, label: 'Progress' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300',
                isActive ? 'text-primary' : 'text-text-muted hover:text-text-secondary'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive && 'text-primary')} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Sidebar() {
  const location = useLocation();

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

      <div className="p-4">
        <div className="card bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <p className="text-sm text-text-secondary">Upgrade to Pro</p>
          <p className="text-xs text-text-muted mt-1">Get unlimited practice sessions</p>
          <button className="mt-3 w-full btn-primary text-sm py-2">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
