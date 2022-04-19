import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ExerciseScreen from './screens/ExerciseScreen'
import WaterScreen from './screens/WaterScreen';
import CalorieScreen from './screens/CalorieScreen';

import useDatabase from './data/useDatabase';

const Stack = createNativeStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  const isDBLoadingComplete = useDatabase();
  if(isDBLoadingComplete){
    return(
      <NavigationContainer theme={scheme === 'dark' ? DTheme : LightTheme}>
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
  } else {
    console.log('Db loading Error');
    return null;
  }
}
const headerStyle = {
  headerStyle: {backgroundColor: '#000'}, 
                headerTintColor: '#fff',
                headerTitleStyle: {fontWeight: 'bold', fontSize: 19},
};

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'azure',
    text: '#474744',
    background: 'aliceblue',
    card: 'azure'
  },
};

const DTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme,
    background: 'black',
    primary: 'black',
    text: 'white',
    card: 'black'
  }
}


