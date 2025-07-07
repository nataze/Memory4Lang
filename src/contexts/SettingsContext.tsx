import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Config {
  reverseDirection: boolean; // If true, game will translate from French to English
  isMuted: boolean; // If true, sounds will be muted
  name: string; // Player's name
  setConfig: (config: Partial<Config>) => void;
}

const defaultConfig: Config = {
  reverseDirection: false,
  isMuted: false,
  name: '',
  setConfig: () => {},
};

const SettingsContext = createContext<Config>(defaultConfig);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfigState] = useState(() => {
    const saved = sessionStorage.getItem('memory4lang-config');
    return saved ? JSON.parse(saved) : defaultConfig;
  });

  useEffect(() => {
    sessionStorage.setItem('memory4lang-config', JSON.stringify(config));
  }, [config]);

  const setConfig = (partial: Partial<Config>) => {
    setConfigState((prev: Config) => ({ ...prev, ...partial }));
  };

  const contextValue: Config = {
    reverseDirection: config.reverseDirection,
    isMuted: config.isMuted,
    name: config.name,
    setConfig,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
