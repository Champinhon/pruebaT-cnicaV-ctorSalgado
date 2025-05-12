import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { sendMessageFromIA1 } from '../api/sendMessageIA1';

export default function IA1Screen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSend = async () => {
    setLoading(true);
    try {
      const res = await sendMessageFromIA1();
      setResponse(res);
    } catch (error) {
      setResponse('Error al comunicarse con IA 1.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IA 1.0</Text>

      <Text style={styles.message}>¿Hola, cómo estás?</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginVertical: 20 }} />
      ) : (
        <Button title="Enviar" onPress={handleSend} />
      )}

      {response && (
        <Text style={styles.response}>
          (Respuesta real: {response})
        </Text>
      )}

      {response && (
        <Button
          title="Continuar a IA 2.0"
          onPress={() => navigation.navigate('IA2', { message: '¿Hola, cómo estás?' })}
          color="#4CAF50"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  message: { fontSize: 20, marginBottom: 20 },
  response: { marginTop: 20, fontStyle: 'italic', textAlign: 'center', color: '#555' },
});
