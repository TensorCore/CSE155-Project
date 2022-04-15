import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const IndexButton = (props) => {
    const {colors} = useTheme();
    return (
        <View style = {styles.container}>
            <Pressable style = {{...styles.button, backgroundColor: colors.card}} onPress={props.nav}>
                <View>
                    <Text style = {{...styles.text, color: colors.text}}>{props.label}</Text>
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
        margin: 15,
        marginBottom: 100,
        borderRadius: 8,
        elevation: 1,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    }
  });
  

export default IndexButton;