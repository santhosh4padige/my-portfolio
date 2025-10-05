import { useEffect, useState } from "react";
import { User, BookOpen, Briefcase, Wrench, ChevronUp, ChevronDown } from "lucide-react";

export default function ScrollNav() {
  const sections = [
    { id: "about", label: "About", icon: User },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Wrench },
  ];

  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const sectionElements = sections.map((s) => document.getElementById(s.id));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const index = sectionElements.indexOf(visibleEntry.target);
          setCurrentSection(index);
        }
      },
      { threshold: 0.6 } // Higher threshold ensures section is mostly visible
    );

    sectionElements.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (index) => {
    const el = document.getElementById(sections[index].id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Check if last section is fully visible
  const isLastSectionVisible = () => {
    const last = document.getElementById(sections[sections.length - 1].id);
    if (!last) return false;
    const rect = last.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  return (
    <div className="scroll-nav">
      {currentSection > 0 && (
        <button
          className="scroll-btn up"
          onClick={() => scrollToSection(currentSection - 1)}
        >
          <ChevronUp size={24} />
          <span className="tooltip-text">Previous</span>
        </button>
      )}

      {/* Only show down arrow if last section is NOT fully visible */}
      {!isLastSectionVisible() && currentSection < sections.length - 1 && (
        <button
          className="scroll-btn down"
          onClick={() => scrollToSection(currentSection + 1)}
        >
          <ChevronDown size={24} />
          <span className="tooltip-text">Next</span>
        </button>
      )}
    </div>
  );
}
