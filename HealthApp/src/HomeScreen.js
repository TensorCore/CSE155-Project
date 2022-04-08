import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import IndexButton from './components/mainButton';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <IndexButton label={'Water'}></IndexButton>
            <IndexButton label={'Something'}></IndexButton>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });