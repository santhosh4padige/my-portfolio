import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import "./app.css";
import ScrollNav from "./components/ScrollNav";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  const handleLoadingComplete = () => setIsLoading(false);

  // Loading progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Apply dark/light mode globally
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className="app">
      {isLoading ? (
        <LoadingScreen progress={progress} onComplete={handleLoadingComplete} />
      ) : (
        <>
          <Navbar toggleTheme={() => setDarkMode(!darkMode)} darkMode={darkMode} />
          <main>
            <section id="about" className="section">
              <About />
            </section>
            <section id="education" className="section">
              <Education />
            </section>
            <section id="experience" className="section">
              <Experience />
            </section>
            <section id="skills" className="section">
              <Skills />
            </section>
            <ScrollNav />
          </main>
        </>
      )}
    </div>
  );
}
