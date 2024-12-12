import React from 'react';
import { TimeFrame } from '../types/metrics';

interface TimeframeSelectorProps {
  selected: TimeFrame;
  onChange: (timeframe: TimeFrame) => void;
}

export function TimeframeSelector({ selected, onChange }: TimeframeSelectorProps) {
  const timeframes: TimeFrame[] = ['1 Month', '3 Months', '1 Year'];

  return (
    <div className="flex space-x-2">
      {timeframes.map((timeframe) => (
        <button
          key={timeframe}
          onClick={() => onChange(timeframe)}
          className={`px-4 py-2 rounded-md ${
            selected === timeframe
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {timeframe}
        </button>
      ))}
    </div>
  );
}