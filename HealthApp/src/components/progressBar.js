import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { DataContext } from '../data/dataContext';
import * as Progress from 'react-native-progress';
import getToday from '../data/today';

export default function ProgressBar(props) {
    // Make sure progress value is linked to data
    const { data } = useContext(DataContext);

    const { colors } = useTheme();

    const getProgressColor = (val) => {
        let pcnt = val / props.max;
        if (pcnt < .34) {
            return (colors.primary === 'azure' ? '#FAA' : '#A55');
        } else if (pcnt < .67) {
            return (colors.primary === 'azure' ? '#FC5' : '#A70');
        } else {
            return (colors.primary === 'azure' ? '#AFA' : '#5A5');
        }
    }

    const [progress, setValue] = useState(0);

    var progressUpdated = false;

    // Extract only the value we care about (today's props.name value)
    const getDailyData = (obj) => {
        // Today doesn't have data right now
        // Also, getToday() might need some time localization to work
        // if (getToday() === obj.timestamp) {
        if (props.selectedDate === obj.timestamp) {
            setValue(obj[props.name]);
            progressUpdated = true;
        }
    }

    // Make sure colors are on theme
    const [progressColor, setColor] = useState(getProgressColor(progress));

    useEffect(() => {
        if (!(typeof data === 'undefined')) {
            progressUpdated = false;
            data.map(getDailyData);
            if (!progressUpdated) {
                setValue(0);
            }
        }
        setColor(getProgressColor(progress));
    }, [colors, data, props.selectedDate, progress])

    return (
        <View>
            <Progress.Bar borderColor={colors.text} height={15} width={190} borderRadius={10}
                color={progressColor} progress={progress / props.max} />
        </View>
    );
}
