import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [username, setUsername] = useState('');  // For login and register forms only
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/token/', {
      username,  
      email,
        password,
      });
      localStorage.setItem('token', response.data.access);
      navigate('/'); // Redirect to home page or dashboard
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
      await axios.post('http://localhost:8000/api/auth/register/', {
        email,
        password,
      });
      handleLogin(); // Log in after successful registration
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <input
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="input w-full"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input w-full"
        />
        {!isLogin && (
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="input w-full"
          />
        )}
        <button
          onClick={isLogin ? handleLogin : handleRegister}
          className="btn w-full"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="btn w-full mt-4 bg-gray-500 hover:bg-gray-600"
        >
          {isLogin ? 'Create an account' : 'Back to Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
