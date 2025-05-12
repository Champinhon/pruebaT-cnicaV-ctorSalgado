import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { saveKey, getKey } from '../utils/SecureStore';

export default function ConfigScreen({ navigation }) {
  const [key1, setKey1] = useState('');
  const [key2, setKey2] = useState('');

  useEffect(() => {
    const loadKeys = async () => {
      const storedKey1 = await getKey('apiKeyIA1');
      const storedKey2 = await getKey('apiKeyIA2');
      if (storedKey1) setKey1(storedKey1);
      if (storedKey2) setKey2(storedKey2);
    };
    loadKeys();
  }, []);

  const handleSave = async () => {
    if (!key1 || !key2) {
      Alert.alert('Error', 'Debes ingresar ambas API keys');
      return;
    }
    await saveKey('apiKeyIA1', key1);
    await saveKey('apiKeyIA2', key2);
    Alert.alert('Listo', 'Claves guardadas correctamente');
    navigation.navigate('IA1');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>API Key IA 1:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={key1}
        onChangeText={setKey1}
        placeholder="sk-..."
      />
      <Text style={styles.label}>API Key IA 2:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={key2}
        onChangeText={setKey2}
        placeholder="sk-..."
      />
      <Button title="Guardar y continuar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', marginBottom: 20, padding: 10, borderRadius: 5,
  },
  label: { fontWeight: 'bold', marginBottom: 5 },
});
