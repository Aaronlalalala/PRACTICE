import React, { useState } from 'react';
import "../style/CheckBox.css"

function CropAndResize() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="checkbox-container">
      <h3>Crop and resize</h3>
      <div
        className={`checkbox-icon ${isChecked ? 'checked' : ''}`}
        onClick={handleCheckboxChange}
      >
        {isChecked && <span>&#10003;</span>}
      </div>
      <label className="checkbox-label">Restore faces</label>
    </div>
  );
}

export default CropAndResize;