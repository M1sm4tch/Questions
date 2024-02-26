// Login.jsx

import { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the loginUser function with user credentials
      await loginUser({ username, password });

      // Redirect or perform other actions after successful login
      console.log('Login successful! Redirecting...');
      navigate('/home')
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Handle login failure, show error message, etc.
    }
  };

  return (
    <div className="text-center max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <label className="block">
          Username:
          <input type="username" value={username} onChange={(e) => setusername(e.target.value)} className="w-full p-2 border rounded-md" />
        </label>
        <label className="block">
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded-md" />
        </label>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
