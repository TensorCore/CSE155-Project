import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { DataContext } from '../data/dataContext';
import getToday from '../data/today';
import ProgressBar from './progressBar';
import ValueRecord from './valueRecord';

export default function ExerciseButton(props) {
    const { data } = useContext(DataContext);

    const { colors } = useTheme();

    const { setting } = useContext(DataContext);

    const [progress, setValue] = useState(0);

    const [goal, setGoal] = useState(10);

    var updated = false;

    // Extract only the value we care about (today's value)
    const getDailyData = (obj) => {
        // Today doesn't have data right now
        // if (getToday() === obj.timestamp) {
        if (getToday() === obj.timestamp) {
            setValue(obj['exercise']);
            updated = true;
        }
    }

    useEffect(() => {
        updated = false;
        if (!(typeof data === 'undefined')) {
            data.map(getDailyData);
        }
        // Runs if the the object is undefined or there is no data for our date
        if (!updated) {
            setValue(0);
        }
        if (!(typeof setting[0]['exerciseGoal'] === 'undefined')) {
            setGoal(setting[0]['exerciseGoal']);
        }
    }, [data, setting])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ ...styles.button, backgroundColor: colors.card, paddingBottom: props.padding }} onPress={props.nav}>
                <View>
                    <Text style={{ ...styles.text, color: colors.text }}>Exercise</Text>
                </View>

                <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ width: '70%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text style={{ ...styles.text, color: colors.text, fontSize: 25 }}>{progress}</Text>
                            <Text style={{ ...styles.text, color: colors.text, fontWeight: 'normal'}}>/{goal} Calories</Text>
                        </View>
                    </View>
                    <View style={{ width: '30%' }}>
                        <ValueRecord label='Exercise' selectedDate={props.passThroughDate}></ValueRecord>
                    </View>
                </View>

                <View>
                    <ProgressBar name='exercise' selectedDate={props.passThroughDate} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        padding: 20,
        margin: 10,
        marginTop: 25,
        marginBottom: 20,
        borderRadius: 8,
        elevation: 1,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    }
}); 