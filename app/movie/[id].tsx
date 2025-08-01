import AntDesign from '@expo/vector-icons/AntDesign';
import Icon from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NotificationModal from '../components/notificationModal';


import { SafeAreaView } from "react-native-safe-area-context";

import ErrorView from "../components/errorView";
import Loader from "../components/loader";
import { MovieDetailSchema } from "../interfaces/interface";
import useFetch from "../services/useFetch";
import { getFavMovies, removeFavMovie, storeFavMovie } from '../utils/localStorage';

const MovieDetail=()=>{
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const url = `/movie/${id}&include_video=true`;

    const {data, loading, error, fetchData:fetchMovieWithId } = useFetch<MovieDetailSchema>(url)
    const [movieIsFav, setIMovieIsFav] = useState<boolean>(false);
    const [notificationModalOpen, setNotificationModalOpen] = useState<boolean>(false);

    useEffect(()=>{
        if(!id)return
        fetchMovieWithId(url)
    },[id])

    useEffect(()=>{
        const movieIsFaved = async ()=>{
            if(!id)return false
            const allFavMovies:string[] = await getFavMovies();
            
            setIMovieIsFav(allFavMovies && allFavMovies.includes(id.toString()));  
        }
        movieIsFaved() 
    },[data]) 

    const toggleFavMovie =()=>{
        setNotificationModalOpen(true);
        if(movieIsFav){
            removeFavMovie(id.toString());
            setIMovieIsFav(false)
            
        }else{
            storeFavMovie(id.toString());
            setIMovieIsFav(true);
        }
    }



    return(
        <SafeAreaView>
            <View style={Style.container}>
                {error && <ErrorView /> }                
                {!data && loading && <Loader />}
                {notificationModalOpen && (
                    <NotificationModal 
                        visible={true}
                        messageType={movieIsFav ? 'added':'removed'}
                        closeModal={()=>setNotificationModalOpen(false)}
                    />
                )}
                {data && !error && (
                    <View style={{height:'100%', justifyContent:'flex-start'}}>
                        <Image 
                            source={{ uri:data.backdrop_path ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}` : 'https://placehold.co/200x200/0076bf/FFFFFF/png'}} 
                            resizeMode="cover" 
                            style={Style.backdropeImage}
                        />
                        
                        <TouchableOpacity style={Style.backArrow} onPress={()=>router.back()}>
                            <AntDesign name='arrowleft'  color={"#ffffff"}/>
                        </TouchableOpacity>
                        
                        <View style={Style.movieTitleContainer}>
                            <Text style={Style.movieTitleText}>{data.title}</Text>
                        </View>
                        <View style={Style.movieDetail}>
                            <Text style={[Style.text]}> {data.release_date.split('-')[0]}</Text>
                            <View style={[Style.flexRow]}>
                                {
                                    data.genres && data.genres.map(genre=><Text key={genre.name} style={[Style.text, Style.genreText]}>{genre.name} |</Text>)
                                }
                            </View>
                            <View style={[Style.flexRow]}>
                                <AntDesign name="clockcircleo" color="#ffffff" style={{marginRight:5}}/>
                                <Text style={[Style.text]}>{data.runtime} min</Text>
                            </View>
                            <View style={[Style.flexRow]}>
                                <AntDesign color="#ffd60a" name='star' size={12} style={{marginRight:5}}/>
                                <Text style={[Style.text]}>{data.vote_average.toFixed(1)}</Text>
                            </View>
                        </View>
                        <View style={Style.movieOverview}>
                            <Text style={Style.movieOverviewText}>{data.overview}</Text>
                        </View>
                        <TouchableOpacity style={[Style.bookmark]} onPress={toggleFavMovie}>
                            <Icon name='bookmark' size={18} color="#ffffff" style={{marginRight:10}}/>
                            <Text style={[Style.text, {color:'#ffffff'}]}> { movieIsFav ? 'Remove favourite':'Add to favourite' }</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            
        </SafeAreaView>
    )
}

const Style = StyleSheet.create({
    container:{
        backgroundColor:"#2b2d42",
        minHeight:'100%',
       
    },
    backdropeImage:{
        width:'100%',
        height:200
    },
    movieTitleContainer:{
        position:'absolute',
        top:170,
        padding:10,
        backgroundColor:'#e0aaff',
        opacity:.9
    },
    movieTitleText:{
        color:"#ffffff",
        fontSize:16,
        fontWeight:600
    },
    movieDetail:{
        flexDirection:'row',
        padding:10,
        justifyContent:'flex-start',
        marginVertical:10,
        width:'100%'
    },
    flexRow:{
        flexDirection:'row',
        marginHorizontal:5,
        alignItems:'center'
    },
    text:{
        color:"#dad7cd",
        fontSize:12,
        fontWeight:600

    },
    genreText:{
        marginRight:5
    },
    movieOverview:{
        padding:10,
    },
    movieOverviewText:{
        lineHeight:20,
        fontSize:14,
        fontWeight:400,
        color:"#dad7cd",
    },
    backArrow:{
        height:35,
        width:35,
        borderColor:"#ffffff",
        backgroundColor:"#e0aaff",
        borderRadius:50,
        borderWidth:1,
        opacity:.8,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        left:5,
        top:5
    },
    bookmark:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#e0aaff',
        padding:10,
        margin:10,
        borderRadius:5
    }
 
})
export default MovieDetail