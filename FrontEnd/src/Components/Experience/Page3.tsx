import React from 'react';
import './page3.css';

interface Experience {
  Company_Name: string;
  Website_URL: string;
  Discription: string;
}

interface Page3Props {
  experience: Experience[];
}

const Page3: React.FC<Page3Props> = ({ experience }) => {
  const displayedExperience = experience.slice(0, 10);
  const firstRow = displayedExperience.length > 2 ? displayedExperience.slice(0, 5) : displayedExperience;
  const secondRow = displayedExperience.length > 2 ? displayedExperience.slice(5) : [];
  return (
    <section className="section bg-gradient-to-r">
      <div className="content flex flex-col items-center">
        <h2 className="text-xl font-bold animate-slidein700 opacity-0 mt-8">Experience</h2>
        {displayedExperience.length <= 2 ? (
          <div className="flex flex-col items-center">
            {displayedExperience.map((exp, index) => (
              <div
                key={index}
                className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 lg:w-192 mb-4"
              >
                <div className="p-6">
                  <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {exp.Company_Name}
                  </h5>
                  <h6 className="block mb-2 font-sans text-lg antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                  {exp.Discription}
                  </h6>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href={exp.Website_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  >
                    Comapny link
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full max-w-6xl">
            <div className="flex justify-between flex-wrap mb-4">
              {firstRow.map((exp, index) => (
                <div
                  key={index}
                  className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 lg:w-192 mx-4 mb-4"
                >
                  <div className="p-6">
                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      {exp.Company_Name}
                    </h5>
                    <h6 className="block mb-2 font-sans text-lg antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                    {exp.Discription}
                    </h6>
                    {/* <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                      {exp.Discription}
                    </p> */}
                  </div>
                  <div className="p-6 pt-0">
                    <a
                      href={exp.Website_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    >
                      Company link
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {secondRow.length > 0 && (
              <div className="flex justify-between flex-wrap">
                {secondRow.map((exp, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 lg:w-192 mx-4 mb-4"
                  >
                    <div className="p-6">
                      <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        {exp.Company_Name}
                      </h5>
                      <h6 className="block mb-2 font-sans text-lg antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                      {exp.Discription}
                      </h6>
                    </div>
                    <div className="p-6 pt-0">
                      <a
                        href={exp.Website_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                      >
                        Company link
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Page3;
