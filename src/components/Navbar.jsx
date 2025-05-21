import Popup from "reactjs-popup";
import NewPost from "./NewPost";
import LoginRegister from "./LoginRegister";
import { useState } from 'react';

function Navbar() {
    const [isAnonymous, setIsAnonymous] = useState(false);

    const handleAnonymousLogin = () => {
        setIsAnonymous(true);
        localStorage.setItem('user', JSON.stringify({ 
            name: 'Anonymous', 
            id: `anon-${Date.now()}`,
            isAnonymous: true 
        }));
    };

    const handleTopicClick = (topic) => {
        localStorage.setItem('currentTopic', topic.toLowerCase());
        // You can add additional logic here to filter posts
    };

    return (
        <nav className="flex flex-col items-center bg-green-500 p-2 sticky top-0 z-10">
            <ul className="flex flex-row space-x-4">
                {['Technology', 'Humor', 'Science', 'Music', 'Art', 'Movie', 'Place'].map(topic => (
                    <li 
                        key={topic}
                        onClick={() => handleTopicClick(topic)}
                        className="text-white hover:text-gray-200 cursor-pointer"
                    >
                        {topic}
                    </li>
                ))}
            </ul>
            <div className="flex row">
                <Popup trigger={<button className="bg-green-200 m-2 p-2 cursor-pointer flex justify-center">
                    Create Post
                </button>}>
                    <NewPost />
                </Popup>
                <Popup trigger={<button className="bg-green-400 m-2 p-2 cursor-pointer flex justify-center border-2">
                    Login/Register
                </button>}>
                    <LoginRegister />
                </Popup>
                <button 
                    onClick={handleAnonymousLogin}
                    className="bg-gray-300 m-2 p-2 cursor-pointer flex justify-center border-2 hover:bg-gray-400"
                >
                    Continue as Anonymous
                </button>
            </div>
        </nav>
    )
}

export default Navbar;