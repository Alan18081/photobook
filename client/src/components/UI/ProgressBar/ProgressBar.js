import React from 'react';

import './ProgressBar.sass';

const progressBar = ({label,chunk,full = 100,color}) => {
  const currentWidth = chunk / full * 100;
  return (
    <div>
      <span className="purple-text">{label}</span>
      <div className="progress ProgressBar__container">
        <div className="determinate" style={{
          width: `${currentWidth}%`,
          backgroundColor: color
        }}></div>
      </div>
    </div>
  )
};

export default progressBar;
