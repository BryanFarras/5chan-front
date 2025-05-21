import axios from "axios";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";


function NewPost({parentId}) {
    const [image, setImage] = useState(null);
    const [text, setText] = useState(""); // Changed from content to text to match schema

    const [loading, setLoading] = useState(false);

    const onFileChange = (event) => {
        console.log(event.target.files);
        setImage(event.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const headers = {}; // Initialize headers object
        setLoading(true);

        // Add the parent_id for replies
        if (parentId) {
            formData.append("parent_id", parentId);
            console.log("Adding parent_id:", parentId);
        }

        if (text) {
            formData.append("text", text);
        }

        if (image) {
            formData.append("file", image);
        }

        // Add topic if available
        const topic = localStorage.getItem('currentTopic');
        if (topic) {
            formData.append("topic", topic.toLowerCase());
        }

        // Handle auth and owner
        const user = localStorage.getItem("user");
        if (user) {
            const userData = JSON.parse(user);
            // Only append owner if not anonymous
            if (!userData.isAnonymous) {
                formData.append("owner", userData.id);
            }
            if (userData.token) {
                headers.Authorization = `Bearer ${userData.token}`;
            }
        }

        // Debug logs
        console.log("Headers:", headers);
        console.log("Form data entries:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        axios.post('/post/new', formData, { headers })
            .then(response => {
                console.log("Post created:", response.data);
                setLoading(false);
                location.reload();
            })
            .catch(error => {
                console.error("Error creating post:", error.response?.data || error);
                alert("Failed to create post: " + (error.response?.data?.message || error.message));
                setLoading(false);
            });
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