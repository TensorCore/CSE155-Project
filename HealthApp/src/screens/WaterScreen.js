import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import TimeGraph from '../components/timeGraph';

export default function WaterScreen({ navigation }) {
    const { colors } = useTheme();
    useEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.text,
        });
    }, [colors])

    return (
        <View>
            <TimeGraph name="water" goal={8} />
        </View>
    );
}