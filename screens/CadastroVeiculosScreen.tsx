import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function CadastroVeiculo() {
  const [veiculo, setVeiculo] = useState<Record<'placa' | 'chassi' | 'modelo' | 'km' | 'contrato' | 'ocorrencia', string>>({
    placa: '',
    chassi: '',
    modelo: '',
    km: '',
    contrato: '',
    ocorrencia: '',
  });

  const gerarQRCode = () => {
    // Simular geração de QR Code
    alert('QR Code gerado para o veículo');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Cadastro de Veículo</Text>
      {(Object.keys(veiculo) as Array<keyof typeof veiculo>).map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.toUpperCase()}
          value={veiculo[key]}
          onChangeText={(text) => setVeiculo({ ...veiculo, [key]: text })}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={gerarQRCode}>
        <Text style={styles.buttonText}>Salvar e Gerar QR Code</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#09978b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
