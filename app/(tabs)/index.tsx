import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../components/header';
import { movieSchema } from "../interfaces/interface";
import { fetchMovieData } from "../services/api";
import useFetch from "../services/useFetch";

const Home =()=>{

    const {data, loading, error} = useFetch(()=>fetchMovieData<movieSchema[]>());

    return(
        <SafeAreaView>
            <View style={Style.mainView}>
                <Header />
                <ScrollView 
                    fadingEdgeLength={20} 
                    showsHorizontalScrollIndicator={false} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={Style.scrollViewContainer}
                >
                {error &&
                    <View style={Style.errorContainer}>
                        <MaterialIcons name="error" color="#ffffff" size={24} style={{marginRight:10}}/>
                        <Text style={{color:"#ffffff"}}>Error in loading movies.</Text>
                    </View>
                }                
                {!data && loading &&
                    <View style={Style.indicatorContainer}>
                        <ActivityIndicator size='large' color='#ffffff'/>
                    </View>
                }
                {data && Array.isArray(data) && 
                    <FlatList data={data} renderItem={({item})=><Text>{item.title}</Text>}/>
                }
              
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const Style = StyleSheet.create({
    mainView:{
        backgroundColor:"#2b2d42",
        minHeight:'100%',
        padding:10,
        
    },
    scrollViewContainer:{
        minHeight:'100%'
    },
    indicatorContainer:{
        height:'50%',
        alignItems:'center',
        justifyContent:'center'
    },
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

export default Home;