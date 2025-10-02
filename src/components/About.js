import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./About.css";
const About = () => {

    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        setAnimate(true);
    }, []);

    const scrollToNextSection = () => {
        const nextSection = document.getElementById("education");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <motion.section
            id="about"
            className="section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            <div className="portfolio-container">
                {/* Background Squares */}
                <div className="square" style={{ width: 100, height: 100, top: "15%", left: "20%", animationDuration: "12s" }}></div>
                <div className="square" style={{ width: 60, height: 60, top: "70%", left: "75%", animationDuration: "10s" }}></div>
                <div className="square" style={{ width: 80, height: 80, top: "50%", left: "50%", animationDuration: "15s" }}></div>
                <div className="square" style={{ width: 50, height: 50, top: "35%", left: "80%", animationDuration: "8s" }}></div>
                <div className="content-manage">
                    <div class="header-container">
                        <h1 class="title">Santhosh Kumar Padige</h1>
                        <h3 class="caption">Senior Software Engineer</h3>
                    </div>
                    {/* Hero Content */}
                    <div className={`hero-content ${animate ? "slide-in" : ""}`}>
                        <p className="fade-up delay-2">
                            Crafting scalable web and cross-platform applications with over 7 years of experience, I specialize in designing robust system architectures and delivering high-quality, secure software solutions. I thrive on transforming complex challenges into efficient, user-friendly applications while guiding technical teams to achieve excellence. Passionate about innovation and clean code, I focus on building software that drives real-world impact and seamless user experiences.
                        </p>

                        {/* Social Icons */}
                        <div className="social-icons fade-up delay-3">
                            <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="mailto:your.email@example.com">
                                <FaEnvelope />
                            </a>
                        </div>

                        {/* Scroll Down Indicator */}
                        <div className="scroll-indicator" onClick={scrollToNextSection}>
                            &#x25BC;
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
};

export default About;
