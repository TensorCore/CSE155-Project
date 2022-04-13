import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ExerciseScreen from './screens/ExerciseScreen'
import WaterScreen from './screens/WaterScreen';
import CalorieScreen from './screens/CalorieScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  return(
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : MyTheme}>
      <Stack.Navigator>
        <Stack.Group screenOptions={headerStyle}>
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

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

