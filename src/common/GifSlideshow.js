// src/GifSlideshow.js
import React, { useState } from "react";

const gifs = [
  "https://media.giphy.com/media/l0ErFafpUCQTkqsQE/giphy.gif",
  "https://media.giphy.com/media/26Ff5evMweBsENWqk/giphy.gif",
  // ... more GIF URLs
];

const instructions = [
  {
    title: "Open your compass app in device and heads up to NORTH direction",
    description: "",
  },
];

const GifSlideshow = ({ requestPermission }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % instructions.length);
  };

  return (
    <div>
      <h2 id="parent-modal-title">{instructions[currentIndex].title}</h2>
      <p id="parent-modal-description">
        {instructions[currentIndex].description}
      </p>
      <button
        className="button button--primary"
        onClick={
          currentIndex == instructions.length - 1
            ? requestPermission
            : handleNext
        }
      >
        {currentIndex !== instructions.length - 1 ? "Next" : "Calibrate"}
      </button>
    </div>
  );
};

export default GifSlideshow;
