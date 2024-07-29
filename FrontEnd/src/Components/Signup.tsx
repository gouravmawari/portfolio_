
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserForm from './UserFormPage/Userform';

const Signup: React.FC = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      Name: name,
      Email: email,
      Password: password,
    };

    try {
      
      const response = await axios.post('http://localhost:8000/api/Register', userData);
      console.log('User registered successfully:', response.data);
      
      navigate('/form');
    } catch (error) {
      console.error('Error registering user:', error);
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#172554]">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105">
        <h1 className="text-2xl font-semibold text-white mb-4">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 rounded bg-white bg-opacity-30 border border-white outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-white">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-1 rounded bg-white bg-opacity-30 border border-white outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 rounded bg-white bg-opacity-30 border border-white outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
