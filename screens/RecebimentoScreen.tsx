import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

export default function RecebimentoScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanningType, setScanningType] = useState<'none' | 'qr' | 'loc'>('none');
  const [codigoVeiculo, setCodigoVeiculo] = useState<string>('');
  const [codigoLocal, setCodigoLocal] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');

  // Só pedimos permissão em dispositivos nativos
  useEffect(() => {
    if (Platform.OS !== 'web') {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }
  }, []);

  // Lida com captura no scanner
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanningType === 'qr') {
      setCodigoVeiculo(data);
      setMensagem('Veículo identificado!');
    } else {
      setCodigoLocal(data);
      setMensagem('Localização identificada!');
    }
    setScanningType('none');
  };

  // Fallback web: prompt para digitar código
  const manualInput = async (type: 'qr' | 'loc') => {
    const texto = window.prompt(
      type === 'qr'
        ? 'Cole aqui o conteúdo do QR Code do veículo:'
        : 'Cole aqui o código de barras da localização:'
    );
    if (!texto) return;
    if (type === 'qr') {
      setCodigoVeiculo(texto);
      setMensagem('Veículo identificado!');
    } else {
      setCodigoLocal(texto);
      setMensagem('Localização identificada!');
    }
  };

  // Quando clicar em Identificação ou Localização
  const onPressIdentify = (type: 'qr' | 'loc') => {
    setMensagem('');
    if (Platform.OS === 'web') {
      manualInput(type);
    } else {
      setScanningType(type);
    }
  };

  // Mock de armazenagem
  const handleArmazenar = () => {
    Alert.alert('Sucesso', `Veículo ${codigoVeiculo}\narmazenado em ${codigoLocal}`);
    setCodigoVeiculo('');
    setCodigoLocal('');
    setMensagem('');
  };

  // Tela de scanner (nativo)
  if (Platform.OS !== 'web' && scanningType !== 'none') {
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Sem acesso à câmera</Text>
        </View>
      );
    }
    return (
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <TouchableOpacity style={styles.cancelButton} onPress={() => setScanningType('none')}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Tela principal
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recebimento de Veículo</Text>

      <TouchableOpacity style={styles.button} onPress={() => onPressIdentify('qr')}>
        <Text style={styles.buttonText}>
          {codigoVeiculo ? `Veículo: ${codigoVeiculo}` : 'Identificação (QR)'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => onPressIdentify('loc')}>
        <Text style={styles.buttonText}>
          {codigoLocal ? `Local: ${codigoLocal}` : 'Localização (Cód. Barras)'}
        </Text>
      </TouchableOpacity>

      {codigoVeiculo && codigoLocal && (
        <TouchableOpacity style={styles.storeButton} onPress={handleArmazenar}>
          <Text style={styles.storeButtonText}>Armazenar</Text>
        </TouchableOpacity>
      )}

      {!!mensagem && <Text style={styles.message}>{mensagem}</Text>}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    color: '#00FF00',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    backgroundColor: '#000',
    borderColor: '#00FF00',
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  storeButton: {
    width: '100%',
    backgroundColor: '#00FF00',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  storeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  errorText: {
    color: '#f00',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    bottom: 30,
    borderColor: '#00FF00',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  backButtonText: {
    color: '#00FF00',
    fontSize: 16,
  },
  cancelButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#000000aa',
    padding: 10,
    borderRadius: 8,
  },
  cancelText: {
    color: '#fff',
  },
});
