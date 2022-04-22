import React, {useState, useEffect} from "react";
import { Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { database } from "../data/database";

export default function valueRecord() {
    const [modalVisible, setModalVisible] = useState('false');
    const {colors} = useTheme();
    
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=>setModalVisible((prev)=>{return(!prev)})}
        >
            <View></View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 15,
        width: 20,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    }
  }); 