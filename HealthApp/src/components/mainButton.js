import React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

const IndexButton = (props) => {
    return (
        <View>
            <Pressable style = {styles.button}>
                <Text>{props.label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white'
    },
  });
  

export default IndexButton;