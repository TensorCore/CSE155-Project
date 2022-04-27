import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { DataContext } from '../data/dataContext';
import * as Progress from 'react-native-progress';

export default function ProgressRing(props) {
    // Make sure progress value is linked to data
    const { data } = useContext(DataContext);

    const [progress, setValue] = useState(0);

    var updated = false;

    // Extract only the value we care about (today's props.name value)
    const getDailyData = (obj) => {
        // Today doesn't have data right now
        // Also, getToday() might need some time localization to work
        // if (getToday() === obj.timestamp) {
        if (props.selectedDate === obj.timestamp) {
            setValue(obj[props.name]);
            updated = true;
        }
    }

    const getProgressColor = () => {
        let progressPerc = progress / props.max;
        return (colors.primary === 'azure' ? '#5CF' : '#27A');
    }

    // Make sure colors are on theme
    const { colors } = useTheme();
    const [progressColor, setColor] = useState(getProgressColor());

    useEffect(() => {
        updated = false;
        if (!(typeof data === 'undefined')) {
            data.map(getDailyData);
        }
        // Runs if the the object is undefined or there is no data for our date
        if (!updated) {
            setValue(0);
        }
        setColor(getProgressColor());
    }, [colors, data, props.selectedDate, progress])

    return (
        <View>
            <Progress.Circle borderColor={colors.text} thickness={24} size={200} borderRadius={10}
                color={progressColor} progress={progress / props.max} showsText textStyle={{color: colors.text}}/>
        </View>
    );
}
