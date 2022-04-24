import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import TimeGraph from '../components/timeGraph';

export default function CalorieScreen({ navigation }) {
    const { colors } = useTheme();
    useEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.text,
        });
    }, [colors])
    return (
        <View>
            <TimeGraph name="calorie" goal={1000}/>
        </View>
    );
}