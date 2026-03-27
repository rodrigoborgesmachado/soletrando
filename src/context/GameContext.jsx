/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [practiceSession, setPracticeSession] = useState({
    enabled: false,
    words: [],
  });

  const resetSession = () => {
    setLastResult(null);
  };

  const startPracticeSession = (words) => {
    const safeWords = Array.isArray(words) ? words.filter((item) => item?.palavra).slice(0, 20) : [];
    setLastResult(null);
    setPracticeSession({
      enabled: safeWords.length > 0,
      words: safeWords,
    });
  };

  const clearPracticeSession = () => {
    setPracticeSession({
      enabled: false,
      words: [],
    });
  };

  const contextValue = useMemo(
    () => ({
      selectedLevel,
      setSelectedLevel,
      selectedQuestionCount,
      setSelectedQuestionCount,
      lastResult,
      setLastResult,
      practiceSession,
      startPracticeSession,
      clearPracticeSession,
      resetSession,
    }),
    [selectedLevel, selectedQuestionCount, lastResult, practiceSession],
  );

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used inside GameProvider');
  }
  return context;
}
