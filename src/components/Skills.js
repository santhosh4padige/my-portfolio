import React, { useState, useEffect, useRef } from "react";
import {
  FaArrowLeft,
  FaCode,
  FaLaptopCode,
  FaCogs,
  FaDatabase,
  FaCloud,
  FaProjectDiagram,
  FaVial,
  FaTools,
  FaCheckCircle,
  FaJava,
  FaJsSquare,
  FaPython,
  FaReact,
  FaAngular,
  FaNodeJs,
  FaHtml5,
  FaCss3,
  FaDocker,
  FaAws,
  FaGit,
  FaVials,
  FaBug
} from "react-icons/fa";

import {
  SiSpringboot,
  SiDjango,
  SiFlask,
  SiMysql,
  SiMongodb,
  SiOracle,
  SiRedis,
  SiKubernetes,
  SiTerraform,
  SiJenkins,
  SiPostman,
  SiSwagger,
  SiRabbitmq,
  SiGraphql,
  SiCypress,
  SiJasmine,
  SiCelery,
  SiHibernate,
  SiJira,
  SiConfluence,
  SiWebrtc,
} from "react-icons/si";

import "./SkillsShowcase.css";

// Category Icons
const categoryIcons = {
  "Programming Languages": <FaCode />,
  "User Interface Development": <FaLaptopCode />,
  Frameworks: <FaCogs />,
  Databases: <FaDatabase />,
  "Cloud & DevOps": <FaCloud />,
  "System Design": <FaProjectDiagram />,
  Testing: <FaVial />,
  "Tools & Technologies": <FaTools />,
  Methodologies: <FaCheckCircle />,
};

