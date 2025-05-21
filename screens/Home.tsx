import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Home({ navigation }: any) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>HOME</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TipoCadastro')}
        >
          <Text style={styles.buttonText}>CADASTRO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Recebimento')}
        >
          <Text style={styles.buttonText}>RECEBIMENTO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Consulta')}
        >
          <Text style={styles.buttonText}>CONSULTA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Historico')}
        >
          <Text style={styles.buttonText}>HISTÓRICO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleLogout}
        >
          <Text style={styles.backButtonText}>SAIR</Text>
        </TouchableOpacity>
      </View>

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
  footer: {
    position: 'absolute',
    bottom: 10,
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
    width: '100%',
  },
});
