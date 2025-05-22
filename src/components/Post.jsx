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
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            setUser(JSON.parse(userJson));
        }
    }, []);

    const handleDelete = async () => {
        if (!user?.token) return;

        try {
            await axios.delete(`/post?id=${post._id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete post");
        }
    };

    return (
        <section className="relative content-center w-full sm:w-2/3 p-2 m-1 bg-green-200 border-1 border-green-500">
            <div className="relative my-2">
                <span className="text-blue-900">
                    {post.owner ? post.owner.username : "Anonymous"}
                    {post.createdAt && 
                        <Timestamp relative date={post.createdAt}
                            className="text-gray-500 m-2"
                        />
                    }
                    {(user?.id === post.owner?._id || user?.role === 'admin') && (
                        <button 
                            onClick={handleDelete}
                            className="absolute right-2 text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    )}
                </span>
            </div>
            <div className="relative h-full">
                {post.image_url && <img src={post.image_url} className="float-left w-1/3 m-1" alt="Post"/>}
                <p className="mx-2 text-black text-md whitespace-pre-line">{post.text}</p>
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