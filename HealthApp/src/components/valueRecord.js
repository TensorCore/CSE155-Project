import React, {useState, useEffect} from "react";
import { Pressable, StyleSheet, Text, View, Modal, Dimensions, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useTheme } from '@react-navigation/native';
import getToday from "../data/today";

export default function ValueRecord(props) {
    const [modalVisible, setModalVisible] = useState('false');
    const {colors} = useTheme();
    const [label, setLabel] = useState('');

    const [dateInput ,setDateInput] = useState(getToday());
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
                            <Text>Placeholder</Text>
                        </View>
                        <Pressable style={{...styles.button, backgroundColor: colors.primary, alignSelf: 'flex-end'}}
                                    onPress={()=>setModalVisible((prev)=>{return(!prev)})}
                        >
                            <Text style={{color: styles.text}}>Record</Text>
                        </Pressable>
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
        elevation: 2,
        position:"absolute",
        left: Dimensions.get("window").width/100*30,
        bottom: Dimensions.get("window").height/100*3,
        alignItems: "flex-end",
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