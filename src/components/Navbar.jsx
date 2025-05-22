import Popup from "reactjs-popup";
import NewPost from "./NewPost";
import LoginRegister from "./LoginRegister";
import ForumList from "./ForumList";
import { useState, useEffect } from 'react';

function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userJson = localStorage.getItem('user');
        if (userJson) {
            setUser(JSON.parse(userJson));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.reload();
    };

    return (
        <nav className="flex justify-between items-center bg-green-500 p-2 sticky top-0 z-50">
            <Popup
                trigger={
                    <button className="bg-green-600 text-white px-4 py-2 border border-green-700">
                        Forum
                    </button>
                }
                position="bottom left"
                nested
                closeOnDocumentClick
            >
                <ForumList />
            </Popup>

            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className="text-white">{user.username}</span>
                        <Popup trigger={
                            <button className="bg-green-200 px-4 py-2 border border-green-300">
                                Create Post
                            </button>
                        }>
                            <NewPost />
                        </Popup>
                        <button 
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 border border-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Popup trigger={
                            <button className="bg-green-400 px-4 py-2 border border-green-500">
                                Login/Register
                            </button>
                        }>
                            <LoginRegister />
                        </Popup>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;