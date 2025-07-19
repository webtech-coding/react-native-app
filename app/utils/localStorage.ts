import AsyncStorage from '@react-native-async-storage/async-storage';

const FAV_MOVIE_KEY = "favMovie"

export const storeFavMovie=async (value:string)=>{
    console.log("THE VALUE", value)
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
        console.log(storedMovies)        
        
        await AsyncStorage.setItem(FAV_MOVIE_KEY, JSON.stringify(storedMovies));

    }catch(error) {
        console.log(error)
        console.log('unable to bookmark');
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