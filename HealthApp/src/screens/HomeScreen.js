import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import IndexButton from '../components/mainButton';

export default function HomeScreen({navigation}) {
    navigation.setOptions({backgroundColor:'white'});
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
        <View style={styles.container}>
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
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
  });