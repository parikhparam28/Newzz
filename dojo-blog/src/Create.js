import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {

    const [title , setTitle] = useState('')
    const [body , setBody] = useState('')
    const [author , setAuthor] = useState('')
    const [isPending , setIsPending] = useState(false)
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog={title , body ,author };
        
        fetch('http://localhost:8000/blogs', {
            method : 'POST' , 
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(blog)
        }).then(() => {
            setIsPending(true);
            console.log(body);
            history.push('/');
        })
        
    }

    return (  
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title : </label>
                <input type="text" 
                required
                value={title}
                onChange = {(e) => setTitle(e.target.value)}
                />
                <textarea 
                required
                value={body}
                onChange = {(e) => setBody(e.target.value)}
                />
                <label>Blog Author: </label>
                <select onChange = {(e) => setAuthor(e.target.value)}>
                    <option value="Anonymous">Anonymous</option>
                    <option value="Param Parikh">Param Parikh</option>
                    <option value="Tony Stark">Tony Stark</option>
                    <option value="Elon Musk">Elon Musk</option>
                    <option value="Jeff Bezos">Jeff Bezos</option>
                    <option value="Muskan Maheshwari">Muskan Maheshwari</option>
                </select>          
                {!isPending && <button>Add Blog</button>}
                {isPending && <button>Blog Added :)</button>}
                <p>{title}</p>
                <br/>
                <p>{body}</p>
            </form>
        </div>
    );
}
 
export default Create;