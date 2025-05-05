import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOME</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TipoCadastro')}>
        <Text style={styles.buttonText}>CADASTRO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recebimento')}>
        <Text style={styles.buttonText}>RECEBIMENTO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Consulta')}>
        <Text style={styles.buttonText}>CONSULTA</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',      // fundo preto
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#00FF00',             // texto verde
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    width: '100%',
    backgroundColor: '#00FF00',   // botão verde
    borderRadius: 50,             // pill
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    color: '#444',
    fontSize: 12,
  },
});
