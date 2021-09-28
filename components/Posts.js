import { collection, getDocs,query,orderBy,onSnapshot } from "firebase/firestore"
import { useEffect,useState } from "react"
import Post from "./Post"
import { db, storage } from "../firebase";
function Posts() {
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        retrivePosts();
    },[])
    const retrivePosts=async()=>{
            const querySnapshot= await getDocs(query(collection(db, "posts")),orderBy("timestamp","desc"))
            querySnapshot.forEach((doc) => {
            setPosts(prev=>[...prev,{id:doc.id,...doc.data()}])
            
            });
        };
    useEffect(()=>{
        const unsub = onSnapshot(collection(db, "posts"), (docs) => {
            setPosts([])
            docs.forEach((doc) => {
            setPosts(prev=>[...prev,{id:doc.id,...doc.data()}])
            });
        });
        return unsub;
    },[])
    //console.log(posts)
    return (
        <div>
            {posts?.map(post=>(
                <Post
                    key={post.id}
                    name={post.name}
                    message={post.message}
                    email={post.email}
                    timestamp={post.timestamp}
                    image={post.image}
                    postImage={post.postImage}
                 />
            ))}
        </div>
    )
}

export default Posts
