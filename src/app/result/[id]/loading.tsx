"use client";

import React, { useState, useEffect } from "react";

const Loading = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "Analyzing champions",
    "Decoding playstyle",
    "Calculating performance",
    "Unveiling persona",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentText((prevText) => (prevText + 1) % texts.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white p-4">
      <div className="w-40 h-40 relative mb-8">
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-3 border-4 border-yellow-500 rounded-full animate-ping"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-yellow-400">LoL</span>
        </div>
      </div>
      <h2 className="text-4xl font-bold mb-4 text-yellow-400 animate-pulse">
        Summoning Your Persona
      </h2>
      <p className="text-2xl text-blue-300 mb-2 text-center h-8">
        {texts[currentText]}...
      </p>
      <p className="text-lg text-blue-200 mb-6 text-center">
        AI is weaving your unique LoL identity
      </p>
      <div className="flex space-x-2 mt-4">
        {[0, 1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
            style={{ animationDelay: `${index * 0.15}s` }}
          ></div>
        ))}
      </div>
      <p className="text-sm text-blue-300 mt-8 text-center max-w-md">
        &quot;In the Fields of Justice, every champion tells a story. Your story
        is being written.&quot;
      </p>
    </div>
  );
};

export default Loading;
