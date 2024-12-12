import React from 'react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
}

export function MetricsCard({ title, value, prefix = '', suffix = '' }: MetricsCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <div className="flex items-baseline">
        {prefix && <span className="text-sm mr-1">{prefix}</span>}
        <span className="text-lg font-semibold text-gray-900">{value}</span>
        {suffix && <span className="text-sm ml-1">{suffix}</span>}
      </div>
    </div>
  );
}