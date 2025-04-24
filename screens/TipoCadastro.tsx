import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 

type TipoCadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TipoCadastro'>;

export default function TipoCadastroScreen({ navigation }: { navigation: TipoCadastroScreenNavigationProp }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Mottu Storage</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CadastroVeiculo')}>
        <Text style={styles.buttonText}>Cadastro Veículo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CadastroLocalizacao')}>
        <Text style={styles.buttonText}>Cadastro Localização</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#09978b',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
