import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import NewPost from "./NewPost";
import axios from "axios";
import Timestamp from "react-timestamp";

function PostGrid({posts}) {
    return (
        <main className='bg-green-300 w-screen min-h-screen absolute flex flex-col items-center justify-center'>
            {posts.map((post) => (
                <Post 
                    key={post._id}
                    post={post}
                />
            ))}
        </main>
    )
}

function Post({post}) {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    }, []);

    return (
        <section className="relative content-center w-full sm:w-2/3 p-2 m-1 bg-green-200 border-1 border-green-500">
            <div className="relative my-2">
                <span className="text-blue-900">
                    {"Anonymous"}
                    {post.createdAt && 
                        <Timestamp relative date={post.createdAt}
                            className="text-gray-500 m-2"
                        />
                    }
                    {post.owner === user?.id &&
                        <button className="absolute right-2 text-red-500">
                            Delete
                        </button>
                    }
                </span>
            </div>
            <div className="relative h-full">
                {post.image_url && <img src={post.image_url} className="float-left w-1/3 m-1"/>}
                <p className="mx-2 text-black text-md whitespace-pre-line">{post.text}</p>
                {/* Render replies recursively */}
                {post.replies?.map((reply) => (
                    <Post key={reply._id} post={reply} />
                ))}
            </div>
            <Popup trigger={
                <button className="relative bg-green-300 m-1 p-1 border-black border-1 text-blue-900 hover:bg-green-400 hover:cursor-pointer">
                    Reply
                </button>
            }
                position="bottom left"
            >
                <NewPost parentId={post._id} />
            </Popup>
        </section>
    )
}


export default PostGrid;