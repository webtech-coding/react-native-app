import Icon from '@expo/vector-icons/Feather';
import { FC } from 'react';
import { Image, StyleSheet, TextInput, View } from "react-native";

type HeaderProps ={
    onSearchTextChange:(text:string)=>void
}

const Header:FC<HeaderProps> =({onSearchTextChange})=>{


    return(
        <View style={Style.header}>
            <Image source={require('./../../assets/images/logo.jpg')} style={Style.headerImage}/>
            <View style={Style.headerSearch}>
                <TextInput placeholder='Search movies ...' style={Style.headerInput} onChangeText={onSearchTextChange}/>
                <Icon name="search" size={24} color="#e0aaff" style={Style.searchIcon}/>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    header:{
        flexDirection:'row',
        width:'100%'
    },
    headerSearch:{
        borderWidth:1,       
        borderRadius:50,
        flexDirection:'row',
        alignItems:'center',
        flex:1,
        backgroundColor:"#ffffff",
        borderColor:"#e0aaff"
    },
    headerInput:{
        borderRadius:50,
        flex:1,
        height:40,
        padding:5,
        marginLeft:10
    },
    headerImage:{
        height:40,
        width:40,
        borderRadius:50,
        marginRight:10
    },
    searchIcon:{
        marginRight:10
    },
})


export default Header