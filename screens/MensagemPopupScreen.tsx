import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { RouteProp } from '@react-navigation/native';

type MensagemScreenRouteProp = RouteProp<{ params: { tipo: string; texto: string } }, 'params'>;

export default function MensagemScreen({ route }: { route: MensagemScreenRouteProp }) {
  const { tipo, texto } = route.params || {};

  const corMensagem = tipo === 'erro' ? '#ff4d4d' : '#4BB543';

  return (
    <View style={[styles.container, { backgroundColor: corMensagem }]}>
      <Text style={styles.texto}>{texto || 'Mensagem'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
