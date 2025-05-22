import { useState } from 'react';
import axios from 'axios';

function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? '/user/login' : '/user/register';
            const response = await axios.post(endpoint, formData);
            
            const { user, token } = response.data.payload;
            localStorage.setItem('user', JSON.stringify({
                id: user._id,
                username: user.username,
                role: user.roles,
                token
            }));
            
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || "Authentication failed");
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow-lg w-64">
            <h2 className="text-xl mb-4">{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 mb-2 border rounded"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-2 border rounded"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                {!isLogin && (
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full p-2 mb-2 border rounded"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                )}
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            <button 
                className="w-full text-green-500 mt-2"
                onClick={() => setIsLogin(!isLogin)}
            >
                {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
            </button>
        </div>
    );
}

export default LoginRegister;