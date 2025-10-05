import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const sections = [
  { id: "about" },
  { id: "education" },
  { id: "experience" },
  { id: "skills" },
];

export default function ScrollNav() {
  const [currentSection, setCurrentSection] = useState(0);
  const [lastSectionVisible, setLastSectionVisible] = useState(false);

  const scrollOffset = 80; // adjust this if you have a taller fixed header

  // 🔸 Intersection Observer to track current section
  useEffect(() => {
    const sectionEls = sections.map((s) => document.getElementById(s.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionEls.indexOf(entry.target);
            setCurrentSection(idx);
          }
        });
      },
      { threshold: 0.6 }
    );
    sectionEls.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 🔸 Track if the last section is fully visible
  useEffect(() => {
    const last = document.getElementById(sections[sections.length - 1].id);
    if (!last) return;
    const observer = new IntersectionObserver(
      ([entry]) => setLastSectionVisible(entry.isIntersecting),
      { threshold: 0.8 }
    );
    observer.observe(last);
    return () => observer.disconnect();
  }, []);

  // 🔸 Smooth scroll with offset
  const scrollToSection = (index) => {
    const el = document.getElementById(sections[index].id);
    if (!el) return;

    const y = el.offsetTop - scrollOffset;
    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    if (currentSection > 0) scrollToSection(currentSection - 1);
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) scrollToSection(currentSection + 1);
  };

  // 🔸 Keyboard listener — ✅ cleaned up, no ESLint warnings
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp" && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
      if (e.key === "ArrowDown" && currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentSection]);

  return (
    <div className="scroll-nav">
      {currentSection > 0 && (
        <button className="scroll-btn up" onClick={handlePrev}>
          <ChevronUp size={24} />
          <span className="tooltip-text">Previous Section</span>
        </button>
      )}

      {!lastSectionVisible && currentSection < sections.length - 1 && (
        <button className="scroll-btn down" onClick={handleNext}>
          <ChevronDown size={24} />
          <span className="tooltip-text">Next Section</span>
        </button>
      )}
    </div>
  );
}
