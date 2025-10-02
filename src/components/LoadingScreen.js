import { useState, useEffect } from "react";
import "./LoadingScreen.css";

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [reveal, setReveal] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);

    // Simulate loading progress
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
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

    const handleClick = () => {
        if (isLoaded) {
            setShowWelcome(true); // Show welcome note
            setTimeout(() => {
                setReveal(true);
                setTimeout(() => onComplete(), 1500); // Exit after reveal
            }, 2500); // Show welcome for 2.5s before revealing
        }
    };

    return (
        <div
            className={`loading-screen ${reveal ? "reveal" : ""}`}
            onClick={handleClick}
        >
            {/* Show loader content only if welcome note not active */}
            {!showWelcome && (
                <>
                    <div className="human-figure">
                        <div className="human-head">
                            <div className="human-hair"></div>
                            <div className="human-eye left"></div>
                            <div className="human-eye right"></div>
                        </div>
                        <div className="human-body"></div>
                        <div className="human-arm left"></div>
                        <div className="human-arm right"></div>
                        <div className="human-leg left"></div>
                        <div className="human-leg right"></div>
                    </div>

                    <div className="spinner-container">
                        <div className="spinner-ring"></div>
                        <div className="spinner-ring"></div>
                        <div className="spinner-ring"></div>
                    </div>

                    <div className="loading-percentage">{Math.floor(progress)}</div>

                    <div className="loading-instruction">
                        {isLoaded ? "Click anywhere to enter" : "Loading..."}
                    </div>
                </>
            )}

            {/* Show Welcome note after click */}
            {showWelcome && (
                <div className="welcome-note">✨ Welcome to My Portfolio ✨</div>
            )}
        </div>
    );
}
