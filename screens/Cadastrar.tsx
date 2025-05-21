import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState<'erro' | 'sucesso' | ''>('');

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setMensagem('Preencha todos os campos.');
      setTipoMensagem('erro');
      return;
    }

    if (password !== confirmPassword) {
      setMensagem('As senhas não coincidem.');
      setTipoMensagem('erro');
      return;
    }

    if (password.length < 6) {
      setMensagem('A senha deve ter pelo menos 6 caracteres.');
      setTipoMensagem('erro');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMensagem('Email inválido.');
      setTipoMensagem('erro');
      return;
    }

    try {
      const usersString = await AsyncStorage.getItem('usuarios');
      const users = usersString ? JSON.parse(usersString) : [];
      const jaExiste = users.some((u: any) => u.email === email);
      if (jaExiste) {
        setMensagem('Este email já está cadastrado.');
        setTipoMensagem('erro');
        return;
      }
      const novoUsuario = { username, email, senha: password };
      const novosUsuarios = [...users, novoUsuario];
      await AsyncStorage.setItem('usuarios', JSON.stringify(novosUsuarios));
      setMensagem('Usuário cadastrado com sucesso!');
      setTipoMensagem('sucesso');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (err) {
      setMensagem('Erro ao salvar usuário.');
      setTipoMensagem('erro');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        placeholderTextColor="#00FF00"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#00FF00"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#00FF00"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#00FF00"
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      {mensagem !== '' && (
        <Text
          style={[
            styles.mensagem,
            tipoMensagem === 'erro' ? styles.erro : styles.sucesso,
          ]}
        >
          {mensagem}
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00FF00',
    borderRadius: 25,
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00FF00',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#00FF00',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  mensagem: {
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 14,
  },
  erro: {
    color: '#ff4d4d',
  },
  sucesso: {
    color: '#00FF00',
  },
});
