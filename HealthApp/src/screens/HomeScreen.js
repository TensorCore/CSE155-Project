import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CalorieButton from '../components/calorieButton';
import WaterButton from '../components/waterButton';
import ExerciseButton from '../components/exerciseButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import getToday from '../data/today';

export default function HomeScreen({navigation}) {
    const [preDateSetup, setPreDateSetup] = useState(new Date());
    const [dateSelected, setSelectedDate] = useState(getToday());

    const {colors} = useTheme();
    useEffect(() => {
        navigation.setOptions({headerStyle: {backgroundColor: colors.primary}, 
                               headerTintColor: colors.text,
                              });
    }, [colors])

    const dateConversion = (dateIn) => {
        const formatYmd = (date) => date.toISOString().slice(0, 10);
        setSelectedDate(formatYmd(dateIn));
    }

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
                <View>
                    <Text>Selected Date: {dateSelected}</Text>
                </View>
                <ExerciseButton padding={50} nav = {moveToExercise} passThroughDate={dateSelected}/>
                <WaterButton padding={50} nav = {moveToWater} passThroughDate={dateSelected}/>
                <CalorieButton padding={50} nav = {moveToCalories} passThroughDate={dateSelected}/>
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