import AntDesign from '@expo/vector-icons/AntDesign';
import Icon from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { movieSchema } from "../interfaces/interface";

type movieCardProps={
    movie:movieSchema, 
    index:number
}

const MovieCard:FC<movieCardProps> =({movie, index})=>{
    const router = useRouter();

    const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/200x200/0076bf/FFFFFF/png';
    return(
        <TouchableOpacity onPress={()=>router.navigate(`/movie/${movie.id}`)}>
            <View  style={[Style.card, index % 2 ===0 ? {}: Style.cardReverse ]}>
                <Image source={{uri:poster}} style={Style.posterImage}/>
                <View style={Style.movieDetail}>
                    <View style={Style.titleContainer}>  
                        <Text style={Style.text}>{movie.title}</Text>
                        <Icon name="bookmark" color="#ffd60a" style={{marginRight:5}} />
                    </View>
                    <View style={Style.movieReview}>
                        <AntDesign name="star" color="#ffd60a" style={{marginRight:5}} />
                        <Text style={[Style.text]}>{movie.vote_average.toFixed(1)}</Text>
                    </View>
                    <View style={Style.movieReviewContainer}>
                        <Text style={[Style.text, Style.movieDetailText]} numberOfLines={3} ellipsizeMode='tail'>
                            {movie.overview}
                        </Text>
                    </View>
                </View>
            </View> 
        </TouchableOpacity>
    )
}

const Style = StyleSheet.create({
    posterImage:{
        width:100,
        height:100,
       
    },
    card:{
        flexDirection:'row',
        marginBottom:10,
        borderColor:'#ffffff',
        padding:5,
        borderWidth:.2,
        maxWidth:'100%',
        borderRadius:5,
    },
    cardReverse:{
        flexDirection:'row-reverse',
        justifyContent:'flex-start'

    },
    text:{
        color:"#dad7cd",
        fontSize:12,
        fontWeight:600
    },
    movieDetail:{
        paddingHorizontal:10,
        maxWidth:'100%'
    },
    movieReview:{
        flexDirection:'row',
        paddingVertical:10
    },
    movieDetailText:{
        fontWeight:300,
        maxWidth:'100%',
        flexShrink:1
    },
    movieReviewContainer:{       
        paddingRight:20,
        maxWidth:250,        
    },
    titleContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    }

})
export default MovieCard