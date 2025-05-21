import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';

export default function Login({ navigation }: any) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const { login: loginContext } = useAuth();

  const handleLogin = async () => {
    setMensagemErro('');
    if (!login || !senha) {
      setMensagemErro('Preencha todos os campos.');
      return;
    }
    try {
      const usersString = await AsyncStorage.getItem('usuarios');
      const users = usersString ? JSON.parse(usersString) : [];
      const usuarioEncontrado = users.find(
        (u: any) => u.email === login && u.senha === senha
      );
      if (!usuarioEncontrado) {
        setMensagemErro('Usuário ou senha incorretos.');
        return;
      }
      await loginContext(usuarioEncontrado.email);
    } catch (error) {
      setMensagemErro('Erro ao fazer login.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Login"
        placeholderTextColor="#00FF00"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#00FF00"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      {mensagemErro !== '' && (
        <Text style={styles.mensagemErro}>{mensagemErro}</Text>
      )}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
        <Text style={styles.link}>Recuperar Senha</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastrar')}>
        <Text style={styles.link}>Cadastrar</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 180,
    height: 60,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    borderColor: '#00FF00',
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 20,
    color: '#FFF',
    marginBottom: 15,
    fontSize: 16,
  },
  mensagemErro: {
    color: '#ff4d4d',
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#00FF00',
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#00FF00',
    marginVertical: 5,
    textDecorationLine: 'underline',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    color: '#444',
    fontSize: 12,
  },
});
