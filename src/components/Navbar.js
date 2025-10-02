import  { useState } from "react";
import { motion } from "framer-motion";
import "../app.css";

const Navbar = ({ toggleTheme, darkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("highlight");
      setTimeout(() => el.classList.remove("highlight"), 1000);
    }
    setMenuOpen(false);
  };

  const sections = ["about", "education", "experience", "skills"];

  return (
    <nav className="navbar">
      <div className="logo">MyPortfolio</div>

      <div className={`menu-icon ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span><span></span><span></span>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        {sections.map((sec, i) => (
          <motion.li
            key={sec}
            onClick={() => scrollToSection(sec)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.1, color: "#64ffda" }}
          >
            {sec.charAt(0).toUpperCase() + sec.slice(1)}
          </motion.li>
        ))}
        <li>
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
