import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function CadastroLocalizacao() {
  const navigation = useNavigation();
  const [localizacao, setLocalizacao] = useState({
    armazem: '',
    rua: '',
    modulo: '',
    compartimento: '',
  });
  const [mensagem, setMensagem] = useState('');

  const limparCampos = () => {
    setLocalizacao({
      armazem: '',
      rua: '',
      modulo: '',
      compartimento: '',
    });
  };

  const reutilizarLocalizacao = async () => {
    try {
      const salvo = await AsyncStorage.getItem('ultimaLocalizacao');
      if (salvo) {
        setLocalizacao(JSON.parse(salvo));
        Alert.alert('Sucesso', 'Última localização carregada!');
      } else {
        Alert.alert('Aviso', 'Nenhuma localização anterior encontrada.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar a localização.');
      console.error(error);
    }
  };

  const salvarLocalizacao = async () => {
    const nome_localizacao = `${localizacao.armazem}-${localizacao.rua}-${localizacao.modulo}-${localizacao.compartimento}`;
    try {
      await AsyncStorage.setItem('ultimaLocalizacao', JSON.stringify(localizacao));
      setMensagem(`Localização salva: ${nome_localizacao}`);
    } catch (err) {
      console.error('Erro ao salvar:', err);
      setMensagem('Erro ao salvar a localização.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Cadastro de Localização</Text>
        {(Object.keys(localizacao) as Array<keyof typeof localizacao>).map((key) => (
          <TextInput
            key={key}
            style={styles.input}
            placeholder={key.toUpperCase()}
            placeholderTextColor="#aaa"
            value={localizacao[key]}
            onChangeText={(text) =>
              setLocalizacao((prev) => ({ ...prev, [key]: text }))
            }
          />
        ))}
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={reutilizarLocalizacao}>
            <Text style={styles.linkText}>Reutilizar última localização</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={limparCampos}>
            <Text style={styles.linkText}>Limpar Campos</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={salvarLocalizacao}>
          <Text style={styles.buttonText}>SALVAR</Text>
        </TouchableOpacity>
        {mensagem !== '' && <Text style={styles.successMessage}>{mensagem}</Text>}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>VOLTAR</Text>
        </TouchableOpacity>
      </ScrollView>
      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  linkText: {
    color: '#00FF00',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: '500',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 30,
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
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00FF00',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#00FF00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    marginTop: 15,
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00FF00',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#00FF00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
    paddingVertical: 10,
  },
  reuseButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#111',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00FF00',
    alignItems: 'center',
  },
  reuseText: {
    color: '#00FF00',
    fontWeight: 'bold',
  },
  successMessage: {
    color: '#00FF00',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: 'bold',
  },
});
