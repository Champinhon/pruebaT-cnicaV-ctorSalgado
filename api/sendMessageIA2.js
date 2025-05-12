import axios from 'axios';
import { getKey } from '../utils/SecureStore';

export const sendMessageFromIA2 = async (message) => {
  const apiKey = await getKey('apiKeyIA2');
  if (!apiKey) throw new Error('API Key de IA 2 no encontrada');

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-2024-08-06',
        messages: [
          {
            role: 'system',
            content:
              'Estás actuando como IA 2.0. Tu única tarea es recibir un mensaje de otra IA (IA 1.0). Si el mensaje que recibes es un texto legible y válido, debes responder exactamente: "Me alegro mucho, que tengas un lindo día". Si el mensaje está vacío, es ilegible, o si hay algún problema en el proceso, responde exactamente: "Lo siento mucho, ¿cómo puedo ayudarte?". No agregues nada más.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
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
    console.error('Error en IA 2:', error.message);
    return 'Lo siento mucho, ¿cómo puedo ayudarte?';
  }
};
