import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ConsultaScreen() {
  const [codigoConsulta, setCodigoConsulta] = useState('');
  const [dadosVeiculo, setDadosVeiculo] = useState<{
    placa: string;
    modelo: string;
    km: string;
    contrato: string;
    ocorrencia: string;
    localizacao: string;
  } | null>(null);

  const consultarVeiculo = () => {
    if (codigoConsulta === '') {
      alert('Por favor, insira um código válido.');
      return;
    }
    // Simular consulta de dados
    setDadosVeiculo({
      placa: 'ABC1234',
      modelo: 'Honda CG 160',
      km: '12345',
      contrato: '987654',
      ocorrencia: 'Nenhuma',
      localizacao: 'A1-R3-M5-C2'
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Consulta de Veículo</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o código do QR Code ou código de barras"
        value={codigoConsulta}
        onChangeText={setCodigoConsulta}
      />
      <TouchableOpacity style={styles.button} onPress={consultarVeiculo}>
        <Text style={styles.buttonText}>Consultar</Text>
      </TouchableOpacity>

      {dadosVeiculo && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoTitulo}>Dados do Veículo:</Text>
          {Object.entries(dadosVeiculo).map(([key, value]) => (
            <Text key={key} style={styles.resultadoTexto}>{`${key.toUpperCase()}: ${value}`}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
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
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  resultadoTitulo: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultadoTexto: {
    marginBottom: 5,
  },
});
