// components/UserProfile.jsx
function UserProfile() {
    return (
        <div className="w-64 p-4 bg-white shadow-lg rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-2">User Profile</h2>
            <img 
                src="https://via.placeholder.com/100" 
                alt="Profile" 
                className="rounded-full w-24 h-24 mx-auto mb-4"
            />
            <p className="text-center">Username: <strong>User1</strong></p>
            <p className="text-center text-sm text-gray-500">Member since 2024</p>
        </div>
    );
}

export default UserProfile;
