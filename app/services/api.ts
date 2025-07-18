
const headers = {
    'accept':'application/json',
    Authorization:`Bearer ${process.env.EXPO_PUBLIC_MOVIE_TOKEN }`
}

export const fetchMovieData = async <T>(query:string):Promise<T>=>{

    try{
        const endPoint = query ? query : '/discover/movie?sort_by=popularity.dec' 
        const url: URL = new URL(`${process.env.EXPO_PUBLIC_BASE_URL }${endPoint}`);
        const response = await fetch(url, {method:'GET', headers});
        if(!response.ok){
            
            throw new Error('Unable to fetch movies')
        }
        const data = await response.json();  
        console.log(data)
    
        return data.results || data;

    }catch(e){
        throw new Error('error')
    }
    
}

