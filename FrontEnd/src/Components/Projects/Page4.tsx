


import React, { useRef } from 'react';
import { useMotionValue, motion, useSpring, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

import './page4.css'; 

interface Project {
  Name: string;
  ProjectPhoto: string;
  Project_Discription: string;
}

interface Page4Props {
  projects: Project[];
}

const Page4: React.FC<Page4Props> = ({ projects }) => {
  return (
    <section className="section bg-gradient-to-r p-4 md:p-8">
      <div className="content mx-auto max-w-7xl">
        <h2 className="text-xl font-bold animate-slidein700 opacity-0 mt-8">Projects</h2>
        {projects.map((proj, index) => (
          <Link
            key={index}
            heading={proj.Name}
            subheading={proj.Project_Discription}
            imgSrc={`http://51.20.130.55/api/photo/${proj.ProjectPhoto}`}
            href="#"
          />
        ))}
      </div>
    </section>
  );
}

const Link: React.FC<{ heading: string; imgSrc: string; subheading: string; href: string }> = ({ heading, imgSrc, subheading, href }) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();

      const width = rect.width;
      const height = rect.height;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      x.set(xPct);
      y.set(yPct);
    }
  };

  return (
    <div>
      <motion.a
        href={href}
        ref={ref}
        onMouseMove={handleMouseMove}
        initial="initial"
        whileHover="whileHover"
        className="group relative flex items-center justify-between border-b-2 border-neutral-400 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
      >
        <div>
          <motion.span
            variants={{
              initial: { x: 0 },
              whileHover: { x: -16 },
            }}
            transition={{
              type: "spring",
              staggerChildren: 0.075,
              delayChildren: 0.25,
            }}
            className="relative z-10 block text-3xl font-bold text-neutral-100 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
          >
            {heading.split("").map((l, i) => (
              <motion.span
                variants={{
                  initial: { x: 0 },
                  whileHover: { x: 16 },
                }}
                transition={{ type: "spring" }}
                className="inline-block"
                key={i}
              >
                {l}
              </motion.span>
            ))}
          </motion.span>
          <span className="relative z-10 mt-2 block text-base text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50">
            {subheading}
          </span>
          {/* <FaLinkedin className="text-2xl text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50 mt-2" /> */}
        </div>

        <motion.img
          style={{
            top,
            left,
            translateX: "-50%",
            translateY: "-50%",
          }}
          variants={{
            initial: { scale: 0, rotate: "-12.5deg" },
            whileHover: { scale: 1, rotate: "12.5deg" },
          }}
          transition={{ type: "spring" }}
          src={imgSrc}
          className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
          alt={`Image representing a link for ${heading}`}
        />

        <motion.div
          variants={{
            initial: {
              x: "25%",
              opacity: 0,
            },
            whileHover: {
              x: "0%",
              opacity: 1,
            },
          }}
          transition={{ type: "spring" }}
          className="relative z-10 p-4"
        >
          <FiArrowRight className="text-5xl text-neutral-50" />
        </motion.div>
      </motion.a>
    </div>
  );
};

export default Page4;
