import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function RecebimentoScreen() {
  const [codigoRecebido, setCodigoRecebido] = useState('');
  const [mensagem, setMensagem] = useState('');

  const confirmarRecebimento = () => {
    if (codigoRecebido) {
      setMensagem(`Recebimento confirmado para o código: ${codigoRecebido}`);
      setCodigoRecebido('');
    } else {
      setMensagem('Por favor, insira um código válido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recebimento de Veículos</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o código do QR Code ou código de barras"
        value={codigoRecebido}
        onChangeText={setCodigoRecebido}
      />
      <TouchableOpacity style={styles.button} onPress={confirmarRecebimento}>
        <Text style={styles.buttonText}>Confirmar Recebimento</Text>
      </TouchableOpacity>
      {mensagem ? <Text style={styles.message}>{mensagem}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#09978b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  message: {
    marginTop: 20,
    color: '#333',
    textAlign: 'center',
  },
});
