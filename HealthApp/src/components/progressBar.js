import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function ProgressBar (props) {
    // const progress = useRef(new Animated.Value(0)).current;

    const [progress, setValue] = useState(useRef(new Animated.Value(0)).current);

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

    // Pulled off the internet
    // https://www.educba.com/react-native-progress-bar/
    // SyleSheet from same place
    // should probably personalize
    return (
        < View style={progressStyles.containerStyle} >
            <Animated.View
                style={[
                    progressStyles.innerStyle, 
                    { width: progressValue / props.max * 100 + "%" },
                ]}
            />
            <Animated.Text style={progressStyles.label}>
                {progressValue} of {props.max}
            </Animated.Text>
        </View >
    );
}

const progressStyles = StyleSheet.create({
    containerStyle: {
        width: "100%",
        height: 40,
        padding: 3,
        borderColor: "#FAA",
        borderWidth: 3,
        borderRadius: 30,
        marginTop: 200,
        justifyContent: "center",
    },
    innerStyle: {
        width: "100%",
        height: 31,
        borderRadius: 16,
        backgroundColor: "green",
    },
    label: {
        fontSize: 24,
        color: "black",
        position: "absolute",
        zIndex: 1,
        alignSelf: "center",
    }
});
