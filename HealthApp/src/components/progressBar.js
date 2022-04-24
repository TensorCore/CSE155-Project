import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { DataContext } from '../data/dataContext';
import * as Progress from 'react-native-progress';
import getToday from '../data/today';

export default function ProgressBar(props) {
    // Make sure progress value is linked to data
    const { data } = useContext(DataContext);

    const [progress, setValue] = useState(0);

    // Extract only the value we care about (today's props.name value)
    const getDailyData = (obj) => {
        // Today doesn't have data right now
        // Also, getToday() might need some time localization to work
        // if (getToday() === obj.timestamp) {
        if ("2022-03-09" === obj.timestamp) {
            setValue(obj[props.name]);
            console.log(obj[props.name]);
        }
    }

    // Make sure colors are on theme
    const { colors } = useTheme();
    const [progressColor, setColor] = useState(colors.primary === 'azure' ? '#AFA' : '#5A5');

    useEffect(() => {
        setColor(colors.primary === 'azure' ? '#AFA' : '#5A5');
        if (!(typeof data === 'undefined'))
            data.map(getDailyData);
    }, [colors, data])

    return (
        <View>
            <Progress.Bar width={200} borderRadius={10}
                color={progressColor} progress={progress / props.max} />
        </View>
    );
}

const progressStyles = StyleSheet.create({
    containerStyle: {
        width: "100%",
        height: 40,
        padding: 3,
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 200,
        justifyContent: "center",
    },
    innerStyle: {
        height: 31,
        borderRadius: 16,
    },
    label: {
        fontSize: 24,
        position: "absolute",
        zIndex: 1,
        alignSelf: "center",
    }
});
