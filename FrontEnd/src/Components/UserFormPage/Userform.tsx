
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './userform.css';

type FormValues = {
  name: string;
  skills: string[];
  description: string;
  email: string;
  experience: { companyName: string; websiteUrl: string; description: string }[];
  projects: { name: string; projectDescription: string; photo: File | null }[];
  userPhoto: File | null;
  githubLink: string;
  linkedin: string;
};

const UserForm: React.FC = () => {
  const { register, handleSubmit, control, setValue, getValues, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: '',
      skills: [''],
      description: '',
      email: '',
      experience: [{ companyName: '', websiteUrl: '', description: '' }],
      projects: [{ name: '', projectDescription: '', photo: null }],
      userPhoto: null,
      githubLink: '',
      linkedin: '',
    }
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills'
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects'
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience'
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    formData.append('Name', data.name);
    formData.append('Discription', data.description);
    console.log('Discription', data.description)
    formData.append('Email', data.email);
    formData.append('GithubLink', data.githubLink);
    formData.append('Linkedin', data.linkedin);

    if (data.userPhoto) {
      formData.append('userPhoto', data.userPhoto);
      console.log('userPhoto', data.userPhoto)
    }

    data.skills.forEach((skill, index) => {
      formData.append(`Skills[${index}]`, skill);
      console.log(`Skills[${index}]`, skill);
    });

    data.experience.forEach((exp, index) => {
      formData.append(`Experiences[${index}][Company_Name]`, exp.companyName);
      formData.append(`Experiences[${index}][Website_URL]`, exp.websiteUrl);
      formData.append(`Experiences[${index}][Discription]`, exp.description);
      console.log(`Experiences[${index}][Discription]`, exp.description)
    });

    data.projects.forEach((project, index) => {
      formData.append(`Projects[${index}][Name]`, project.name);
      formData.append(`Projects[${index}][Project_Discription]`, project.projectDescription);
      if (project.photo) {
        formData.append(`projectPhotos`, project.photo);
        console.log(`projectPhotos`, project.photo)
        
      }
    });
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:8000/api/create-user-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Response:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (index: number, fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue(fieldName, file);
    
    const fileNameSpan = document.getElementById(`file-name-${index}`);
    if (fileNameSpan && file) {
      fileNameSpan.textContent = file.name;
    } else if (fileNameSpan) {
      fileNameSpan.textContent = '';
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" {...register('name')} />
          {errors.name && <div>{errors.name.message}</div>}
        </div>

        <div className="form-group">
          <label>Skills</label>
          {skillFields.map((skill, index) => (
            <div key={skill.id}>
              <input
                type="text"
                {...register(`skills.${index}`)}
              />
              {errors.skills && errors.skills[index] && <div>{errors.skills[index].message}</div>}
              <button type="button" onClick={() => removeSkill(index)}>Remove Skill</button>
            </div>
          ))}
          <button type="button" onClick={() => appendSkill('')}>Add Skill</button>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea {...register('description')} />
          {errors.description && <div>{errors.description.message}</div>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register('email')} />
          {errors.email && <div>{errors.email.message}</div>}
        </div>

        <div className="form-group">
          <label>Experience</label>
          {experienceFields.map((exp, index) => (
            <div key={exp.id} className="card">
              <div className="card-content">
                <input
                  type="text"
                  placeholder="Company Name"
                  {...register(`experience.${index}.companyName` as const)}
                />
                <input
                  type="url"
                  placeholder="Website URL"
                  {...register(`experience.${index}.websiteUrl` as const)}
                />
                <textarea
                  placeholder="Description"
                  {...register(`experience.${index}.description` as const)}
                />
                <button type="button" onClick={() => removeExperience(index)}>Remove</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => appendExperience({ companyName: '', websiteUrl: '', description: '' })}>Add Experience</button>
        </div>

        <div className="form-group">
          <label>Projects</label>
          {projectFields.map((project, index) => (
            <div key={project.id} className="card">
              <div className="card-content">
                <input
                  type="text"
                  placeholder="Project Name"
                  {...register(`projects.${index}.name` as const)}
                />
                <textarea
                  placeholder="Project skills"
                  {...register(`projects.${index}.projectDescription` as const)}
                />
                <input
                  type="file"
                  onChange={handleFileChange(index, `projects.${index}.photo`)}
                />
                <span id={`file-name-${index}`}></span>
                <button type="button" onClick={() => removeProject(index)}>Remove</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => appendProject({ name: '', projectDescription: '', photo: null })}>Add Project</button>
        </div>

        <div className="form-group">
          <label>Profile Photo</label>
          <input
            type="file"
            onChange={e => handleFileChange(-1, 'userPhoto')(e)}
          />
          <span id="user-photo-file-name"></span>
        </div>

        <div className="form-group">
          <label>GitHub Link</label>
          <input type="url" {...register('githubLink')} />
          {errors.githubLink && <div>{errors.githubLink.message}</div>}
        </div>

        <div className="form-group">
          <label>LinkedIn</label>
          <input type="url" {...register('linkedin')} />
          {errors.linkedin && <div>{errors.linkedin.message}</div>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
