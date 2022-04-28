import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, ScrollView } from 'react-native';
import TimeGraph from '../components/timeGraph';
import getToday from '../data/today';
import ProgressRing from '../components/progressRing';


export default function ExerciseScreen({ navigation }) {
    const { colors } = useTheme();
    useEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.text,
        });
    }, [colors])
    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center', backgroundColor: colors.background }}>
            <TimeGraph name="exercise" goal={1000} />
            <View style={{ backgroundColor: colors.card, width: '100%', alignItems: 'center' }}>
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