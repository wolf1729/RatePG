/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Loader = ({ onComplete }) => {
  const mainTitle = "RatePG";
  const subTitle = "for the students, by the students";
  const [titleText, setTitleText] = useState("");
  const [subText, setSubText] = useState("");
  const [isTitleTypingComplete, setIsTitleTypingComplete] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let titleIndex = 0;
    const typingSpeed = 80; 
    
    const titleTypingInterval = setInterval(() => {
      if (titleIndex < mainTitle.length) {
        setTitleText(mainTitle.substring(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleTypingInterval);
        setIsTitleTypingComplete(true);
      }
    }, typingSpeed);

    return () => {
      clearInterval(titleTypingInterval);
    };
  }, [mainTitle]);

  useEffect(() => {
    if (isTitleTypingComplete) {
      let subIndex = 0;
      const typingSpeed = 80;
      
      const subTypingInterval = setInterval(() => {
        if (subIndex < subTitle.length) {
          setSubText(subTitle.substring(0, subIndex + 1));
          subIndex++;
        } else {
          clearInterval(subTypingInterval);
          
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 1000);
          }, 800);
        }
      }, typingSpeed);

      return () => {
        clearInterval(subTypingInterval);
      };
    }
  }, [isTitleTypingComplete, subTitle, onComplete]);

  useEffect(() => {
    // Blink cursor
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-1000 ${
        isComplete ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <h1 className="text-3xl md:text-5xl font-mono font-bold text-white whitespace-nowrap">
              {titleText}
              {isTitleTypingComplete ? null : (
                <span 
                  className={`absolute h-8 md:h-12 w-2 bg-white ml-1 ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                ></span>
              )}
            </h1>
          </div>
          
          {isTitleTypingComplete && (
            <div className="relative mt-2">
              <h2 className="text-xl md:text-2xl font-mono font-medium text-white whitespace-nowrap">
                {subText}
                <span 
                  className={`absolute h-6 md:h-8 w-2 bg-white ml-1 ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                ></span>
              </h2>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-white font-mono text-sm opacity-50">
          System initialized...
        </div>
      </div>
    </div>
  );
};

export default Loader;