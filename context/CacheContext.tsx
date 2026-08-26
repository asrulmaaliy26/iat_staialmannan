import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NewsItem, ProjectItem, JournalItem, Facility } from '../types';

interface HomeCache {
  news: NewsItem[];
  projects: ProjectItem[];
  journals: JournalItem[];
  bestJournals: JournalItem[];
  facilities: Facility[];
  isLoaded: boolean;

  allNews: NewsItem[];
  newsCategories: string[];
  isNewsLoaded: boolean;

  allProjects: ProjectItem[];
  projectCategories: string[];
  isProjectsLoaded: boolean;

  allJournals: JournalItem[];
  journalCategories: string[];
  isJournalsLoaded: boolean;

  allFacilities: Facility[];
  isFacilitiesLoaded: boolean;
}

interface CacheContextType {
  homeCache: HomeCache;
  setHomeCache: (cache: Partial<HomeCache>) => void;
}

const defaultCache: HomeCache = {
  news: [],
  projects: [],
  journals: [],
  bestJournals: [],
  facilities: [],
  isLoaded: false,

  allNews: [],
  newsCategories: [],
  isNewsLoaded: false,

  allProjects: [],
  projectCategories: [],
  isProjectsLoaded: false,

  allJournals: [],
  journalCategories: [],
  isJournalsLoaded: false,

  allFacilities: [],
  isFacilitiesLoaded: false,
};

const CacheContext = createContext<CacheContextType>({
  homeCache: defaultCache,
  setHomeCache: () => { },
});

export const CacheProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [homeCache, setHomeCacheState] = useState<HomeCache>(defaultCache);

  const setHomeCache = (cache: Partial<HomeCache>) => {
    setHomeCacheState(prev => ({ ...prev, ...cache }));
  };

  return (
    <CacheContext.Provider value={{ homeCache, setHomeCache }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => useContext(CacheContext);
