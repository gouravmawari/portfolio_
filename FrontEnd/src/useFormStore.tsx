import { create } from 'zustand';

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
  userId: string;
  name: string;
  skills: string[];
  description: string;
  experience: Experience[];
  projects: Project[];
  Photo: string;
  GithubLink:string;
  Linkedin:string;
}

interface UserFormProps {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

const useUserStore = create<UserFormProps>((set) => {
  const storedProfile = localStorage.getItem('userProfile');
  const initialProfile = storedProfile ? JSON.parse(storedProfile) : {
    userId: '',
    name: '',
    skills: [],
    description: '',
    experience: [],
    projects: [],
    Photo: '',
    GithubLink:'',
    Linkedin:''
  };

  return {
    userProfile: initialProfile,
    setUserProfile: (profile) => {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      set({ userProfile: profile });
    },
  };
});

export default useUserStore;
