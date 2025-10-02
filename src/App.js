import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import './app.css';
import Navbar from "./components/Navbar";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const handleLoadingComplete = () => setIsLoading(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
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


  // Apply dark/light mode class to body
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className="relative">
      {isLoading ? (
        <LoadingScreen progress={progress} onComplete={handleLoadingComplete} />
      ) : (
          <>
      <Navbar toggleTheme={() => setDarkMode(!darkMode)} darkMode={darkMode} />
      <About />
      <Education />
      <Experience />
      <Skills />
    </>
      )}
    </div>
  );
}
