import PostGrid from "../components/Post";
import axios from "axios";
import { useState, useEffect } from "react";
import NewPost from "../components/NewPost";
import Popup from "reactjs-popup";
import Navbar from "../components/Navbar";

const posts = [
    {
        id: 1,
        text: "Hello World",
        image_url: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
        owner: "User1",
        replies: [],
    },
    {
        id: 2,
        text: "Hello World",
        image_url: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
        owner: "User2",
        replies: [],
    },
    {
        id: 3,
        text: "Hello World",
        image_url: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
        owner: "User3",
        replies: [],
    },
    {
        id: 4,
        text: "Hello World",
        image_url: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
        owner: "User3",
        replies: [],
    },
    {
        id: 5,
        text: "Hello World",
        image_url: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
        owner: "User3",
        replies: [],
    },
]

function Home() {

    // const [posts, setPosts] = useState([]);

    // const getPosts = async () => {
    //     const response = await axios.get("/post");
    //     setPosts(response.data.payload);
    // };

    // useEffect(() => {
    //     getPosts();
    // }, []);
    
    return (
        <div >
            <header className="bg-green-500 sticky top-0">
                <Navbar />
            </header>
            <PostGrid 
                posts={posts}
            />
        </div>
    )
}

export default Home;