import axios from "axios";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";


function NewPost({parent}) {
    console.log(parent);
    const [image, setImage] = useState(null);
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    const onFileChange = (event) => {
        console.log(event.target.files);
        setImage(event.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        setLoading(true);

        if (content != null) {
            formData.append(
                "content",
                content
            )
        }

        if (parent != null) {
            formData.append(
                "parent_id",
                parent
            )
        }

        if (image != null) {
            formData.append(
                "file",
                image
            )
        }

        console.log(formData);
        axios.post("/post/new", formData)
            .then(response => {
                location.reload();
            })
            .catch(error => {
                setLoading(false);
            })
        
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
                onChange={({target}) => setContent(target.value)}
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