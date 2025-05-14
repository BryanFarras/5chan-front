import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import NewPost from "./NewPost";
import axios from "axios";
import Timestamp from "react-timestamp";

function PostGrid({posts}) {

    return (
        <main className='bg-green-300 w-screen min-h-screen absolute flex flex-col items-center justify-center'>
            {
                posts.map((post) => {
                    return (
                        <Post 
                            key={post.id}
                            post_id={post.id}
                            content={post.content}
                            image={post.image_url}
                            created_at={post.created_at}
                            parent_id={post.parent_id}
                            creator_id={post.creator_id}
                        />
                    )
                })
            }
        </main>
    )
}

function Post({post_id, content, image, creator_id, created_at}) {
    const [user, setUser] = useState({});

    const [replies, setReplies] = useState([]);

    const getReplies = async () => {
        const response = await axios.get(`/post/${post_id}`);
        setReplies(response.data.payload);
    };

    useEffect(() => {
        getReplies();
    }, []);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    }, []);

    return (
        <>
        <section className="
                    relative
                    content-center
                    w-full sm:w-2/3
                    p-2 m-1 
                    bg-green-200 border-1 border-green-500
        ">
            <div className="relative my-2">
                <span className="text-blue-900">
                    {"Anonymous"}
                    {
                        <Timestamp relative date={created_at}
                            className="text-gray-500 m-2"
                        />
                    }
                {
                    creator_id == user?.id &&
                    <button className="absolute right-2 text-red-500">
                        Delete
                    </button>
                }
                </span>
            </div>
            <div className="relative h-full">
                {image && <img src={image} className="float-left w-1/3 m-1"/>}
                <p className="mx-2 text-black text-md whitespace-pre-line">{content}</p>
                {
                replies.map((post) => {
                    if (!post || !post.id) return null;
                    return (
                        <Post 
                            key={post.id}
                            post_id={post.id}
                            content={post.content}
                            image={post.image_url}
                            created_at={post.created_at}
                            parent_id={post.parent_id}
                            creator_id={post.creator_id}
                        />
                    )
                })
            }
            </div>
            <Popup trigger={
                <button className="relative bg-green-300 m-1 p-1 border-black border-1 text-blue-900 hover:bg-green-400 hover:cursor-pointer">
                    Reply
                </button>
            }
                position="bottom left"
            >
                    <NewPost 
                        parent={post_id}
                    />
            </Popup>
            
        </section>
        </>
    )
}


export default PostGrid;