import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import IndexButton from './components/mainButton';

export default function HomeScreen({navigation}) {
    const moveToExercise = () => {
        navigation.navigate('ExerciseScreen')
    }
    return (
        <View style={styles.container}>
            <IndexButton label={'Exercise'} nav = {moveToExercise}></IndexButton>
            <IndexButton label={'Water'}></IndexButton>
            <IndexButton label={'Calories'}></IndexButton>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
  });