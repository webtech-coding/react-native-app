import Icon from '@expo/vector-icons/Feather';
import { FC, ReactElement } from "react";
import { StyleSheet, View } from 'react-native';
const img =require( './../../assets/images/icon.png');

type TabIconPropTypes = {
    focused:boolean,
    icon:'home'|'search'|'save' | 'user',    
}

const TabIcon:FC<TabIconPropTypes> =({focused, icon}):ReactElement=>{

    return(
        <View style={focused ? Style.tabBarMenuActive: {}}>
              <Icon name={icon} size={24} color="#ffffff"/>
        </View>
    )
}

const Style  = StyleSheet.create({
    tabBarMenuActive:{
        width:88,
        borderRadius:40,
        height:41,
        backgroundColor:'#e0aaff',
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:5,
    }
})

export default TabIcon;