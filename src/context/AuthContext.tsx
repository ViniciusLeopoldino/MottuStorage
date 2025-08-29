import React, { createContext, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  usuario: string | null;
  login: (usuario: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  usuario: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<string | null>(null);

  useEffect(() => {
    const carregarLogin = async () => {
      const userSalvo = await AsyncStorage.getItem('usuarioLogado');
      if (userSalvo) {
        setUsuario(userSalvo);
      }
    };
    carregarLogin();
  }, []);

  const login = async (usuario: string) => {
    await AsyncStorage.setItem('usuarioLogado', usuario);
    setUsuario(usuario);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('usuarioLogado');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
