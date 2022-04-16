import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';


export default function ExerciseScreen({navigation}) {
    const {colors} = useTheme();
    useEffect(() => {
        navigation.setOptions({headerStyle: {backgroundColor: colors.primary}, 
                               headerTintColor: colors.text, 
                              });
    }, [colors])
    return (
        <View>
            <Text>PlaceHolder</Text>
        </View>
    );
}