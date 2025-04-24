import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function CadastroLocalizacao() {
  const [localizacao, setLocalizacao] = useState({
    armazem: '',
    rua: '',
    modulo: '',
    compartimento: '',
  });

  const salvarLocalizacao = () => {
    const nome_localizacao = `${localizacao.armazem}-${localizacao.rua}-${localizacao.modulo}-${localizacao.compartimento}`;
    // Simular salvar localização
    alert(`Localização salva: ${nome_localizacao}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Cadastro de Localização</Text>
      {(Object.keys(localizacao) as Array<keyof typeof localizacao>).map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.toUpperCase()}
          value={localizacao[key]}
          onChangeText={(text) => setLocalizacao({ ...localizacao, [key]: text })}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={salvarLocalizacao}>
        <Text style={styles.buttonText}>Salvar Localização</Text>
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
