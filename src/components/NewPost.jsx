import axios from "axios";
import { useState } from "react";


function NewPost({parentId}) {
    const [image, setImage] = useState(null);
    const [text, setText] = useState(""); // Changed from content to text to match schema

    const [loading, setLoading] = useState(false);

    const onFileChange = (event) => {
        console.log(event.target.files);
        setImage(event.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        setLoading(true);

        // Required fields
        if (text) formData.append("text", text);
        if (image) formData.append("file", image);
        if (parentId) formData.append("parent_id", parentId);

        // Get user from localStorage
        const userJson = localStorage.getItem("user");
        const user = userJson ? JSON.parse(userJson) : null;
        
        // Add authentication header if user exists
        const headers = {};
        if (user?.token) {
            headers.Authorization = `Bearer ${user.token}`;
            formData.append("owner", user.id);
        }

        // Add forum if exists
        const currentForum = localStorage.getItem('currentForum');
        if (currentForum) {
            formData.append("forum", currentForum);
        }

        try {
            await axios.post('/post', formData, { 
                headers,
                withCredentials: true 
            });
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.error("Error creating post:", error);
            alert(error.response?.data?.message || "Failed to create post");
            setLoading(false);
        }
    }


    return (
        <form className="
                flex flex-col items-center justify-center
                text-white
                w-100 h-100
                bg-green-800 border-2 border-black
            "
        >
            <textarea 
                className="
                    text-black
                    p-1
                    static
                    w-full
                    h-full
                    bg-green-200
                "
                type="text" 
                onChange={({target}) => setText(target.value)} // Changed from setContent to setText
                value={text}
            />
            <input 
                className="
                    bg-white
                    text-black
                    w-1/2 static
                    mt-3
                    cursor-pointer
                "
                type="file" 
                name="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={onFileChange}
            />
            <button onClick={handleSubmit}
                    className=
                    {
                        "border-black border-2 text-white w-1/2 static m-2 hover:bg-green-600 " + (
                            loading ? "cursor-progress bg-green-600" : "cursor-pointer bg-green-900"
                        )
                    }
                disabled={loading}
            >
                Post
            </button>
            
        </form>

    )
}

export default NewPost;