import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react"; // you can use font-awesome too

export default function ScrollNav() {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = Array.from(document.querySelectorAll("section"));

  const scrollToSection = (index) => {
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setCurrentSection(sections.indexOf(visibleSection.target));
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="scroll-nav">
      {currentSection > 0 && (
        <button
          className="scroll-btn up"
          onClick={() => scrollToSection(currentSection - 1)}
        >
          <ChevronUp size={24} />
        </button>
      )}
      {currentSection < sections.length - 1 && (
        <button
          className="scroll-btn down"
          onClick={() => scrollToSection(currentSection + 1)}
        >
          <ChevronDown size={24} />
        </button>
      )}
    </div>
  );
}
