import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, TouchableWithoutFeedbackBase, View} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { DataContext } from '../data/dataContext';
import valueRecord from './valueRecord';
import getToday from '../data/today';

export default function ExerciseButton(props) {
    const {data} = useContext(DataContext);
    const {colors} = useTheme();
    return (
        <View style = {styles.container}>
            <Pressable style = {{...styles.button, backgroundColor: colors.card, paddingBottom: props.padding}} onPress={props.nav}>
                <View>
                    <Text style = {{...styles.text, color: colors.text}}>Exercise</Text>
                </View>
                <View style ={{...styles.record, borderColor: colors.text}}>
                    <Text style={colors.text}>Record</Text>
                </View>
            </Pressable>
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
        marginTop: 35,
        marginBottom: 20,
        borderRadius: 8,
        elevation: 1,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    record: {
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 21,
        padding: 4,
        paddingHorizontal: 20,
        alignContent:'center',
        alignSelf: 'flex-end',
        fontWeight: 'bold',
    }
  }); 