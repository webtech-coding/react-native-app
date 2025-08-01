import AsyncStorage from '@react-native-async-storage/async-storage';

const FAV_MOVIE_KEY = "favMovie"

export const storeFavMovie=async (value:string)=>{
    try {
        let storedMovies:string[]= []
        storedMovies = await getFavMovies();
        if(storedMovies){
            if(Array.isArray(storedMovies) && storedMovies.length){
                if(!storedMovies.includes(value)){
                    storedMovies.push(value);
                }
            }else{
                storedMovies.push(value)
            }
        }else{
            storedMovies = [value]
        }
        await AsyncStorage.setItem(FAV_MOVIE_KEY, JSON.stringify(storedMovies));

    }catch(error) {
        console.log(error)
    }
}

export const getFavMovies = async ():Promise<string[]>=>{
    try {
       let favMovies: string[] = [];
       const storedMovies = await AsyncStorage.getItem(FAV_MOVIE_KEY);
       if(storedMovies){
            favMovies = JSON.parse(storedMovies)
       }
       return favMovies;
    } catch (error) {
        console.log('unable to get the bookmark')
        return []
    }
}

export const removeFavMovie = async(value:string)=>{
    try {
        let favMovies: string[] = [];
        let storedMovies = await AsyncStorage.getItem(FAV_MOVIE_KEY);
        storedMovies = storedMovies ? JSON.parse(storedMovies) : []
        if(storedMovies && Array.isArray(storedMovies)){
            if(storedMovies.includes(value)){
                favMovies = storedMovies.filter(movie =>movie !==value);
                await AsyncStorage.setItem(FAV_MOVIE_KEY, JSON.stringify(favMovies));
            }
        }
    } catch (error) {
        console.log('Unable to remove from fav movie')
    }
}