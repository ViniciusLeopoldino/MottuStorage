import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';

export default function CadastroVeiculoScreen() {
  const navigation = useNavigation();
  const [veiculo, setVeiculo] = useState({
    placa: '',
    chassi: '',
    modelo: '',
    km: '',
    contrato: '',
    ocorrencia: '',
  });

  const handleDownloadQRCode = async () => {
    // Monte a string com os dados
    const dataString = JSON.stringify(veiculo);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      dataString
    )}&size=300x300`;

    if (Platform.OS === 'web') {
      window.open(qrUrl, '_blank');
      return;
    }

    try {
      const filename = FileSystem.documentDirectory + 'mottu-qr.png';
      const { uri } = await FileSystem.downloadAsync(qrUrl, filename);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('Download', asset, false);
        Alert.alert('Sucesso', 'QR Code salvo na galeria!');
      } else {
        Alert.alert('Erro', 'Permissão negada para salvar imagens.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha ao salvar QR Code.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          {(
            ['placa', 'chassi', 'modelo', 'km', 'contrato', 'ocorrencia'] as const
          ).map((key) => (
            <TextInput
              key={key}
              style={styles.input}
              placeholder={key.toUpperCase()}
              placeholderTextColor="#00FF00"
              value={(veiculo as any)[key]}
              onChangeText={(text) =>
                setVeiculo((v) => ({ ...v, [key]: text }))
              }
            />
          ))}

          <TouchableOpacity
            style={styles.button}
            onPress={handleDownloadQRCode}
          >
            <Text style={styles.buttonText}>IMPRIMIR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>VOLTAR</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#000' },
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  form: { alignItems: 'center' },
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
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  backButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00FF00',
  },
  backButtonText: { color: '#00FF00', fontSize: 16 },
  footer: {
    color: '#555',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
  },
});