import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import CalorieButton from '../components/calorieButton';
import WaterButton from '../components/waterButton';
import ExerciseButton from '../components/exerciseButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import getToday from '../data/today';

export default function HomeScreen({navigation}) {
    var today = new Date();
    const [preDateSetup, setPreDateSetup] = useState(new Date(today.toLocaleDateString()));
    const [dateSelected, setSelectedDate] = useState(getToday());
    const [showCalendar, setShowCalendar] = useState(false);

    const {colors} = useTheme();
    useEffect(() => {
        navigation.setOptions({headerStyle: {backgroundColor: colors.background}, 
                               headerTintColor: colors.text,
                              });
    }, [colors])

    const calendarFunction = (event, selectedDate) => {
        if(selectedDate != null){
            setShowCalendar(false);
            setPreDateSetup(new Date(selectedDate))
            setSelectedDate(selectedDate.toISOString().slice(0, 10));
            console.log(selectedDate.toISOString().slice(0, 10));
        } 
        setShowCalendar(false);
    }

    const pressCalendarFunction = () => {
        setShowCalendar(true);
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
                <View style={{...styles.card, backgroundColor: colors.card, }}>
                    <Text style={{...styles.dateText, color: colors.text}}>{preDateSetup.toISOString().slice(0, 10)===getToday() ? `Today\n${preDateSetup.toLocaleDateString()} ` :preDateSetup.toLocaleDateString()}</Text>
                    <TouchableOpacity style={styles.tapDate} onPress={pressCalendarFunction}><Text style={styles.tapDateText}>Change Date</Text></TouchableOpacity>
                </View>
                {showCalendar && (<DateTimePicker display = 'spinner' value = {preDateSetup} mode = 'date' onChange={calendarFunction} maximumDate={new Date()}></DateTimePicker> )}

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
      card: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        margin: 10,
        marginTop: 10,
        borderRadius: 8,
        elevation: 1,
      },
      dateText: {
        fontSize: 20, 
        marginLeft: 25,
        marginRight: 75
      },
      tapDate: {
        borderColor: 'dodgerblue',
        borderWidth: 0.3,
        backgroundColor: 'dodgerblue',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        padding: 10,
        borderRadius: 5,
      },
      tapDateText: {
        fontSize: 15,
        color: 'white',
      }
});