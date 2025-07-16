import { useEffect, useState } from "react"

const useFetch = <T>(fetchFunction:()=>Promise<T>, autoFetch=true)=>{
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(()=>{
        console.log('what is happeining', autoFetch)

        if(autoFetch){      
            console.log('what is happeining')      
            fetchData()
        }
    },[])

    const fetchData = async ()=>{
    
        try {
            resetState();
            setLoading(true);
            console.log("The data comes from here")
            const data = await fetchFunction();
            console.log(data)
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

    return { data, loading, error, refecth: fetchData }

}

export default useFetch;