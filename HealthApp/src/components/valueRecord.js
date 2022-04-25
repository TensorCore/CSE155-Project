import React, {useState, useEffect, useContext} from "react";
import { Pressable, StyleSheet, Text, View, Modal, TouchableOpacity, TextInput} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { DataContext } from "../data/dataContext";
import getToday from "../data/today";

export default function ValueRecord(props) {
    const {data, addNewData, updateData} = useContext(DataContext);
    
    const [modalVisible, setModalVisible] = useState('false');
    const {colors} = useTheme();
    const [label, setLabel] = useState('');

    const [numInput, setNumInput] = useState(0);
    useEffect(()=>{
        setLabel(props.label);
    },[props.label])

    return(
        <View style = {{...styles.record, borderColor: colors.text}}>
            <Modal
                hardwareAccelerated = {true}
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={()=>setModalVisible((prev)=>{return(!prev)})}
            >
                <View style={styles.centeredView}>
                    <View style={{backgroundColor: colors.background, ...styles.modalView}}>
                        <Text style={styles.title}>{label} Record</Text>
                        <View style={styles.formInput}>
                        <TextInput value={numInput} onChangeText={setNumInput} placeholder='Type Value To Update' keyboardType="numeric"/>
                        </View>

                        <View style = {{alignContent:'flex-end', marginTop: 50}}>  
                        <TouchableOpacity style={{...styles.button, backgroundColor: colors.primary, alignSelf: 'flex-end', paddingHorizontal: 30}}
                                    onPress={()=>setModalVisible((prev)=>{return(!prev)})}
                        >
                            <Text style={{color: styles.text}}>Record</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={{backgroundColor: colors.card, borderWidth: 0.5, borderRadius: 25, paddingHorizontal: 12}} onPress={()=>setModalVisible(true)}>
                <Text style={{color: colors.text, fontSize: 11, fontWeight: 'bold', padding: 10}}>Record</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
    flex : 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    },
    container: {
        height: 15,
        width: 20,
    },
    button: {
        borderRadius: 30,
        padding: 10,
        elevation: 3,
        justifyContent: "center",
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    modalView: {
        flexDirection: "column",
        height: 400,
        width: 300,
        margin: 20,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    record: {
        fontSize: 15,
        alignContent:'flex-end',
        alignSelf: 'flex-end',
        fontWeight: 'bold',
    },
    press: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
    },
    formInput: {
        alignContent: 'center',
        justifyContent: 'center',
        margin: 100,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    }
  }); 