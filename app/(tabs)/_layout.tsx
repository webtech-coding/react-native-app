import { Tabs } from "expo-router";
import { StyleSheet } from 'react-native';
import TabIcon from '../components/tabIcons';

const TabLayout =()=>{
    const {Screen} = Tabs

    return(
        <Tabs screenOptions={{headerShown:false, tabBarActiveTintColor:'#0076bf', tabBarStyle:Style.tabBackground}}>
            <Screen 
                name="index"
                options={{
                    title:'Home',
                    tabBarShowLabel:false,
                    tabBarItemStyle:Style.tabBarMenu,
                    tabBarIcon:({focused})=><TabIcon focused={focused} icon="home"/>,
                   
                }}
            />
            <Screen 
                name='saved' 
                options={{
                    tabBarShowLabel:false,                    
                    tabBarIcon:({focused})=><TabIcon focused={focused} icon="bookmark"/>,
                    tabBarBadge:3
                }}
            />
            <Screen
                name='search' 
                options={{
                    tabBarShowLabel:false,
                    tabBarIcon:({focused})=><TabIcon focused={focused} icon="search"/>,
                }}
            />
            <Screen 
                name='profile' 
                options={{
                    tabBarShowLabel:false,
                    tabBarIcon:({focused})=><TabIcon focused={focused} icon="user"/>,
                }}
            />
        </Tabs>
    )
}

const Style = StyleSheet.create({
    tabBackground:{
        backgroundColor:'#10002b',
        display:'flex',
        flexDirection:'row-reverse',
        height:40,        
        borderRadius:50,
        color:"#ffffff",
        position:'absolute',
        bottom:30,
        width:'90%',
        marginLeft:'5%',
        margin:'auto',
       borderColor:'#10002b'
    },
    tabBarMenu:{
        display:'flex',
        borderRadius:50,
        color:'#ffffff',
       
    },
})

export default TabLayout;