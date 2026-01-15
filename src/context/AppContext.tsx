import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: Date;
}

interface AppContextType {
  favorites: string[];
  addFavorite: (siteId: string) => void;
  removeFavorite: (siteId: string) => void;
  isFavorite: (siteId: string) => boolean;
  achievements: Achievement[];
  unlockAchievement: (achievementId: string) => void;
  visitedSites: string[];
  markSiteAsVisited: (siteId: string) => void;
  quizScore: number;
  updateQuizScore: (score: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialAchievements: Achievement[] = [
  {
    id: 'first_visit',
    title: 'First Explorer',
    description: 'Visit your first heritage site',
    icon: '🎯',
    unlocked: false,
  },
  {
    id: 'five_visits',
    title: 'Heritage Enthusiast',
    description: 'Visit 5 different heritage sites',
    icon: '⭐',
    unlocked: false,
  },
  {
    id: 'all_visits',
    title: 'Heritage Master',
    description: 'Visit all heritage sites',
    icon: '👑',
    unlocked: false,
  },
  {
    id: 'first_favorite',
    title: 'Bookmark Collector',
    description: 'Add your first favorite',
    icon: '❤️',
    unlocked: false,
  },
  {
    id: 'quiz_master',
    title: 'Quiz Master',
    description: 'Score 80% or higher on a quiz',
    icon: '🧠',
    unlocked: false,
  },
  {
    id: 'ar_explorer',
    title: 'AR Explorer',
    description: 'Try the AR experience',
    icon: '📱',
    unlocked: false,
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [visitedSites, setVisitedSites] = useState<string[]>([]);
  const [quizScore, setQuizScore] = useState<number>(0);

  const addFavorite = (siteId: string) => {
    if (!favorites.includes(siteId)) {
      setFavorites([...favorites, siteId]);
      if (favorites.length === 0) {
        unlockAchievement('first_favorite');
      }
    }
  };

  const removeFavorite = (siteId: string) => {
    setFavorites(favorites.filter((id) => id !== siteId));
  };

  const isFavorite = (siteId: string) => {
    return favorites.includes(siteId);
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.id === achievementId && !achievement.unlocked
          ? { ...achievement, unlocked: true, unlockedDate: new Date() }
          : achievement
      )
    );
  };

  const markSiteAsVisited = (siteId: string) => {
    if (!visitedSites.includes(siteId)) {
      const newVisitedSites = [...visitedSites, siteId];
      setVisitedSites(newVisitedSites);

      if (newVisitedSites.length === 1) {
        unlockAchievement('first_visit');
      } else if (newVisitedSites.length === 5) {
        unlockAchievement('five_visits');
      } else if (newVisitedSites.length >= 5) {
        unlockAchievement('all_visits');
      }
    }
  };

  const updateQuizScore = (score: number) => {
    setQuizScore(score);
    if (score >= 80) {
      unlockAchievement('quiz_master');
    }
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        achievements,
        unlockAchievement,
        visitedSites,
        markSiteAsVisited,
        quizScore,
        updateQuizScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
