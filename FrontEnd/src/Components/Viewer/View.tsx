import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page2 from '../Skill/Page2';
import Page3 from '../Experience/Page3';
import './view.css';
import Page4 from '../Projects/Page4';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

interface Experience {
  Company_Name: string;
  Website_URL: string;
  Discription: string;
}

interface Project {
  Name: string;
  ProjectPhoto: string;
  Project_Discription: string;
}

interface UserProfile {
  _id: string;
  Email: string;
  Name: string;
  Skills: string[];
  Experience: Experience[];
  Project: Project[];
  Discription: string;
  Photo: string;
  access: string;
  GithubLink: string;
  Linkedin: string;
}

const View: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/showprofile?target_id=${id}`);
        const data: UserProfile = await response.json();
        
        const photoFilename = data.Photo.split('\\').pop().split('/').pop();
        const updatedData = { ...data, Photo: photoFilename };

        const updatedProjects = data.Project.map(project => {
          const projectPhotoFilename = project.ProjectPhoto.split('\\').pop().split('/').pop();
          return { ...project, ProjectPhoto: projectPhotoFilename };
        });

        setUserData({ ...updatedData, Project: updatedProjects });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { Name, Skills, Discription, Experience, Project, Photo, access, GithubLink, Linkedin } = userData;

  const truncateDescription = (text: string, maxWords: number) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  return (
    <div>
      <>
        <section className="section bg-split">
          <div className="content flex items-start justify-between w-full">
            <div className="flex flex-col items-start animate-slidein700 opacity-0 photobaby">
              <img
                src={`http://localhost:8000/api/photo/${Photo}`} 
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-2"
              />
              <h1 className="text-2xl animate-slidein700 opacity-0 font-bold Name text-[#f8fafc] mb-2">{Name}</h1>
            </div>
            <p className="animate-slidein700 Discription text-[#f8fafc] opacity-0 max-w-md">
              {truncateDescription(Discription, 200)}
            </p>
          </div>
        </section>

        <Page2 skills={Skills} />
        <Page3 experience={Experience} />
        <Page4 projects={Project} />

        <div className="flex space-x-4 mt-4">
          <a href={Linkedin} target="_blank" rel="noopener noreferrer" className="text-3xl text-neutral-400 transition-colors duration-500 hover:text-neutral-50">
            <FaLinkedin />
          </a>
          <a href={`mailto:${userData.Email}`} target="_blank" rel="noopener noreferrer" className="text-3xl text-neutral-400 transition-colors duration-500 hover:text-neutral-50">
            <SiGmail />
          </a>
          <a href={GithubLink} target="_blank" rel="noopener noreferrer" className="text-3xl text-neutral-400 transition-colors duration-500 hover:text-neutral-50">
            <FaGithub />
          </a>
        </div>
      </>
    </div>
  );
};

export default View;
