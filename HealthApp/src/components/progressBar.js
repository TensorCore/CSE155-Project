import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
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
        if (props.selectedDate === obj.timestamp) {
            console.log(props.selectedDate === obj.timestamp);
            setValue(obj[props.name]);
        }
    }

    const getProgressColor = () => {
        let progressPerc = progress / props.max;
        if (progressPerc < .34) {
            return (colors.primary === 'azure' ? '#FAA' : '#A55');
        } else if (progressPerc < .67) {
            return (colors.primary === 'azure' ? '#FA5' : '#A50');
        } else {
            return (colors.primary === 'azure' ? '#AFA' : '#5A5');
        }
    }

    // Make sure colors are on theme
    const { colors } = useTheme();
    const [progressColor, setColor] = useState(getProgressColor());

    useEffect(() => {
        if (!(typeof data === 'undefined'))
            data.map(getDailyData);
        setColor(getProgressColor());
    }, [colors, data, props.selectedDate])

    return (
        <View>
            <Progress.Bar borderColor={colors.text} height={15} width={190} borderRadius={10}
                color={progressColor} progress={progress / props.max} />
        </View>
    );
}
