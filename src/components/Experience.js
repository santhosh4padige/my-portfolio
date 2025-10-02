import {
  FaReact, FaPython, FaJava, FaDatabase, FaCloud, FaMobileAlt, FaNodeJs, FaAngular, FaDocker, FaAws
} from "react-icons/fa";
import { SiSpringboot, SiGraphql, SiMongodb, SiKubernetes, SiFlask, SiDjango } from "react-icons/si";
import { motion } from "framer-motion";
import "./Experience.css";

const techIcons = {
  "React": <FaReact />,
  "React.js": <FaReact />,
  "React Native": <FaMobileAlt />,
  "Python": <FaPython />,
  "Java": <FaJava />,
  "Hibernate": <FaDatabase />,
  "MySQL": <SiMongodb />,
  "Oracle": <FaDatabase />,
  "AWS": <FaAws />,
  "GCP": <FaCloud />,
  "Spring Boot": <SiSpringboot />,
  "GraphQL": <SiGraphql />,
  "Node.js": <FaNodeJs />,
  "Angular": <FaAngular />,
  "Docker": <FaDocker />,
  "Kubernetes": <SiKubernetes />,
  "Django": <SiDjango />,
  "Flask": <SiFlask />
};

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Wenable Inc.",
    period: "Nov 2019 – Present",
    projects: [
      {
        name: "WeGuard (EMM/MDM and UEM Platform)",
        technologies: ["React Native", "Spring Boot", "Hibernate", "AWS", "GCP", "Kafka", "RabbitMQ"],
        responsibilities: [
          "Cross-platform app supporting 1M+ devices.",
          "Secure REST APIs with async processing.",
          "Optimized backend performance, reducing query time by 50%.",
          "Event-driven systems with 99.9% uptime.",
          "Improved CI/CD pipelines, reduced production issues by 60%.",
          "Microservices in Java & Python."
        ]
      },
      {
        name: "M2M IN MOTION (Fleet Intelligence Software)",
        technologies: ["React.js", "GraphQL", "WebSockets", "ML Models"],
        responsibilities: [
          "Responsive driver interface using React.js.",
          "Real-time tracking integration.",
          "ML models for fleet routing & maintenance prediction."
        ]
      }
    ]
  },
  {
    title: "Software Developer",
    company: "Athmin Technologies",
    period: "Feb 2018 – Aug 2019",
    projects: [
      {
        name: "Backend Development",
        technologies: ["Spring Boot", "Hibernate", "MySQL", "Oracle", "GCP"],
        responsibilities: [
          "Optimized backend APIs, improved response times by 60%.",
          "Managed full SDLC on GCP.",
          "Implemented secure backend services.",
          "Scrum Master: 95% sprint goal delivery."
        ]
      }
    ]
  }
];

const Experience = () => {
  return (
    <section className="experience-section">
      <h2 className="title">Professional Experience</h2>
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className={`timeline-item ${idx % 2 === 0 ? "left" : "right"}`}
          >
            <div className="timeline-dot"></div>
            <motion.div
              className="job-card"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="card-inner">
                <div className="card-front">
                  <h3 className="job-title">{exp.title}</h3>
                  <h4 className="company-name">{exp.company}</h4>
                  <p className="period">{exp.period}</p>
                </div>
                <div className="card-back">
                  <div className="projects-container">
                    {exp.projects.map((proj, pIdx) => (
                      <div key={pIdx} className="project-card">
                        <h5>{proj.name}</h5>
                        <div className="tech-icons">
                          {proj.technologies.map((tech, tIdx) => (
                            <span key={tIdx} className="icon" title={tech}>
                              {techIcons[tech] || "💻"}
                            </span>
                          ))}
                        </div>
                        <ul>
                          {proj.responsibilities.map((r, rIdx) => (
                            <li key={rIdx}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
