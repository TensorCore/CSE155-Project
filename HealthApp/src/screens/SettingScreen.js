import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import { DataContext } from '../data/dataContext';

export default function SettingScreen({ navigation }) {
    const {setting, updateSetting} = useContext(DataContext);
    const { colors } = useTheme();
    const [valueExercise, setExercise] = useState(0);
    const [valueWater, setWater] = useState(0);
    const [valueCalorie, setCalorie] = useState(0);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.text,
        });
    }, [colors])

    useEffect(() => {
        setExercise(setting[0].ExerciseGoal);
        setWater(setting[0].WaterGoal);
        setCalorie(setting[0].FoodGoal);
        console.log(setting);
    }, [setting])

    const pushSetting = () => {
        updateSetting('exercise', valueExercise);
        updateSetting('water', valueWater);
        updateSetting('calorie', valueCalorie);
    }
    return (
        <View style={{...styles.container, backgroundColor: colors.background}}>
            <View style={{...styles.button, backgroundColor: colors.card, justifyContent:'center', alignItems: 'center'}}>
                <Text style={styles.text}>Exercise Target</Text>
                <InputSpinner min={0} step={100} onIncrease={setExercise} onDecrease={setExercise} onChange={setExercise} value={valueExercise} colorLeft={colors.text} colorRight={colors.text}></InputSpinner>
            </View>

            <View style={{...styles.button, backgroundColor: colors.card, justifyContent:'center', alignItems: 'center'}}>
                <Text style={styles.text}>Water Target</Text>
                <InputSpinner min={0} step={1} onIncrease={setWater} onDecrease={setWater} onChange={setWater} value={valueWater} colorLeft={colors.text} colorRight={colors.text}></InputSpinner>
            </View>

            <View style={{...styles.button, backgroundColor: colors.card, justifyContent:'center', alignItems: 'center'}}>
                <Text style={styles.text}>Calorie Target</Text>
                <InputSpinner min={0} step={100} onIncrease={setCalorie} onDecrease={setCalorie} onChange={setCalorie} value={valueCalorie} colorLeft={colors.text} colorRight={colors.text}></InputSpinner>
            </View>

            <TouchableOpacity style={{...styles.submit, borderColor: colors.text}} onPress={pushSetting}>
                <Text style={{...styles.text, color: colors.text}}>Submit Data</Text>
            </TouchableOpacity>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    button: {
        padding: 20,
        margin: 10,
        marginTop: 25,
        marginBottom: 20,
        borderRadius: 8,
        elevation: 1,
        height: 100,
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    submit: {
        margin: 100,
        padding: 20,
        borderWidth: 0.5,
        borderRadius: 21,
        marginTop: 50,
        justifyContent:'center',
        alignItems: 'center'
    }
  }); 