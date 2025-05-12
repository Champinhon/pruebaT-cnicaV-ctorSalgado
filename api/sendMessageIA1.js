import axios from 'axios';
import { getKey } from '../utils/SecureStore';

export const sendMessageFromIA1 = async () => {
  const apiKey = await getKey('apiKeyIA1');
  if (!apiKey) throw new Error('API Key de IA 1 no encontrada');

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-2024-08-06',
        messages: [{ role: 'user', content: '¿Hola, cómo estás?' }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = response.data.choices[0].message.content;
    return result;
  } catch (error) {
    console.error('Error en IA 1:', error.message);
    throw error;
  }
};
