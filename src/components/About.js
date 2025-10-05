import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaLinkedin, FaEnvelope, FaFilePdf, FaFileAlt } from "react-icons/fa";
import "./About.css";

const About = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // Trigger animation on mount
  }, []);

  const squares = [
    { width: 100, height: 100, top: "15%", left: "20%", duration: 12, color: "rgba(255,255,255,0.05)" },
    { width: 60, height: 60, top: "70%", left: "75%", duration: 10, color: "rgba(124,202,255,0.05)" },
    { width: 80, height: 80, top: "50%", left: "50%", duration: 15, color: "rgba(255,255,124,0.05)" },
    { width: 50, height: 50, top: "35%", left: "80%", duration: 8, color: "rgba(255,124,202,0.05)" },
    { width: 70, height: 70, top: "20%", left: "60%", duration: 14, color: "rgba(124,255,202,0.05)" },
  ];

  const icons = [
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/your-profile", tooltip: "LinkedIn" },
    { icon: <FaEnvelope />, href: "mailto:your.email@example.com", tooltip: "Email" },
    { icon: <FaFilePdf />, href: "/resume.pdf", download: true, tooltip: "Download Resume" },
    { icon: <FaFileAlt />, href: "/coverletter.pdf", download: true, tooltip: "Download Cover Letter" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="portfolio-container">
        {/* Background Squares */}
        {squares.map((s, i) => (
          <div
            key={i}
            className="square"
            style={{
              width: s.width,
              height: s.height,
              top: s.top,
              left: s.left,
              animationDuration: `${s.duration}s`,
              backgroundColor: s.color,
            }}
          />
        ))}

        <div className="content-manage">
          <div className="header-container">
            <h1 className="title">Santhosh Kumar Padige</h1>
            <h3 className="caption">Senior Software Engineer</h3>
          </div>

          <div className={`hero-content ${animate ? "slide-in" : ""}`}>
            <p className="fade-up delay-2">
              Crafting scalable web and cross-platform applications with over 7 years of experience,
              I specialize in designing robust system architectures and delivering high-quality, secure
              software solutions. I thrive on transforming complex challenges into efficient, user-friendly
              applications while guiding technical teams to achieve excellence. Passionate about innovation
              and clean code, I focus on building software that drives real-world impact and seamless user experiences.
            </p>

            {/* Social + Download Icons */}
            <div className="social-icons fade-up delay-3">
              {icons.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  download={item.download || false}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="tooltip"
                  data-tooltip={item.tooltip}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
