import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import IndexButton from '../components/mainButton';

export default function HomeScreen({navigation}) {
    const {colors} = useTheme();
    useEffect(() => {
        navigation.setOptions({headerStyle: {backgroundColor: colors.primary}, 
                               headerTintColor: colors.text,
                               
                              });
    }, [useTheme()])

    const moveToExercise = () => {
        navigation.navigate('ExerciseScreen')
    }

    const moveToWater = () => {
        navigation.navigate('WaterScreen')
    }

    const moveToCalories = () => {
        navigation.navigate('CalorieScreen')
    }

    return (
        <View style={{...styles.container, backgroundColor: colors.background}}>
            <IndexButton label={'Exercise'} nav = {moveToExercise}></IndexButton>
            <IndexButton label={'Water'} nav = {moveToWater}></IndexButton>
            <IndexButton label={'Calories'} nav = {moveToCalories}></IndexButton>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
  });