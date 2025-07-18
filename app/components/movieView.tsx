import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { movieSchema } from "../interfaces/interface";


type MovieViewProps = {
    movie:movieSchema
}

const MovieView:FC<MovieViewProps> =({movie})=>{
    const router = useRouter();

    const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/200x200/0076bf/FFFFFF/png';

    return(
        <TouchableOpacity style={Style.movieCard} onPress={()=>router.navigate(`/movie/${movie.id}`)}>
            <Image source={{uri:poster}} style={Style.moviePoster} resizeMode="cover"/>
            <Text style={Style.movieTitle} numberOfLines={1} ellipsizeMode='tail'>{movie.title}</Text>
            <View style={[Style.rating, Style.ratingContainer]}>
                <View style={Style.rating}>
                    <AntDesign color="#ffd60a" name='star' size={12} style={{marginRight:5}}/>
                    <Text style={Style.subtext}>{ movie.vote_average.toFixed(1)}</Text>
                    
                </View>
                <View style={Style.rating}>
                    <Text style={Style.subtext}> {movie?.release_date.split('-')[0]}</Text>
                    <Text style={[Style.subtext, {marginLeft:5}]}>| {movie.original_language.toUpperCase()}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const Style = StyleSheet.create({
    movieCard:{
        width:'32%',
        marginBottom:10
    },
    moviePoster:{
        height:200,
        width:'100%'
    },
    movieTitle:{
        color:"#ffffff",
        fontSize:12,
        paddingVertical:5,
        fontWeight:600,
       
    },
    rating:{        
        flexDirection:'row'
    },
    ratingContainer:{        
        justifyContent:'space-between',
    },
    subtext:{
        color:"#ffffff",
        fontSize:12,
        opacity:.6
    }
})
export default MovieView