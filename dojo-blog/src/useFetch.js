import { useState , useEffect} from "react";

const useFetch = (url) => {

    const [data,setData] = useState(null)
    const [isPending,setIspending] = useState(true)
    const [error,setError] = useState(null)

    useEffect(() => {

        const abortconst=new AbortController();
        setTimeout(() => {
            fetch(url , {signal : abortconst.signal})
            .then(res => {
                if(!res.ok)
                {
                    throw Error("couldn't fetch data from resources url");
                }
                return res.json();
            })        
            .then(data => {
                setData(data);
                setIspending(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === 'AbortError')
                {
                    console.log('fetch aborted');
                }
                else 
                {
                    setError(err.message);
                    setIspending(false);
                }
            })
        }, 500);

        return () => abortconst.abort();
    } , [url])
    
    return {data,isPending,error}
} 

export default useFetch;