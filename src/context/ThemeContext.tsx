import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../styles/theme';

// O tipo do nosso contexto, que pode ser o tema claro ou escuro
type Theme = typeof lightTheme | typeof darkTheme;

const ThemeContext = createContext<Theme>(darkTheme);

// O Provedor do nosso tema
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Hook do React Native que deteta se o sistema está em modo 'light' ou 'dark'
  const colorScheme = useColorScheme();
  
  // Escolhe o nosso objeto de tema com base na preferência do sistema
  const theme = colorScheme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar facilmente o nosso tema em qualquer componente
export const useTheme = () => useContext(ThemeContext);
