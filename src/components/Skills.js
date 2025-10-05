import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaCode, FaLaptopCode, FaCogs, FaDatabase, FaCloud, FaProjectDiagram, FaVial, FaTools, FaCheckCircle } from "react-icons/fa";
import "./SkillsShowcase.css";

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

// Skills Data
const skillsData = {
  "Programming Languages": [
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  ],
  "User Interface Development": [
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  ],
  Frameworks: [
    { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
    { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
    { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  ],
  Databases: [
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Oracle", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
    { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "Cassandra", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" },
  ],
  "Cloud & DevOps": [
    { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    { name: "GCP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
    { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
    { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Terraform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
    { name: "Jenkins", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
  ],
  "System Design": [
    { name: "Microservices", logo: "https://img.icons8.com/?size=100&id=Y8U6C5dYvirN&format=png&color=000000" },
    { name: "RESTful APIs", logo: "https://img.icons8.com/ios-filled/452/api-settings.png" },
    { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    { name: "Event-Driven Architecture", logo: "https://img.icons8.com/ios-filled/452/flow-chart.png" },
  ],
  Testing: [
    { name: "JUnit", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Mockito", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Mockito_Logo.png" },
    { name: "Jest", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
    { name: "Cypress", logo: "https://avatars.githubusercontent.com/u/8908513?s=200&v=4" },
    { name: "Jasmine", logo: "https://www.pikpng.com/pngl/m/129-1291662_jasmine-logo-png-transparent-jasmine-angular-clipart.png" },
    { name: "Karma", logo: "https://karma-runner.github.io/assets/img/banner.png" },
  ],
  "Tools & Technologies": [
    { name: "Apache Kafka", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" },
    { name: "Celery", logo: "https://docs.celeryq.dev/en/stable/_static/celery_512.png" },
    { name: "Hibernate", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "JIRA", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
    { name: "Confluence", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg" },
    { name: "Swagger", logo: "https://logo.svgcdn.com/l/swagger.png" },
    { name: "Postman", logo: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
    { name: "WebSockets", logo: "https://img.icons8.com/ios-filled/452/web.png" },
    { name: "RabbitMQ", logo: "https://www.vectorlogo.zone/logos/rabbitmq/rabbitmq-icon.svg" },
  ],
  Methodologies: [
    { name: "Agile (Scrum)", logo: "https://img.icons8.com/?size=100&id=Z0kIsLxR0GgF&format=png&color=000000" },
    { name: "TDD", logo: "https://img.icons8.com/ios/452/test.png" },
  ],
};
const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryRef = useRef();
  const skillsRef = useRef();

  // Time-based smooth scroll function
  const useSmoothScroll = (ref, speed = 0.05, dependency) => {
    useEffect(() => {
      let animationId;
      let lastTime = performance.now();

      const scroll = (time) => {
        const container = ref.current;
        const delta = time - lastTime;
        lastTime = time;

        if (container) {
          container.scrollLeft += speed * delta;
          if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollLeft = 0;
          }
        }

        animationId = requestAnimationFrame(scroll);
      };

      animationId = requestAnimationFrame(scroll);

      return () => cancelAnimationFrame(animationId);
    }, [ref, dependency, speed]);
  };

  // Apply smooth scroll to categories and skills
  useSmoothScroll(categoryRef, 0.03, null); // slower scroll for categories
  useSmoothScroll(skillsRef, 0.05, selectedCategory); // slightly faster for skills

  return (
    <section className="skills-container">
      <h2 className="skills-title">Technical Skills</h2>

      {!selectedCategory && (
        <div className="categories-carousel" ref={categoryRef}>
          {Object.keys(skillsData).map((category) => (
            <div
              key={category}
              className="category-card"
              onClick={() => setSelectedCategory(category)}
            >
              <div className="category-icon">{categoryIcons[category] || "📌"}</div>
              <div className="category-name">{category}</div>
            </div>
          ))}
          {/* Duplicate for seamless scroll */}
          {Object.keys(skillsData).map((category) => (
            <div key={"dup-" + category} className="category-card">
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
                <img src={skill.logo} alt={skill.name} className="skill-logo" />
                <div className="skill-name">{skill.name}</div>
              </div>
            ))}
            {/* Duplicate for seamless scroll */}
            {skillsData[selectedCategory].map((skill) => (
              <div className="skill-card" key={"dup-" + skill.name}>
                <img src={skill.logo} alt={skill.name} className="skill-logo" />
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

