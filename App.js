import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfigScreen from './screens/ConfigScreen';
import IA1Screen from './screens/IA1Screen';
import IA2Screen from './screens/IA2Screen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Config">
        <Stack.Screen name="Config" component={ConfigScreen} options={{ title: 'Configurar claves' }} />
        <Stack.Screen name="IA1" component={IA1Screen} options={{ title: 'IA 1.0' }} />
        <Stack.Screen name="IA2" component={IA2Screen} options={{ title: 'IA 2.0' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
