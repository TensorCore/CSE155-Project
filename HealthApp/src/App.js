import React from 'react';
import { Button, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import ExerciseScreen from './screens/ExerciseScreen'
import WaterScreen from './screens/WaterScreen';
import CalorieScreen from './screens/CalorieScreen';
import SettingScreen from './screens/SettingScreen';
import useDatabase from './data/useDatabase';
import { DataContextProvider } from './data/dataContext';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return(
    <HomeStack.Navigator>
      <HomeStack.Group screenOptions={headerStyle}>
        <HomeStack.Screen name = "HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name = "ExerciseScreen" component={ExerciseScreen} />
        <HomeStack.Screen name = "WaterScreen" component={WaterScreen} />
        <HomeStack.Screen name = "CalorieScreen" component={CalorieScreen} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  )
}

const SettingStack = createNativeStackNavigator();
function SettingStackScreen() {
  return(
    <SettingStack.Navigator>
      <SettingStack.Group screenOptions={headerStyle}>
        <SettingStack.Screen name = "SettingScreen" component={SettingScreen}/>
      </SettingStack.Group>
    </SettingStack.Navigator>
  )
}
const Tab = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();
  const isDBLoadingComplete = useDatabase();
  if(isDBLoadingComplete){
    return(
      <DataContextProvider>
        <NavigationContainer theme={scheme === 'dark' ? DTheme : LightTheme}>
          <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}>
            <Tab.Screen name = "Home" component={HomeStackScreen}/>
            <Tab.Screen name = "Settings" component={SettingStackScreen}/>
          </Tab.Navigator>
        </NavigationContainer>
      </DataContextProvider>
    );
  } else {
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
    background: 'mintcream',
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
    card: 'gray'
  }
}


