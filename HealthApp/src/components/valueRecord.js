import React, {useState} from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { database } from "../data/database";

export default function valueRecord() {
    
    return(
        <Pressable style = {styles.container}></Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 15,
        width: 20,
    },
    button: {

    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    }
  }); 