import { useContext } from 'react';
import { LevelConfigContext } from '../App';
import { LevelConfigData } from '../types';

export const useLevelConfig = (): LevelConfigData => {
  const levelConfig = useContext(LevelConfigContext);
  if (!levelConfig) {
    return {
      KAMPUS: {
        name: "STAI AL Mannan",
        type: "Sekolah Tinggi Agama Islam",
        color: "islamic-green",
        bg: "bg-islamic-green-800",
        text: "text-islamic-green-800"
      }
    };
  }
  return levelConfig;
};
