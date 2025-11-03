
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const safeProgress = Math.min(100, Math.max(0, progress));
  return (
    <div>
        <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-indigo-700">Progress</span>
            <span className="text-sm font-medium text-indigo-700">{safeProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${safeProgress}%` }}></div>
        </div>
    </div>
  );
};

export default ProgressBar;
