import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import CadastroVeiculo from './screens/CadastroVeiculos';
import CadastroLocalizacao from './screens/CadastroLocalizacao';
import Recebimento from './screens/Recebimento';
import Consulta from './screens/Consulta';
import TipoCadastro from './screens/TipoCadastro';
import Cadastrar from './screens/Cadastrar';
import RecuperarSenha from './screens/RecuperarSenha';
import Historico from './screens/Historico';
import { AuthProvider, useAuth } from './context/AuthContext';

const Stack = createNativeStackNavigator();

function ProtectedRoutes() {
  const { usuario } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!usuario ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastrar" component={Cadastrar} />
          <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TipoCadastro" component={TipoCadastro} />
          <Stack.Screen name="CadastroVeiculo" component={CadastroVeiculo} />
          <Stack.Screen name="CadastroLocalizacao" component={CadastroLocalizacao} />
          <Stack.Screen name="Recebimento" component={Recebimento} />
          <Stack.Screen name="Consulta" component={Consulta} />
          <Stack.Screen name="Historico" component={Historico} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <ProtectedRoutes />
      </NavigationContainer>
    </AuthProvider>
  );
}
