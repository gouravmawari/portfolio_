import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../useFormStore'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setUserProfile = useUserStore((state) => state.setUserProfile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      Email: email,
      Password: password,
    };

    try {
      // const response = await axios.post('http://localhost:8000/api/login', loginData);
      const response = await axios.post('http://51.20.130.55/api/login', loginData);
      const data = response.data;

      const profileData = {
        userId: data._id,
        name: data.Name,
        skills: data.Skills,
        description: data.Discription,
        experience: data.Experience,
        projects: data.Project,
        Photo: data.Photo,
        GithubLink:data.GithubLink,
        Linkedin:data.Linkedin
      };
      setUserProfile(profileData);
      navigate('/main');
    } catch (error) {
      console.error('Error logging in:', error);

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#172554]">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105">
        <h1 className="text-2xl font-semibold text-white mb-4">Log In</h1>
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
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
