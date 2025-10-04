import { useState, useEffect } from "react";
import "./LoadingScreen.css";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15;
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(interval);
          setProgress(100);
          setIsLoaded(true);
        }
        return newProgress;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setShowWelcome(true);
      setTimeout(() => {
        setReveal(true);
        setTimeout(() => {
          if (typeof onComplete === "function") onComplete();
        }, 1500);
      }, 2500);
    }
  }, [isLoaded, onComplete]);

  return (
    <div className={`loading-screen ${reveal ? "reveal" : ""}`}>
      {!showWelcome ? (
        <>
          <div className="dev-avatar">
            <div className="head" />
            <div className="body" />
            <div className="laptop" />
          </div>

          <div className="spinner-container">
            <div className="spinner-ring" />
            <div className="spinner-ring" />
            <div className="spinner-ring" />
          </div>

          <div className="loading-percentage">{Math.floor(progress)}</div>
          <div className="loading-instruction">
            {isLoaded ? "" : "Loading..."}
          </div>
        </>
      ) : (
        <div className="welcome-note">✨ Welcome to My Portfolio ✨</div>
      )}
    </div>
  );
}
