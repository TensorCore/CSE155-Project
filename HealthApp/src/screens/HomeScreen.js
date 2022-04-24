import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CalorieButton from '../components/calorieButton';
import WaterButton from '../components/waterButton';
import ExerciseButton from '../components/exerciseButton';

export default function HomeScreen({navigation}) {
    const {colors} = useTheme();
    useEffect(() => {
        navigation.setOptions({headerStyle: {backgroundColor: colors.primary}, 
                               headerTintColor: colors.text,
                              });
    }, [colors])

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
        <View style = {styles.container}>
            <ScrollView style = {{...styles.scrollView, backgroundColor: colors.background}}>
                <ExerciseButton padding={50} nav = {moveToExercise}/>
                <WaterButton padding={50} nav = {moveToWater}/>
                <CalorieButton padding={50} nav = {moveToCalories}/>
                <StatusBar style="auto" />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      },
      scrollView: {
        marginHorizontal: 0,
      },
});