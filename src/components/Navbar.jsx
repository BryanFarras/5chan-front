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

    return (
        <nav className="flex flex-col items-center bg-green-500 p-2 sticky top-0 z-10">
            <ul className="flex flex-row space-x-4">
                <li className="text-white hover:text-gray-200 cursor-pointer">Technology</li>
                <li className="text-white hover:text-gray-200 cursor-pointer">Humour</li>
                <li className="text-white hover:text-gray-200 cursor-pointer">Science</li>
                <li className="text-white hover:text-gray-200 cursor-pointer">Music</li>
                <li className="text-white hover:text-gray-200 cursor-pointer">Art</li>
                <li className="text-white hover:text-gray-200 cursor-pointer">Movie</li>
                <li className="text-white hover:text-gray-200 cursor-pointer">Place</li>
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