import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IndexButton from './components/mainButton';

export default function App() {
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
