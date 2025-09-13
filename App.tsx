import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';

// Importação das Telas
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import CadastroVeiculo from './src/screens/CadastroVeiculos';
import CadastroLocalizacao from './src/screens/CadastroLocalizacao';
import Recebimento from './src/screens/Recebimento';
import Consulta from './src/screens/Consulta';
import TipoCadastro from './src/screens/TipoCadastro';
import Cadastrar from './src/screens/Cadastrar';
import RecuperarSenha from './src/screens/RecuperarSenha';
import Historico from './src/screens/Historico';
import EdicaoLocalizacao from './src/screens/EdicaoLocalizacao';

// Importação dos Contextos
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext'; // 1. Importe o ThemeProvider

const Stack = createNativeStackNavigator();

// Componente que gere as rotas com base no estado de autenticação
function AppRoutes() {
  const { usuario } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!usuario ? (
        // Rotas de Autenticação (utilizador não logado)
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastrar" component={Cadastrar} />
          <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
        </>
      ) : (
        // Rotas Protegidas (utilizador logado)
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TipoCadastro" component={TipoCadastro} />
          <Stack.Screen name="CadastroVeiculo" component={CadastroVeiculo} />
          <Stack.Screen name="CadastroLocalizacao" component={CadastroLocalizacao} />
          <Stack.Screen name="Recebimento" component={Recebimento} />
          <Stack.Screen name="Consulta" component={Consulta} />
          <Stack.Screen name="Historico" component={Historico} />
          <Stack.Screen name="EdicaoLocalizacao" component={EdicaoLocalizacao} />
        </>
      )}
    </Stack.Navigator>
  );
}

// Componente principal da Aplicação
export default function App() {
  // O NavigationContainer também pode ser estilizado com base no tema,
  // mas o nosso ThemeProvider já faz um trabalho mais completo.
  // Manteremos a estrutura simples aqui.

  return (
    // O AuthProvider deve ser o mais externo para gerir o estado de login
    <AuthProvider>
      {/* 2. O ThemeProvider envolve toda a navegação para fornecer o tema */}
      <ThemeProvider>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}
