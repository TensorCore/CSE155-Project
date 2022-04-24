import React, {useState, useEffect} from "react";
import { Pressable, StyleSheet, Text, View, Modal, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function ValueRecord(props) {
    const [modalVisible, setModalVisible] = useState('false');
    const {colors} = useTheme();
    const [label, setLabel] = useState('');

    useEffect(()=>{
        setLabel(props.label);
    },[])

    return(
        <View style = {{...styles.record, borderColor: colors.text}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={()=>setModalVisible((prev)=>{return(!prev)})}
            >
                <View style={styles.centeredView}>
                    <View style={{backgroundColor: colors.background, ...styles.modalView}}>
                        <Text>{label}</Text>
                        <Pressable style={{...styles.button, backgroundColor: colors.primary, alignSelf: 'flex-end'}}
                                    onPress={()=>setModalVisible((prev)=>{return(!prev)})}
                        >
                            <Text style={{color: styles.text}}>Record</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        <Pressable onPress={()=>setModalVisible(true)} style = {{...styles.press}}>
            <Text style={{color: colors.text, fontSize: 11, fontWeight: 'bold'}}>Record</Text>
        </Pressable>
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
        borderWidth: 0.25,
        borderRadius: 21,
        paddingHorizontal: 30,
        alignContent:'center',
        alignSelf: 'flex-end',
        fontWeight: 'bold',
    },
    press: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,  
    }
  }); 