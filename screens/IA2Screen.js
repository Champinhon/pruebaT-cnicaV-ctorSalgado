import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { sendMessageFromIA2 } from '../api/sendMessageIA2';

export default function IA2Screen({ route, navigation }) {
  const { message } = route.params;
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getResponse = async () => {
      try {
        const res = await sendMessageFromIA2(message);
        setResponse(res);
      } catch (error) {
        setResponse('Lo siento mucho, ¿cómo puedo ayudarte?');
      } finally {
        setLoading(false);
      }
    };
    getResponse();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IA 2.0</Text>

      <Text style={styles.label}>Mensaje recibido de IA 1.0:</Text>
      <Text style={styles.message}>"{message}"</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginVertical: 20 }} />
      ) : (
        <>
          <Text style={styles.label}>Respuesta de IA 2.0:</Text>
          <Text style={styles.response}>{response}</Text>
          <Button title="Volver a Configuración" onPress={() => navigation.navigate('Config')} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
  message: { fontSize: 18, textAlign: 'center', marginVertical: 10 },
  response: { fontSize: 18, textAlign: 'center', fontStyle: 'italic', marginTop: 10 },
});
