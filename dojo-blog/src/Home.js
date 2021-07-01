import BlogList from './BlogsList';
import useFetch from './useFetch';


const Home = () => {

    const {data,isPending,error} = useFetch('http://localhost:8000/blogs');
    
    
    return (  
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>loading...</div>}
            {data && <BlogList blogs={data} title="All blogs!" />} 
        </div>
    );
}
 
export default Home;