// Skills Data with React Icons
const skillsData = {
  "Programming Languages": [
    { name: "Java", icon: <FaJava size={50} color="#f89820" /> },
    { name: "JavaScript", icon: <FaJsSquare size={50} color="#f7df1e" /> },
    { name: "TypeScript", icon: <SiGraphql size={50} color="#007acc" /> }, // alternative
    { name: "Python", icon: <FaPython size={50} color="#3776ab" /> },
  ],
  "User Interface Development": [
    { name: "Node.js", icon: <FaNodeJs size={50} color="#68a063" /> },
    { name: "React", icon: <FaReact size={50} color="#61dafb" /> },
    { name: "Angular", icon: <FaAngular size={50} color="#dd0031" /> },
    { name: "HTML5", icon: <FaHtml5 size={50} color="#e34f26" /> },
    { name: "CSS3", icon: <FaCss3 size={50} color="#264de4" /> },
    { name: "React Native", icon: <FaReact size={50} color="#61dafb" /> },
  ],
  Frameworks: [
    { name: "Spring Boot", icon: <SiSpringboot size={50} color="#6db33f" /> },
    { name: "Django", icon: <SiDjango size={50} color="#092e20" /> },
    { name: "Flask", icon: <SiFlask size={50} color="#000000" /> },
    { name: "Express.js", icon: <FaNodeJs size={50} color="#68a063" /> },
  ],
  Databases: [
    { name: "MySQL", icon: <SiMysql size={50} color="#4479a1" /> },
    { name: "MongoDB", icon: <SiMongodb size={50} color="#47a248" /> },
    { name: "Oracle", icon: <SiOracle size={50} color="#f80000" /> },
    { name: "Redis", icon: <SiRedis size={50} color="#dc382d" /> },
  ],
  "Cloud & DevOps": [
    { name: "AWS", icon: <FaAws size={50} color="#ff9900" /> },
    { name: "GCP", icon: <FaCloud size={50} color="#4285f4" /> }, // alternative
    { name: "Kubernetes", icon: <SiKubernetes size={50} color="#326ce5" /> },
    { name: "Docker", icon: <FaDocker size={50} color="#2496ed" /> },
    { name: "Terraform", icon: <SiTerraform size={50} color="#623ce4" /> },
    { name: "Jenkins", icon: <SiJenkins size={50} color="#d24939" /> },
  ],
  "System Design": [
    { name: "Microservices", icon: <FaProjectDiagram size={50} color="#00bcd4" /> },
    { name: "RESTful APIs", icon: <SiSwagger size={50} color="#85ea2d" /> },
    { name: "GraphQL", icon: <SiGraphql size={50} color="#e535ab" /> },
    { name: "Event-Driven Architecture", icon: <FaProjectDiagram size={50} color="#ff5722" /> },
  ],
  Testing: [
    { name: "JUnit", icon: <FaJava size={50} color="#f89820" /> },
    { name: "Mockito", icon: <SiJenkins size={50} color="#d24939" /> },
    { name: "Cypress", icon: <SiCypress size={50} color="#17202c" /> },
    { name: "Jasmine", icon: <SiJasmine size={50} color="#8b008b" /> },
    { name: "Karma", icon: <FaVials size={50} color="#ff0000" /> },
  ],
  "Tools & Technologies": [
    { name: "Apache Kafka", icon: <SiJenkins size={50} color="#d24939" /> }, // alternative
    { name: "Celery", icon: <SiCelery size={50} color="#4e9a06" /> },
    { name: "Hibernate", icon: <SiHibernate size={50} color="#59666c" /> },
    { name: "Git", icon: <FaGit size={50} color="#f05032" /> },
    { name: "JIRA", icon: <SiJira size={50} color="#0052cc" /> },
    { name: "Confluence", icon: <SiConfluence size={50} color="#172b4d" /> },
    { name: "Swagger", icon: <SiSwagger size={50} color="#85ea2d" /> },
    { name: "Postman", icon: <SiPostman size={50} color="#ff6c37" /> },
    { name: "WebSockets", icon: <SiWebrtc size={50} color="#00bcd4" /> },
    { name: "RabbitMQ", icon: <SiRabbitmq size={50} color="#ff6600" /> },
  ],
  Methodologies: [
    { name: "Agile (Scrum)", icon: <FaCheckCircle size={50} color="#4caf50" /> },
    { name: "TDD", icon: <FaBug size={50} color="#c21325" /> },
  ],
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryRef = useRef();
  const skillsRef = useRef();

  const useSmoothScroll = (ref, speed = 0.3, dependency) => {
    useEffect(() => {
      const container = ref.current;
      if (!container) return;

      let animationId;

      const step = () => {
        if (!container) return;

        container.scrollLeft += speed;

        // reset scroll when it reaches half of scrollWidth (because of duplicates)
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }

        animationId = requestAnimationFrame(step);
      };

      animationId = requestAnimationFrame(step);

      return () => cancelAnimationFrame(animationId);
    }, [ref, dependency, speed]);
  };

  useSmoothScroll(categoryRef, 0.25, null);
  useSmoothScroll(skillsRef, 0.35, selectedCategory);

  return (
    <section className="skills-container">
      <h2 className="skills-title">Technical Skills</h2>

      {!selectedCategory && (
        <div className="categories-carousel" ref={categoryRef}>
          {Object.keys(skillsData).map((category) => (
            <div key={category} className="category-card" onClick={() => setSelectedCategory(category)}>
              <div className="category-icon">{categoryIcons[category] || "📌"}</div>
              <div className="category-name">{category}</div>
            </div>
          ))}
          {Object.keys(skillsData).map((category, index) => (
            <div key={`dup-${category}-${index}`} className="category-card">
              <div className="category-icon">{categoryIcons[category] || "📌"}</div>
              <div className="category-name">{category}</div>
            </div>
          ))}
        </div>
      )}

      {selectedCategory && (
        <div className="skills-expanded">
          <div className="expanded-header">
            <button className="back-btn" onClick={() => setSelectedCategory(null)}>
              <FaArrowLeft />
            </button>
            <h3>{selectedCategory}</h3>
          </div>
          <div className="skills-grid" ref={skillsRef}>
            {skillsData[selectedCategory].map((skill) => (
              <div className="skill-card" key={skill.name}>
                {skill.icon}
                <div className="skill-name">{skill.name}</div>
              </div>
            ))}
            {skillsData[selectedCategory].map((skill, index) => (
              <div className="skill-card" key={`dup-${skill.name}-${index}`}>
                {skill.icon}
                <div className="skill-name">{skill.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;
