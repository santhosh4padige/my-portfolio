import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  BookOpen,
  Briefcase,
  Wrench,
  Sun,
  Moon,
} from "lucide-react";
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

  const sections = [
    { id: "about", label: "About", icon: User },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Wrench },
  ];

  // Icon color — consistent with theme
  const iconColor = darkMode ? "#ccd6f6" : "#0a192f";

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      {/* Logo */}
      <div className="logo" style={{ color: iconColor }}>
        MyPortfolio
      </div>

      {/* Hamburger menu */}
      <div
        className={`menu-icon ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span
          style={{
            backgroundColor: iconColor,
          }}
        ></span>
        <span
          style={{
            backgroundColor: iconColor,
          }}
        ></span>
        <span
          style={{
            backgroundColor: iconColor,
          }}
        ></span>
      </div>

      {/* Nav Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        {sections.map((sec, i) => {
          const IconComp = sec.icon;
          return (
            <motion.li
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, color: "#64ffda" }}
              style={{ color: iconColor }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <IconComp size={18} color={iconColor} />
                {sec.label}
              </span>
            </motion.li>
          );
        })}

        {/* Theme Toggle */}
        {/* <li>
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? (
              <>
                <Sun size={18} color="#0a192f" />
                Light
              </>
            ) : (
              <>
                <Moon size={18} color="#fff" />
                Dark
              </>
            )}
          </button>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
