import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from 'react-native';

const ErrorView =()=>{
   return(
    <View style={Style.errorContainer}>
        <MaterialIcons name="error" color="#ffffff" size={24} style={{marginRight:10}}/>
        <Text style={{color:"#ffffff"}}>Error in loading movies.</Text>
    </View>
   )
}

const Style = StyleSheet.create({
    errorContainer:{
        width:'100%',
        backgroundColor:'#d90429',
        marginTop:50,
        padding:10,
        borderRadius:5,
        color:"#ffffff",
        flexDirection:'row',
        alignItems:'center'
    },
})

export default ErrorView;