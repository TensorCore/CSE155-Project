import React, {useState, useEffect} from "react";
import { Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { database } from "../data/database";

export default function valueRecord() {
    const [modalVisible, setModalVisible] = useState('false');
    const {colors} = useTheme();
    
    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={()=>setModalVisible((prev)=>{return(!prev)})}
            >
                <Center>
                    <Pressable style={{...styles.button, backgroundColor: colors.primary}}
                                onPress={()=>setModalVisible((prev)=>{return(!prev)})}
                    >
                        <Text style={styles.text}>Record</Text>
                    </Pressable>
                </Center>
            </Modal>
        <Pressable></Pressable>
        </View>
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