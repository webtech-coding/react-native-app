import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loader =()=>{
   return(
    <View style={Style.indicatorContainer}>
        <ActivityIndicator size='large' color='#ffffff'/>
    </View>
   )
}

const Style = StyleSheet.create({   
    indicatorContainer:{
        height:'50%',
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Loader;