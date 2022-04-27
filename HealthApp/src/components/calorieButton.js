import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { DataContext } from '../data/dataContext';
import getToday from '../data/today';
import ProgressRing from './progressRing';
import ValueRecord from './valueRecord';

export default function CalorieButton(props) {
    const {data} = useContext(DataContext);

    const {colors} = useTheme();
    return (
        <View style = {styles.container}>
            <TouchableOpacity style = {{...styles.button, backgroundColor: colors.card, paddingBottom: props.padding}} onPress={props.nav}>
                <View>
                    <Text style = {{...styles.text, color: colors.text}}>Food</Text>
                </View>

                <ValueRecord label = 'Calorie' selectedDate = {props.passThroughDate}></ValueRecord>

                <View>
                    <ProgressRing name='calorie' max={1000} selectedDate = {props.passThroughDate}/>
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