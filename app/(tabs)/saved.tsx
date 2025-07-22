import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "../components/movieCard";
import { movieSchema } from "../interfaces/interface";
import { fetchMovieData } from "../services/api";
import { getFavMovies } from "../utils/localStorage";

const Saved =()=>{

    const [allFavMovies, setAllFavMovies] = useState<movieSchema[] | []>([])

    useEffect(()=>{
        const fetchAllMovies =async ()=>{
            try {
                const movieIds = await getFavMovies();
               
                if(movieIds){
                    const allMovieData =await Promise.all(movieIds.map(id=>fetchMovieData<movieSchema>(`/movie/${id}&include_video=true`)))
                    if(allFavMovies && Array.isArray(allMovieData)){
                        setAllFavMovies(allMovieData || []);
                    }
                }
            } catch (error) {
                setAllFavMovies([])
            }
        }
        fetchAllMovies();
    },[])

    return(
        <SafeAreaView>
            <View style={Style.container}>
                <Text style={Style.pageTitle}>Favorites</Text>
                <View >
                    {
                        allFavMovies.length===0 && (
                            <Text>No movie added to the favourite list</Text>
                        )
                    }
                    <ScrollView>
                        {
                                allFavMovies.map((movie, index)=>{
                                return <MovieCard movie={movie} key={movie.id} index={index}/>
                                })
                        }
                        
                    </ScrollView>
                </View>
            </View>    
            
        </SafeAreaView>
    )
}

const Style = StyleSheet.create({
    container:{
        backgroundColor:"#2b2d42",
        minHeight:'100%',
        padding:10,
        marginVertical:10
    },
    pageTitle:{
        color:"#FFFFFF",
        fontWeight:600,
        fontSize:16,
        paddingVertical:10
    },
})

export default Saved;