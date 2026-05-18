import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'student' | 'lecturer';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  progress: Record<string, boolean>;
  toggleTopicProgress: (id: string) => void;
  badges: string[];
  lastVisitedPage: string | null;
  setLastVisitedPage: (page: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => (localStorage.getItem('userRole') as UserRole) || 'student');
  const [progress, setProgress] = useState<Record<string, boolean>>(() => JSON.parse(localStorage.getItem('userProgress') || '{}'));
  const [badges, setBadges] = useState<string[]>([]);
  const [lastVisitedPage, setLastVisitedPage] = useState<string | null>(localStorage.getItem('lastVisitedPage'));

  useEffect(() => {
    localStorage.setItem('userRole', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
    const completedCount = Object.values(progress).filter(Boolean).length;
    const newBadges: string[] = [];
    if (completedCount >= 1) newBadges.push('The Explorer');
    if (completedCount >= 4) newBadges.push('Statistician');
    if (completedCount >= 8) newBadges.push('Master Researcher');
    setBadges(newBadges);
  }, [progress]);

  useEffect(() => {
    if (lastVisitedPage) {
      localStorage.setItem('lastVisitedPage', lastVisitedPage);
    }
  }, [lastVisitedPage]);
  
  const toggleTopicProgress = (id: string) => {
    setProgress(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AppContext.Provider value={{ 
      role, setRole, 
      progress, toggleTopicProgress, 
      badges,
      lastVisitedPage, setLastVisitedPage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
