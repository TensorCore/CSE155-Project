import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput} from 'react-native';
import InputSpinner from "react-native-input-spinner";
import { useTheme } from '@react-navigation/native';
import { DataContext } from "../data/dataContext";

export default function ValueRecord(props) {
    const {data, updateData, setting} = useContext(DataContext);

    const [modalVisible, setModalVisible] = useState(false);
    const {colors} = useTheme();
    const [label, setLabel] = useState('');
    const [numInput, setNumInput] = useState(0);
    const [maxSettingVal, setMaxSettingVal] = useState(0);

    useEffect(()=>{
        if(label.toLowerCase() === 'exercise'){
            setMaxSettingVal(setting[0].exerciseGoal)
        } else if(label.toLowerCase() === 'water') {
            setMaxSettingVal(setting[0].waterGoal)
        } else if(label.toLowerCase() === 'calorie') {
            setMaxSettingVal(setting[0].calorieGoal)
        }

        setLabel(props.label);
        data.map(res=>{
            if(res.timestamp === props.selectedDate){
                if(label.toLowerCase() === 'exercise'){
                    setNumInput(res.exercise)
                } else if(label.toLowerCase() === 'water') {
                    setNumInput(res.water)
                } else if(label.toLowerCase() === 'calorie') {
                    setNumInput(res.calorie)
                }
            }
        })
    },[props.label, data, props.selectedDate, setting])

    const printdata = () => {
        console.log(data);
    }

    const recordData = () => {
        if(numInput>=0){
            console.log('Recording Data')
            updateData(props.selectedDate, props.label.toLowerCase(), numInput)
        }
        
    }
    return(
        <View style = {{...styles.record, borderColor: colors.text}}>
            <Modal
                hardwareAccelerated = {true}
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={()=>{setModalVisible(false)}}
            >
                <View style={styles.centeredView}>
                    <View style={{backgroundColor: colors.background, ...styles.modalView}}>
                        <Text style={{...styles.title, color: colors.text}}>{label} Record</Text>
                        <Text style={{...styles.title, color: colors.text}}>{props.selectedDate}</Text>
                        <View style={styles.formInput}>
                        <InputSpinner onChange={setNumInput} onIncrease={setNumInput} value = {numInput} onDecrease={setNumInput} placeholder={'  Update  '} min ={0} max={maxSettingVal*2} step={maxSettingVal/10} skin="clean" />
                        </View>

                        <View style = {{alignContent:'flex-end', marginTop: 15}}>  
                        <TouchableOpacity style={{...styles.button, backgroundColor: colors.background, alignSelf: 'flex-end', paddingHorizontal: 30}}
                                    onPress={()=>{recordData(); setModalVisible(false);}}
                        >
                            <Text style={{color: styles.text, fontWeight:'bold'}}>Record</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={{backgroundColor: colors.card, borderWidth: 0.5, borderRadius: 25, paddingHorizontal: 12}} onPress={()=>setModalVisible(true)}>
                <Text style={{color: colors.text, fontSize: 13, fontWeight: 'bold', padding: 10}}>Record</Text>
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
        borderWidth: 2,
        borderColor: 'black',
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
        flexDirection:'row',
        alignContent: 'center',
        justifyContent: 'center',
        margin: 80,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        justifyContent: 'center',
        alignSelf: 'flex-end',
        textAlign: 'center',
        alignItems: 'flex-end',
        fontSize: 15,
        paddingHorizontal: 10,
        paddingVertical: 3,
    }
  }); 