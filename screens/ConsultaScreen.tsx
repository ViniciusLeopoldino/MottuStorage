import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ConsultaScreen: undefined;
  Home: undefined; 
};

type TipoCadastroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ConsultaScreen'
>;

export default function ConsultaScreen() {
  const navigation = useNavigation<TipoCadastroScreenNavigationProp>();
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
    <View style={styles.wrapper}>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>VOLTAR</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
    padding: 20,
  },
  container: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#00FF00',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#00FF00',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
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
  footer: {
    color: '#555',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
  },
});
