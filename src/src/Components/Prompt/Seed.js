import React, { useState } from 'react';
import "../style/prompt.css";

const Seed = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('輸入：', inputValue);
      setInputValue((prevValue) => {
        console.log('保留文字：', prevValue);
        return prevValue;
      });
    }
  };

  return (
    <div className="input-container">
      <h3>Seed</h3>
      <input
        type="text"
        className="input-field"
        placeholder="請輸入"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterKeyPress}
      />
    </div>
  );
};

export default Seed;