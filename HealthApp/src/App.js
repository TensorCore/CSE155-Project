import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ExerciseScreen from './ExerciseScreen'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name = "HomeScreen" component={HomeScreen} />
          <Stack.Screen name = "ExerciseScreen" component={ExerciseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


