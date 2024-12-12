import React from 'react';
import { DetailedMetrics, TimeFrame } from '../types/metrics';
import { formatCurrency, formatPercentage } from '../utils/calculations';
import { TimeframeSelector } from './TimeframeSelector';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DetailedMetricsTableProps {
  metrics: DetailedMetrics;
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
}

export function DetailedMetricsTable({ metrics, timeframe, onTimeframeChange }: DetailedMetricsTableProps) {
  const metricsData = [
    { label: 'Marketing Expenses', value: metrics.marketingExpenses, format: formatCurrency, suffix: 'DH' },
    { label: 'Revenues', value: metrics.revenues, format: formatCurrency, suffix: 'DH' },
    { label: 'Churn Rate', value: metrics.churnRate, format: formatPercentage },
    { label: 'Gross Margin', value: metrics.grossMargin, format: formatPercentage },
    { label: 'Gross Profit', value: metrics.grossProfit, format: formatCurrency, suffix: 'DH' },
    { label: 'ROI', value: metrics.roi, format: (v: number) => v.toFixed(2), suffix: 'x' },
    { label: 'Revenue Loss due to Churn', value: metrics.revenueLossChurn, format: formatCurrency, suffix: 'DH' },
    { label: 'Adjusted Revenues', value: metrics.adjustedRevenues, format: formatCurrency, suffix: 'DH' },
    { label: 'Adjusted Gross Profit', value: metrics.adjustedGrossProfit, format: formatCurrency, suffix: 'DH' },
  ];

  // Data for the bar chart
  const graphData = [
    { name: 'Marketing Expenses', value: metrics.marketingExpenses, fill: '#f00' }, // Red for losses
    { name: 'Revenues', value: metrics.revenues, fill: '#008000' }, // Green for revenue
    { name: 'Adjusted Gross Profit', value: metrics.adjustedGrossProfit, fill: '#add8e6' }, // Light blue for gross profit
  ];

  return (
    <div>
      {/* Header with Timeframe Selector */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Detailed Metrics</h2>
        <TimeframeSelector selected={timeframe} onChange={onTimeframeChange} />
      </div>

      {/* Metrics Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {metricsData.map((metric) => (
          <div
            key={metric.label}
            className="bg-white shadow rounded-lg p-4 border border-gray-200 flex flex-col"
          >
            <div className="text-sm font-medium text-gray-500">{metric.label}</div>
            <div className="text-lg font-semibold text-gray-800 mt-2">
              {metric.format(metric.value)}{metric.suffix ? ` ${metric.suffix}` : ''}
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer>
          <BarChart data={graphData} margin={{ top: 20, right: 50, left: 50, bottom: 20 }} barCategoryGap="2" >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => value.toLocaleString('en-US', { minimumFractionDigits: 2 }) + ' DH'} />
            <Tooltip formatter={(value) => value.toLocaleString('en-US', { minimumFractionDigits: 2 }) + ' DH'} />
            <Bar dataKey="value" fill="#82ca9d" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}