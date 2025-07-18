import { useEffect, useState } from "react"
import { fetchMovieData } from "./api"

type UseFetchResult<T> ={
    data: T |  null,
    loading: boolean,
    error:Error | null,
    fetchData:(url:string)=> Promise<void>
}

const useFetch =<T>(queryString:string, autoFetch=true):UseFetchResult<T>=>{
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(()=>{      
        if(autoFetch){    
            fetchData(queryString)
        }
    },[])

    const fetchData = async (fetchQuery:string = queryString)=>{
      
        try {
            resetState();
            setLoading(true);
            const data:T = await fetchMovieData<T>(fetchQuery);
            setData(data);

        } catch (error) {
            setError(error instanceof Error ? error : new Error('Error in fetching the data'))
        }finally{
            setLoading(false)
        }
    }

    const resetState =()=>{
        setData(null)
        setError(null)
    }

    return { data, loading, error, fetchData }

}

export default useFetch;