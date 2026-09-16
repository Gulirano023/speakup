import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SkillProgress } from '../data/types';

export type UserLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface User {
  id: string;
  name: string;
  email: string;
  level: UserLevel | null;
  hasTakenTest: boolean;
  skills: SkillProgress;
  xp: number;
  streak: number;
  totalMinutes: number;
  totalSessions: number;
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  setLevel: (level: UserLevel) => void;
  updateSkills: (skills: Partial<SkillProgress>) => void;
  addXP: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'speakup_user';

function getStoredUser(): User | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveUser(user: User) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser);

  useEffect(() => {
    if (user) saveUser(user);
  }, [user]);

  const login = (email: string, _password: string): boolean => {
    const stored = getStoredUser();
    if (stored && stored.email === email) {
      setUser(stored);
      return true;
    }
    const newUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      level: null,
      hasTakenTest: false,
      skills: { grammar: 0, vocabulary: 0, fluency: 0, pronunciation: 0 },
      xp: 0,
      streak: 0,
      totalMinutes: 0,
      totalSessions: 0,
      joinedAt: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  };

  const register = (name: string, email: string, _password: string): boolean => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      level: null,
      hasTakenTest: false,
      skills: { grammar: 0, vocabulary: 0, fluency: 0, pronunciation: 0 },
      xp: 0,
      streak: 0,
      totalMinutes: 0,
      totalSessions: 0,
      joinedAt: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const setLevel = (level: UserLevel) => {
    if (user) {
      setUser({ ...user, level, hasTakenTest: true });
    }
  };

  const updateSkills = (skills: Partial<SkillProgress>) => {
    if (user) {
      setUser({ ...user, skills: { ...user.skills, ...skills } });
    }
  };

  const addXP = (amount: number) => {
    if (user) {
      setUser({ ...user, xp: user.xp + amount });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, setLevel, updateSkills, addXP }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
