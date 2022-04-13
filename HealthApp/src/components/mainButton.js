import React from 'react';
import { Pressable, StyleSheet, Text, TouchableWithoutFeedbackBase, View } from 'react-native';

const IndexButton = (props) => {
    return (
        <View style = {styles.container}>
            <Pressable style = {styles.button} onPress={props.nav}>
                <Text style = {styles.text}>{props.label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'cornsilk',
    },
    text : {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    }
  });
  

export default IndexButton;