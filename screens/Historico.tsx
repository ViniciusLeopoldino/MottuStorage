import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

interface Recebimento {
  veiculo: string;
  localizacao: string;
  data: string;
}

export default function Historico() {
  const [historico, setHistorico] = useState<Recebimento[]>([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const carregarHistorico = async () => {
        const json = await AsyncStorage.getItem('historicoRecebimentos');
        if (json) setHistorico(JSON.parse(json));
        else setHistorico([]);
      };
      carregarHistorico();
    }, [])
  );

  const limparHistorico = async () => {
    const isWeb = Platform.OS === 'web';
    const apagar = async () => {
      await AsyncStorage.removeItem('historicoRecebimentos');
      setHistorico([]);
      Alert.alert('Sucesso', 'Histórico apagado com sucesso!');
    };
    if (isWeb) {
      const confirmar = window.confirm('Deseja apagar todo o histórico?');
      if (confirmar) await apagar();
    } else {
      Alert.alert('Confirmação', 'Deseja apagar todo o histórico?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: () => apagar(),
        },
      ]);
    }
  };

  const removerItem = (index: number) => {
    const isWeb = Platform.OS === 'web';
    const executarRemocao = async () => {
      const novoHistorico = [...historico];
      novoHistorico.splice(index, 1);
      setHistorico(novoHistorico);
      await AsyncStorage.setItem('historicoRecebimentos', JSON.stringify(novoHistorico));
      Alert.alert('Item removido');
    };
    if (isWeb) {
      const confirmar = window.confirm('Deseja remover este item?');
      if (confirmar) executarRemocao();
    } else {
      Alert.alert('Excluir', 'Deseja remover este item?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => executarRemocao(),
        },
      ]);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>HISTÓRICO DE RECEBIMENTOS</Text>
        {historico.length === 0 ? (
          <Text style={styles.empty}>Nenhum recebimento armazenado ainda.</Text>
        ) : (
          historico.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.text}>Veículo: {item.veiculo}</Text>
              <Text style={styles.text}>Local: {item.localizacao}</Text>
              <Text style={styles.text}>
                Data: {new Date(item.data).toLocaleString()}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removerItem(index)}
              >
                <Text style={styles.deleteText}>EXCLUIR</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>VOLTAR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#880000' }]}
        onPress={limparHistorico}
      >
        <Text style={styles.buttonText}>LIMPAR HISTÓRICO</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'space-between',
  },
  container: {
    paddingBottom: 40,
  },
  title: {
    color: '#00FF00',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  empty: {
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  item: {
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  text: {
    color: '#fff',
    marginBottom: 4,
  },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 6,
    backgroundColor: '#330000',
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteText: {
    color: '#ff4444',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00FF00',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
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
    width: '100%',
  },
  backButtonText: {
    color: '#00FF00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    color: '#555',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 20,
  },
});
