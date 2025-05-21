import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Consulta: undefined;
  Home: undefined;
};

type TipoCadastroNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Consulta'
>;

export default function Consulta() {
  const navigation = useNavigation<TipoCadastroNavigationProp>();
  const [codigoConsulta, setCodigoConsulta] = useState('');
  const [dadosVeiculo, setDadosVeiculo] = useState<{
    placa: string;
    modelo: string;
    km: string;
    contrato: string;
    ocorrencia: string;
    localizacao: string;
  } | null>(null);

  const consultarVeiculo = async () => {
    if (!codigoConsulta) {
      Alert.alert('Atenção', 'Por favor, insira um código válido.');
      return;
    }

    try {
      const cadastro = await AsyncStorage.getItem('ultimoCadastro');
      const local = await AsyncStorage.getItem('ultimaLocalizacao');

      if (!cadastro || !local) {
        Alert.alert('Erro', 'Nenhum dado cadastrado foi encontrado.');
        return;
      }

      const dados = JSON.parse(cadastro);
      const localizacao = JSON.parse(local);
      const nome_localizacao = `${localizacao.armazem}-${localizacao.rua}-${localizacao.modulo}-${localizacao.compartimento}`;

      const encontrado =
        dados.placa === codigoConsulta ||
        dados.chassi === codigoConsulta ||
        dados.contrato === codigoConsulta;

      if (!encontrado) {
        Alert.alert('Não encontrado', 'Veículo não identificado.');
        return;
      }

      setDadosVeiculo({
        placa: dados.placa,
        modelo: dados.modelo,
        km: dados.km,
        contrato: dados.contrato,
        ocorrencia: dados.ocorrencia,
        localizacao: nome_localizacao,
      });
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha ao buscar dados.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>CONSULTA DE VEÍCULO</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira PLACA, CHASSI ou CONTRATO"
          placeholderTextColor="#00FF00"
          value={codigoConsulta}
          onChangeText={setCodigoConsulta}
        />
        <TouchableOpacity style={styles.button} onPress={consultarVeiculo}>
          <Text style={styles.buttonText}>CONSULTAR</Text>
        </TouchableOpacity>
        {dadosVeiculo && (
          <View style={styles.resultado}>
            <Text style={styles.resultadoTitulo}>Dados do Veículo:</Text>
            {Object.entries(dadosVeiculo).map(([key, value]) => (
              <Text key={key} style={styles.resultadoTexto}>
                {`${key.toUpperCase()}: ${value}`}
              </Text>
            ))}
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backButtonText}>VOLTAR</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 20,
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
    backgroundColor: '#00FF00',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 15,
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00FF00',
    alignItems: 'center',
    width: '100%',
  },
  backButtonText: {
    color: '#00FF00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultado: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#111',
    borderRadius: 10,
  },
  resultadoTitulo: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00FF00',
  },
  resultadoTexto: {
    marginBottom: 5,
    color: '#fff',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
    width: '100%',
  },
});
