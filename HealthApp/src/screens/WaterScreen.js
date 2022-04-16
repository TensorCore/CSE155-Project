import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import {  } from 'react-native';
import ProgressBar from '../components/progressBar';

export default function WaterScreen({navigation}) {
    const {colors} = useTheme();
    useEffect(() => {
        navigation.setOptions({headerStyle: {backgroundColor: colors.primary}, 
                               headerTintColor: colors.text, 
                              });
    }, [useTheme()])

    return (
        <View>
            <ProgressBar max = {100}/>
        </View>
    );
}