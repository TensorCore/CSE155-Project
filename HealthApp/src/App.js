import React from 'react';
import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ExerciseScreen from './screens/ExerciseScreen'
import WaterScreen from './screens/WaterScreen';
import CalorieScreen from './screens/CalorieScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{...headerStyle}}>
          <Stack.Screen name = "HomeScreen" component={HomeScreen}/>
          <Stack.Screen name = "ExerciseScreen" component={ExerciseScreen}/>
          <Stack.Screen name = "WaterScreen" component={WaterScreen}/>
          <Stack.Screen name = "CalorieScreen" component={CalorieScreen}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const headerStyle = {
  headerStyle: {backgroundColor: '#000'}, 
                headerTintColor: '#fff',
                headerTitleStyle: {fontWeight: 'bold', fontSize: 24},
};

