import { motion } from "framer-motion";
import { FaUniversity, FaGraduationCap } from "react-icons/fa";
import "./Education.css";

const educationData = [
    {
        degree: "M.S. in Computer Science",
        institution: "Fitchburg State University",
        location: "MA, USA",
        duration: "Aug 2022 – May 2023",
        gpa: "GPA: 3.7/4.0",
        icon: <FaGraduationCap />,
    },
    {
        degree: "B.Tech in Computer Science & Engineering",
        institution: "Vardhaman College of Engineering",
        location: "Hyderabad, India",
        duration: "2013 – 2017",
        gpa: "72.2%",
        icon: <FaUniversity />,
    },
];

const Education = () => {
    return (
        <motion.section
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            <div className="education-container">
                <h2 className="edu-title">Educational Background</h2>
                <div className="edu-cards">
                    {educationData.map((edu, index) => (
                        <div className="edu-card" key={index}>
                            <div className="edu-icon">{edu.icon}</div>
                            <h3 className="edu-degree">{edu.degree}</h3>
                            <p className="edu-institution">{edu.institution}</p>
                            <p className="edu-location">{edu.location}</p>
                            <p className="edu-duration">{edu.duration}</p>
                            <p className="edu-gpa">{edu.gpa}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Education;

