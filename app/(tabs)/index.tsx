import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ErrorView from '../components/errorView';
import Header from '../components/header';
import Loader from "../components/loader";
import MovieView from '../components/movieView';
import { movieSchema } from "../interfaces/interface";
import useFetch from "../services/useFetch";

const Home =()=>{

    const {data, loading, error, fetchData} = useFetch<movieSchema>('/discover/movie?sort_by=popularity.dec');
    const [searchText, setSearchText] = useState<string>('')
    const [searchPrestine, setSearchPristine] =useState<boolean>(true)

    useEffect(()=>{
        if(!searchText && searchPrestine)return

        const debounce = setTimeout(()=>{
            const url = searchText ? `search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`:'/discover/movie?sort_by=popularity.dec';
            fetchData(url)
        },500)

        return ()=>clearTimeout(debounce)

    },[searchText])

    return(
        <SafeAreaView>
            <View style={Style.mainView}>
                <Header 
                    onSearchTextChange={(text:string)=>{
                        setSearchText(text)
                        setSearchPristine(false)
                    }}
                />
                <View>
                    <Text style={Style.pageTitle}>{searchText ? `Search result for: ${searchText}`: 'Popular movies'}</Text>
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
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            !error && !loading ?
                                (
                                    <View >
                                        <Text style={Style.text}>No result found for your search</Text>
                                    </View>
                                ):null
                            
                            }
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
    },
    text:{
        color:"#dad7cd",
        fontSize:12,
        fontWeight:600

    },
})

export default Home;