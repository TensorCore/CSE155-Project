import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { NavigationContainer, useTheme } from '@react-navigation/native';

export default function ProgressBar(props) {
    // TODO: usecontext for the progress value
    // TODO: useEffect(){}[dependency] to update 

    const { colors } = useTheme();

    const [progress, setValue] = useState(useRef(new Animated.Value(50)).current);

    const [progressColor, setColor] = useState(colors.primary === 'azure' ? '#AFA' : '#5A5');

    useEffect(() => {
        setColor(colors.primary === 'azure' ? '#AFA' : '#5A5');
    }, [colors])

    const fillIn = (props) => {
        Animated.timing(progress, {
            toValue: props.val,
            duration: 1000
        }).start();
    };

    const empty = () => {
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000
        }).start();
    };

    return (
        < View
            style={{
                ...progressStyles.containerStyle,
                backgroundColor: colors.card,
                borderColor: colors.text
            }} >
            <Animated.View
                style={{
                    ...progressStyles.innerStyle,
                    width: progress._value / props.max * 100 + "%",
                    // TODO: Figure out what color to use here
                    backgroundColor: progressColor
                }}
            />
            <Animated.Text
                style={{
                    ...progressStyles.label, color: colors.text
                }}>
                {progress._value} of {props.max}
            </Animated.Text>
        </View >
    );
}

const progressStyles = StyleSheet.create({
    containerStyle: {
        width: "100%",
        height: 40,
        padding: 3,
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 200,
        justifyContent: "center",
    },
    innerStyle: {
        height: 31,
        borderRadius: 16,
    },
    label: {
        fontSize: 24,
        position: "absolute",
        zIndex: 1,
        alignSelf: "center",
    }
});
