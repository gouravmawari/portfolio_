
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  setResponseData: (data: { name: string; skills: string; description: string }) => void;
}

const Register: React.FC<RegisterProps> = ({ setResponseData }) => {
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    description: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { name, skills, description } = formData;

    if (!name || !skills || !description) {
      alert('Please provide all credentials: Name, Skills, and Description');
      return;
    }

    try {
      const response = await fetch('http://51.20.130.55/api/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Name: name, Discription: description, Skills: skills })
      });

      if (response.ok) {
        const result = await response.json();
        const data = {
          name: result.Name,
          skills: result.Skills,
          description: result.Discription
        };
        setResponseData(data);
        localStorage.setItem('responseData', JSON.stringify(data));
        navigate('/main'); 
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 h-screen flex justify-center items-center">
      <div className="bg-[#172554] p-8 rounded-lg shadow-lg w-96">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-white">Skills</label>
            <input
              type="text"
              name="skills"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-white">Description</label>
            <textarea
              name="description"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
