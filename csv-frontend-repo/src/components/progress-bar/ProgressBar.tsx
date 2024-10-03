import React from 'react';
import './progressbar.css';
interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
      {progress === 100 && <p>File uploaded successfully!</p>}
    </div>
  );
};

export default ProgressBar;
