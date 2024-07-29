
import React from 'react';
import './page2.css';
import skillIcons from '../IconsLinks';
interface Page2Props {
  skills: string[];
}

const Page2: React.FC<Page2Props> = ({ skills }) => {


  const displayedSkills = skills.slice(0, 10);
  const firstRow = displayedSkills.slice(0, 5);
  const secondRow = displayedSkills.slice(5);

  return (
    <section className="section bg-gradient-to-r h-screen flex flex-col justify-center items-center">
      <div className="content text-center">
        <h2 className="text-4xl font-bold skills animate-slidein700 opacity-100 mb-8">Skills</h2>
        <div className="flex flex-col list w-full max-w-4xl">
          <div className="flex justify-between mb-14">
            {firstRow.map((skill, index) => (
              <div key={index} className="skill-item text-white text-lg flex-grow basis-1/5 text-center mx-12">
                <img src={skillIcons[skill]} alt={skill} className="skill-icon" />
              </div>
            ))}
          </div>
          <div className="flex secondRow justify-between">
            {secondRow.map((skill, index) => (
              <div key={index} className="skill-item text-white text-lg flex-grow basis-1/5 text-center mx-12">
                <img src={skillIcons[skill]} alt={skill} className="skill-icon" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page2;
