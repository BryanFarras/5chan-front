import PostGrid from "../components/Post";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function Home() {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            // Get public posts if no forum selected
            const response = await axios.get('/post');
            setPosts(response.data.payload || []);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setPosts([]);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);
    
    return (
        <div>
            <Navbar />
            <PostGrid posts={posts} />
        </div>
    )
}

export default Home;