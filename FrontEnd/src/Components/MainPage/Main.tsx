
import React, { useEffect, useState } from 'react';
import './MainCSS.css';
import Page2 from '../Skill/Page2';
import Page3 from '../Experience/Page3';
import Page4 from '../Projects/Page4';
import Navbar from '../Navbar/Navbar';
import useUserStore from '../../useFormStore';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const Main: React.FC = () => {
  const { userProfile, setUserProfile } = useUserStore();
  const [responseData, setResponseData] = useState(userProfile);
  const navigate = useNavigate();
  console.log("here is user profile")
  console.log(userProfile);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      const photoFilename = parsedProfile.Photo.split('\\').pop().split('/').pop();
      parsedProfile.Photo = photoFilename;
      const updatedProjects = parsedProfile.projects.map((project: any) => {
        const projectPhotoFilename = project.ProjectPhoto.split('\\').pop().split('/').pop();
        return { ...project, ProjectPhoto: projectPhotoFilename };
      });

      const updatedProfile = { ...parsedProfile, projects: updatedProjects };

      setResponseData(updatedProfile);
      setUserProfile(updatedProfile);
    }
  }, [setUserProfile]);

  const handleEditProfile = () => {
    navigate('/form');
  };

  const { name, skills, description, experience, projects, Photo, GithubLink, Linkedin } = responseData;
  console.log("here is profile skills data");
console.log(skills)
  const truncateDescription = (text: string, maxWords: number) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  return (
    <Navbar>
      <>
        <section className="section bg-split relative">
          <div className="content flex items-start justify-between w-full">
            <div className="flex flex-col items-start animate-slidein700 opacity-0 photobaby">
              <img
                src={`http://localhost:8000/api/photo/${Photo}`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-2"
              />
              <h1 className="text-2xl animate-slidein700 opacity-0 font-bold Name text-[#f8fafc] mb-2">{name}</h1>
            </div>
            <p className="animate-slidein700 Discription text-[#f8fafc] opacity-0 max-w-md">
              {truncateDescription(description, 200)}
            </p>
            <button
              onClick={handleEditProfile}
              className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded"
            >
              Edit Profile
            </button>
          </div>
        </section>
        <Page2 skills={skills} />
        <Page3 experience={experience} />
        <Page4 projects={projects} />

        <div className="flex space-x-4 mt-4">
          <a href={Linkedin} target="_blank" rel="noopener noreferrer" className="text-2xl text-neutral-400 transition-colors duration-500 hover:text-neutral-50">
            <FaLinkedin />
          </a>
          <a href={`mailto:${responseData.Email}`} target="_blank" rel="noopener noreferrer" className="text-2xl text-neutral-400 transition-colors duration-500 hover:text-neutral-50">
            <SiGmail />
          </a>
          <a href={GithubLink} target="_blank" rel="noopener noreferrer" className="text-2xl text-neutral-400 transition-colors duration-500 hover:text-neutral-50">
            <FaGithub />
          </a>
        </div>
      </>
    </Navbar>
  );
};

export default Main;
