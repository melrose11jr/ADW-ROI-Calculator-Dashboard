import React from 'react';
import { ChurnMetrics } from '../types/metrics';

interface ChurnTableProps {
  data: ChurnMetrics[];
  onUpdate: (index: number, field: keyof ChurnMetrics, value: number) => void;
}

export function ChurnTable({ data, onUpdate }: ChurnTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Clients Start</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lost Clients</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Clients</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Churn Rate (%)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={row.period}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.period}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={row.activeClientsStart}
                  onChange={(e) => onUpdate(index, 'activeClientsStart', Number(e.target.value))}
                  className="w-24 px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={row.lostClients}
                  onChange={(e) => onUpdate(index, 'lostClients', Number(e.target.value))}
                  className="w-24 px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={row.newClients}
                  onChange={(e) => onUpdate(index, 'newClients', Number(e.target.value))}
                  className="w-24 px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {(row.churnRate * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}