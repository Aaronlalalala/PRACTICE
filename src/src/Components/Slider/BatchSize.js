import React, { useState } from 'react';
import "../style/slider.css";

function BatchSize() {
  const [sliderValue, setSliderValue] = useState(50);
  const [inputValue, setInputValue] = useState(50);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setSliderValue(newValue);
    setInputValue(newValue);
  };

  const handleInputChange = (e) => {
    let newValue = parseInt(e.target.value, 10);
    newValue = Math.min(100, Math.max(0, newValue));
    setSliderValue(newValue);
    setInputValue(newValue);
  };

  return (
    <div className="slider-container">
      <h4>BatchSize</h4>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        className="slider"
        onChange={handleSliderChange}
      />
      <input
        type="number"
        min="0"
        max="100"
        value={inputValue}
        className="input"
        onChange={handleInputChange}
      />
    </div>
  );
}

export default BatchSize;