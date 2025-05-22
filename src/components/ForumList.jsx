import { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';

function ForumList() {
    const [forums, setForums] = useState([]);
    const [newForum, setNewForum] = useState({ title: '', description: '' });

    const fetchForums = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            let response;
            
            if (user?.id) {
                response = await axios.get('/forum');
            } else {
                response = await axios.get('/forum');
            }
            
            setForums(response.data.payload);
        } catch (error) {
            console.error("Error fetching forums:", error);
        }
    };

    const createForum = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) throw new Error('Must be logged in to create forum');

            await axios.post('/forum', {
                ...newForum,
                owner: user.id
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            
            setNewForum({ title: '', description: '' });
            fetchForums();
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchForums();
    }, []);

    return (
        <div className="bg-white border border-gray-300 shadow-lg w-64">
            <div className="p-4 bg-green-100 border-b border-gray-300">
                <h2 className="text-xl font-bold mb-4">Forums</h2>
                <Popup 
                    trigger={
                        <button className="w-full bg-green-500 text-white p-2 border border-green-600">
                            Create Forum
                        </button>
                    }
                    position="right center"
                >
                    <form onSubmit={createForum} className="bg-white p-4 border border-green-500 shadow-lg z-50">
                        <input
                            type="text"
                            placeholder="Forum Title"
                            value={newForum.title}
                            onChange={(e) => setNewForum({...newForum, title: e.target.value})}
                            className="w-full p-2 mb-2 border"
                        />
                        <textarea
                            placeholder="Description"
                            value={newForum.description}
                            onChange={(e) => setNewForum({...newForum, description: e.target.value})}
                            className="w-full p-2 mb-2 border"
                        />
                        <button type="submit" className="w-full bg-green-500 text-white p-2 border border-green-600">
                            Create
                        </button>
                    </form>
                </Popup>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
                <button
                    onClick={() => {
                        localStorage.removeItem('currentForum');
                        window.location.reload();
                    }}
                    className="w-full text-left p-3 hover:bg-green-100 border-b border-gray-200"
                >
                    General (No Forum)
                </button>
                {forums.map(forum => (
                    <button
                        key={forum._id}
                        onClick={() => {
                            localStorage.setItem('currentForum', forum._id);
                            window.location.reload();
                        }}
                        className="w-full text-left p-3 hover:bg-green-100 border-b border-gray-200"
                    >
                        <h3 className="font-semibold">{forum.title}</h3>
                        <p className="text-sm text-gray-600">{forum.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ForumList;
