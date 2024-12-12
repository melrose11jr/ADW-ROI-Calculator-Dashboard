import { InputMetrics } from "../types/metrics";

interface InputSectionProps {
  metrics: InputMetrics;
  onChange: (field: keyof InputMetrics, value: number) => void;
  onCalculate: () => void;
}

export function InputSection({ metrics, onChange, onCalculate }: InputSectionProps) {
  const inputFields = [
    {
      label: 'Daily Advertising Budget (DH)',
      key: 'dailyAdvertisingBudget' as keyof InputMetrics,
      value: metrics.dailyAdvertisingBudget,
      step: 10,
    },
    {
      label: 'Cost per Prospect (DH)',
      key: 'costPerProspect' as keyof InputMetrics,
      value: metrics.costPerProspect,
      step: 5,
    },
    {
      label: 'Initial Patient Value (DH)',
      key: 'initialPatientValue' as keyof InputMetrics,
      value: metrics.initialPatientValue,
      step: 50,
    },
    {
      label: 'Patient Retention Rate',
      key: 'patientRetentionRate' as keyof InputMetrics,
      value: metrics.patientRetentionRate,
      step: 0.05,
      max: 1,
    },
    {
      label: 'Patient Lifetime Value (DH)',
      key: 'patientLifetimeValue' as keyof InputMetrics,
      value: metrics.patientLifetimeValue,
      step: 100,
    },
    {
      label: 'Prospect Conversion Rate',
      key: 'prospectConversionRate' as keyof InputMetrics,
      value: metrics.prospectConversionRate,
      step: 0.05,
      max: 1,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inputFields.map((field) => (
          <div key={field.key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type="number"
              value={field.value}
              onChange={(e) => onChange(field.key, parseFloat(e.target.value))}
              step={field.step}
              max={field.max}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
      
      {/* Calculate Button */}
      <div className="flex justify-center">
        <button
          onClick={onCalculate}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Calculate
        </button>
      </div>
    </div>
  );
}