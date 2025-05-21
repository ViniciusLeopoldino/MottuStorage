import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState<'erro' | 'sucesso' | ''>('');

  const handleRecovery = () => {
    if (!email) {
      setMensagem('Preencha o campo de email.');
      setTipoMensagem('erro');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMensagem('Email inválido.');
      setTipoMensagem('erro');
      return;
    }

    setMensagem('Siga os passos enviados para o seu email.');
    setTipoMensagem('sucesso');

    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#00FF00"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
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
      <TouchableOpacity style={styles.button} onPress={handleRecovery}>
        <Text style={styles.buttonText}>Recuperar</Text>
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
