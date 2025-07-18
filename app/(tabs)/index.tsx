import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ErrorView from '../components/errorView';
import Header from '../components/header';
import Loader from "../components/loader";
import MovieView from '../components/movieView';
import { movieSchema } from "../interfaces/interface";
import { fetchMovieData } from "../services/api";
import useFetch from "../services/useFetch";

const Home =()=>{

    const {data, loading, error} = useFetch(()=>fetchMovieData<movieSchema[]>());


    return(
        <SafeAreaView>
            <View style={Style.mainView}>
                <Header />
                <View>
                    <Text style={Style.pageTitle}>Popular movies</Text>
                </View>
                <View>
                {error && <ErrorView /> }                
                {!data && loading && <Loader />}
                {data && Array.isArray(data) && 
                    <FlatList 
                        data={data} 
                        numColumns={3} 
                        keyExtractor={(item)=>item.id.toString()}
                        columnWrapperStyle={{
                            justifyContent:'flex-start',
                            gap:10,
                            paddingRight:5,
                            marginBottom:10
                        }}
                        renderItem={({item})=>(
                            <MovieView 
                                movie={item}
                            />
                        )}/>
                }
              
                </View>
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
    pageTitle:{
        color:"#FFFFFF",
        fontWeight:600,
        fontSize:16,
        paddingVertical:10
    }
})

export default Home;