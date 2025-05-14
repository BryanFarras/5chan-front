import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const { username, password, confirmPassword } = formData;

        if (!username || !password) {
            return setMessage('Username and password are required.');
        }

        if (!isLogin && password !== confirmPassword) {
            return setMessage('Passwords do not match.');
        }

        const endpoint = isLogin ? '/user/login' : '/user/register';

        try {
            const response = await fetch('http://localhost:3000' + endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response format');
            }

            const data = await response.json();

            if (data.success) {
                setMessage(data.message);
                localStorage.setItem('user', JSON.stringify(data.data));
                navigate('/home'); // Navigate to Home after successful login
            } else {
                setMessage(data.message || 'Something went wrong.');
            }
        } catch (err) {
            setMessage(err.message);
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
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-2 border rounded"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {!isLogin && (
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full p-2 mb-2 border rounded"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                )}
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            {message && (
                <div className="text-sm text-red-600 mt-2">
                    {message}
                </div>
            )}
            <button
                className="w-full text-green-500 mt-2"
                onClick={() => {
                    setIsLogin(!isLogin);
                    setMessage('');
                    setFormData({ username: '', password: '', confirmPassword: '' });
                }}
            >
                {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
            </button>
        </div>
    );
}

export default LoginRegister;
