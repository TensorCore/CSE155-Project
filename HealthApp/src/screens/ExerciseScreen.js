import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, ScrollView } from 'react-native';
import TimeGraph from '../components/timeGraph';
import getToday from '../data/today';
import ProgressRing from '../components/progressRing';
import { DataContext } from '../data/dataContext';


export default function ExerciseScreen({ navigation }) {
    const { colors } = useTheme();

    const { totalAvgExercise } = useContext(DataContext);

    const { setting } = useContext(DataContext);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.text,
        });
    }, [colors])

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center', backgroundColor: colors.primary, height: '100%' }}>
            <TimeGraph name="exercise" />
            <View style={{ width: '100%', flexDirection: 'row', backgroundColor: colors.background }}>
                <View style={{ width: '50%', alignContent: 'flex-start' }}>
                    <Text style={{ textAlign: 'left', padding: 10 }}>
                        Daily Average{'\n' + Math.round(totalAvgExercise[0].avg * 10) / 10}
                    </Text>
                </View>
                <View style={{ width: '50%', alignContent: 'flex-end' }}>
                    <Text style={{ textAlign: 'right', padding: 10 }}>
                        Current Goal{'\n' + setting[0].exerciseGoal}
                    </Text>
                </View>
            </View>
            <View style={{ backgroundColor: colors.card, width: '100%', alignItems: 'center', elevation: 3, height: '100%' }}>
                <View style={{ width: '100%' }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        padding: 10
                    }}>Today{'\n' + getToday()}
                    </Text>
                </View>
                <ProgressRing name='exercise' selectedDate={getToday()} />
            </View>
        </ScrollView>
    );
}