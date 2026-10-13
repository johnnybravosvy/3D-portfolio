import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ProjectTags = ({ tags }) => (
  <div className="flex flex-wrap gap-2 mt-4">
    {tags?.map((tag) => (
      <span
        key={tag}
        className="text-xs px-3 py-1 rounded-full border border-white-50/30 text-white-50"
      >
        {tag}
      </span>
    ))}
  </div>
);

const ProjectLinks = ({ live, github }) => (
  <div className="flex items-center gap-5 mt-4">
    <a
      href={live}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-white-50 hover:text-white transition-colors"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
      Live Site
    </a>
    <a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-white-50 hover:text-white transition-colors"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
      GitHub
    </a>
  </div>
);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const projectRefs = useRef([]);

  useGSAP(() => {
    projectRefs.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: { trigger: card, start: "top bottom-=100" },
        },
      );
    });

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 },
    );
  }, []);

  const [featured, secondFeatured, ...rest] = projects;

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/* LEFT — featured project */}
          <div className="flex flex-col gap-16">
            <div
              className="first-project-wrapper"
              ref={(el) => (projectRefs.current[0] = el)}
            >
              <a
                href={featured.live}
                target="_blank"
                rel="noopener noreferrer"
                className="image-wrapper block"
              >
                <img
                  src={featured.imgPath}
                  alt={featured.alt}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="text-content">
                <h2>{featured.title}</h2>
                <p className="text-white-50 md:text-xl">{featured.desc}</p>
                <ProjectTags tags={featured.tags} />
                <ProjectLinks live={featured.live} github={featured.github} />
              </div>
            </div>

            <div
              className="first-project-wrapper"
              ref={(el) => (projectRefs.current[1] = el)}
            >
              <a
                href={secondFeatured.live}
                target="_blank"
                rel="noopener noreferrer"
                className="image-wrapper block"
              >
                <img
                  src={secondFeatured.imgPath}
                  alt={secondFeatured.alt}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="text-content">
                <h2>{secondFeatured.title}</h2>
                <p className="text-white-50 md:text-xl">
                  {secondFeatured.desc}
                </p>
                <ProjectTags tags={secondFeatured.tags} />
                <ProjectLinks
                  live={secondFeatured.live}
                  github={secondFeatured.github}
                />
              </div>
            </div>
          </div>

          {/* RIGHT — remaining projects */}
          <div className="project-list-wrapper overflow-hidden grid md:grid-cols-2 gap-">
            {rest.map((project, i) => (
              <div
                key={project.title}
                className="project"
                ref={(el) => (projectRefs.current[i + 2] = el)}
              >
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`image-wrapper block ${project.bg ?? ""}`}
                >
                  <img
                    src={project.imgPath}
                    alt={project.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <h2>{project.title}</h2>
                <ProjectTags tags={project.tags} />
                <ProjectLinks live={project.live} github={project.github} />
              </div>
            ))}
          </div>
        </div>
        {/* VIEW ALL PROJECTS */}
        <div className="flex-center mt-20">
          <a
            href="https://github.com/your-username?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-white-50/30 text-white-50 hover:text-white hover:border-white transition-colors duration-300 group"
          >
            View All Projects on GitHub
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;

// import React, { useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { projects } from "../constants";

// gsap.registerPlugin(ScrollTrigger);

// const ProjectTags = ({ tags }) => (
//   <div className="flex flex-wrap gap-2 mt-4">
//     {tags?.map((tag) => (
//       <span
//         key={tag}
//         className="text-xs px-3 py-1 rounded-full border border-white-50/30 text-white-50"
//       >
//         {tag}
//       </span>
//     ))}
//   </div>
// );

// const ProjectLinks = ({ live, github }) => (
//   <div className="flex items-center gap-5 mt-4">
//     <a
//       href={live}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="flex items-center gap-2 text-white-50 hover:text-white transition-colors"
//     >
//       <svg
//         width="18"
//         height="18"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//       >
//         <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
//         <polyline points="15 3 21 3 21 9" />
//         <line x1="10" y1="14" x2="21" y2="3" />
//       </svg>
//       Live Site
//     </a>
//     <a
//       href={github}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="flex items-center gap-2 text-white-50 hover:text-white transition-colors"
//     >
//       <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
//       </svg>
//       GitHub
//     </a>
//   </div>
// );

// const ShowcaseSection = () => {
//   const sectionRef = useRef(null);
//   const projectRefs = useRef([]);

//   useGSAP(() => {
//     projectRefs.current.forEach((card, index) => {
//       if (!card) return;
//       gsap.fromTo(
//         card,
//         { y: 50, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           delay: 0.3 * (index + 1),
//           scrollTrigger: { trigger: card, start: "top bottom-=100" },
//         },
//       );
//     });

//     gsap.fromTo(
//       sectionRef.current,
//       { opacity: 0 },
//       { opacity: 1, duration: 1.5 },
//     );
//   }, []);

//   const [featured, ...rest] = projects;

//   return (
//     <section id="work" ref={sectionRef} className="app-showcase">
//       <div className="w-full">
//         <div className="showcaselayout">
//           {/* LEFT — featured project */}
//           <div
//             className="first-project-wrapper"
//             ref={(el) => (projectRefs.current[0] = el)}
//           >
//             <a
//               href={featured.live}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="image-wrapper block"
//             >
//               <img
//                 src={featured.imgPath}
//                 alt={featured.alt}
//                 loading="lazy"
//                 decoding="async"
//               />
//             </a>
//             <div className="text-content">
//               <h2>{featured.title}</h2>
//               <p className="text-white-50 md:text-xl">{featured.desc}</p>
//               <ProjectTags tags={featured.tags} />
//               <ProjectLinks live={featured.live} github={featured.github} />
//             </div>
//           </div>

//           {/* RIGHT — remaining projects */}
//           <div className="project-list-wrapper overflow-hidden">
//             {rest.map((project, i) => (
//               <div
//                 key={project.title}
//                 className="project"
//                 ref={(el) => (projectRefs.current[i + 1] = el)}
//               >
//                 <a
//                   href={project.live}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={`image-wrapper block ${project.bg ?? ""}`}
//                 >
//                   <img
//                     src={project.imgPath}
//                     alt={project.alt}
//                     loading="lazy"
//                     decoding="async"
//                   />
//                 </a>
//                 <h2>{project.title}</h2>
//                 <ProjectTags tags={project.tags} />
//                 <ProjectLinks live={project.live} github={project.github} />
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* VIEW ALL PROJECTS */}
//         <div className="flex-center mt-20">
//           <a
//             href="https://github.com/your-username?tab=repositories"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-3 px-8 py-4 rounded-full border border-white-50/30 text-white-50 hover:text-white hover:border-white transition-colors duration-300 group"
//           >
//             View All Projects on GitHub
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               className="group-hover:translate-x-1 transition-transform duration-300"
//             >
//               <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
//             </svg>
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ShowcaseSection;
