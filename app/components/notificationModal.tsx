import { FC, ReactElement } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type NotificationPorpsType ={
    visible:boolean,
    closeModal:()=>void,
    messageType:string
}

const NotificationModal:FC<NotificationPorpsType> =({visible, closeModal, messageType}):ReactElement=>{
    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
            backdropColor='red'
            statusBarTranslucent ={true}
        >
            <View style={Style.modalContainer}>
                <View style={Style.modalBox}>
                    <Text>{messageType ==='added' ? 'The move has been added to the favorite.':'The movie has been removed from favorite'}</Text>

                    <TouchableOpacity style={Style.modalButton} onPress={closeModal}>
                        <Text style={[Style.text]}>Okay</Text>
                    </TouchableOpacity>
                </View>
             
            </View>
            
        </Modal>
    )
}

const Style = StyleSheet.create({
    modalContainer:{
        backgroundColor:'#515151',
        textAlign:'center',
        alignContent:'center',
        justifyContent:'center',
        flex:1,
        opacity:.9
    },
    modalBox:{
        backgroundColor:'#ffffff',
        textAlign:'center',
        width:'90%',
        marginLeft:'5%',
        padding:20,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    modalButton:{
        width:'100%',
        backgroundColor:'#e0aaff',
        marginTop:20,
        padding:10,
        borderRadius:10,
       flexDirection:'row',
       justifyContent:'center'
    },
    text:{
        
        fontSize:12,
        fontWeight:600
    },
})

export default NotificationModal