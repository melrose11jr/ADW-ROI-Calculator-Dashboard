import React, { useState, useEffect } from 'react';
import { InputMetrics, ChurnMetrics, DetailedMetrics, TimeFrame } from '../types/metrics';
import { calculateMetrics } from '../utils/calculations';
import { InputSection } from './InputSection';
import { ChurnTable } from './ChurnTable';
import { DetailedMetricsTable } from './DetailedMetricsTable';
import { BarChart } from 'lucide-react';
import html2pdf from 'html2pdf.js';



const exportToPDF = (element: HTMLElement | null, options: any) => {
  if (element) {
    const pdfInstance = html2pdf();
    return pdfInstance.set(options).from(element).save()
      .catch(error => {
        console.error("Error exporting PDF:", error);
        alert('Failed to export PDF. Please check the console for details.');
      });
  } else {
    alert('Failed to export PDF. Please try again.');
    return Promise.resolve(); // Return a resolved promise to avoid issues
  }
};


export function ROICalculator() {
  const [timeframe, setTimeframe] = useState<TimeFrame>('1 Month');
  const [inputMetrics, setInputMetrics] = useState<InputMetrics>({
    dailyAdvertisingBudget: 100,
    costPerProspect: 70,
    initialPatientValue: 300,
    patientRetentionRate: 0.65,
    patientLifetimeValue: 4000,
    prospectConversionRate: 0.2,
  });

  const calculationResult = {
    timestamp: Date.now(),
    doctorName: 'Dr. Smith', // Replace with actual doctor's name
    inputValues: {
        // ... input values
    },
    calculatedValues: {
        // ... calculated values
    }
};


  const handleExportPDF = () => {
    const element = document.getElementById('dashboard'); // The element you want to export

    const options = {
      margin: 7,
      filename: `MetricsDashboard_${new Date().toISOString()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Call the exportToPDF function
    exportToPDF(element, options);
  };
  const [churnData, setChurnData] = useState<ChurnMetrics[]>([
    { period: 'Month 1', activeClientsStart: 300, lostClients: 7, newClients: 9, churnRate: 0.0235 },
    { period: 'Month 2', activeClientsStart: 302, lostClients: 7, newClients: 12, churnRate: 0.023 },
    { period: 'Month 3', activeClientsStart: 307, lostClients: 7, newClients: 15, churnRate: 0.0225 },
    { period: 'Month 4', activeClientsStart: 315, lostClients: 7, newClients: 18, churnRate: 0.022 },
    { period: 'Month 5', activeClientsStart: 326, lostClients: 7, newClients: 20, churnRate: 0.0215 },
    { period: 'Month 6', activeClientsStart: 339, lostClients: 7, newClients: 22, churnRate: 0.021 },
  ]);

  const [calculatedMetrics, setCalculatedMetrics] = useState<DetailedMetrics>(
    calculateMetrics(inputMetrics, timeframe, churnData[0].churnRate)
  );

  // Recalculate metrics when inputMetrics, timeframe, or churnData changes
  useEffect(() => {
    const currentChurnRate = churnData[0].churnRate;
    const metrics = calculateMetrics(inputMetrics, timeframe, currentChurnRate);
    setCalculatedMetrics(metrics);
  }, [inputMetrics, timeframe, churnData]);

  // Handle changes to input metrics
  const handleMetricChange = (field: keyof InputMetrics, value: number) => {
    setInputMetrics((prev) => ({ ...prev, [field]: value }));
  };

  // Handle updates to churn data
  const handleChurnUpdate = (index: number, field: keyof ChurnMetrics, value: number) => {
    setChurnData((prev) => {
      const newData = [...prev];
      newData[index] = {
        ...newData[index],
        [field]: value,
        churnRate: field === 'lostClients' ? value / newData[index].activeClientsStart : newData[index].churnRate,
      };
      return newData;
    });
  };

  // Handle Calculate button click
  const handleCalculate = () => {
    const currentChurnRate = churnData[0].churnRate;
    const metrics = calculateMetrics(inputMetrics, timeframe, currentChurnRate);
    setCalculatedMetrics(metrics);

    // Optional: Log the result or perform additional actions
    console.log('Metrics recalculated:', metrics);
  };

  return (
    <div id="dashboard" className="min-h-screen bg-gray-100">
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <BarChart className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900">
            ADW Dental Marketing ROI Dashboard
          </h1>
        </div>

        <div className="space-y-8">
          {/* Input Parameters Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Input Parameters
            </h2>
            <InputSection 
              metrics={inputMetrics} 
              onChange={handleMetricChange} 
              onCalculate={handleCalculate} // Pass the handleCalculate function to InputSection
            />
          </section>

          {/* Churn Analysis Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Churn Analysis
            </h2>
            <ChurnTable 
              data={churnData} 
              onUpdate={handleChurnUpdate} 
            />
          </section>
          

          {/* Detailed Metrics Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              
            </h2>
            <DetailedMetricsTable 
              metrics={calculatedMetrics} 
              timeframe={timeframe} 
              onTimeframeChange={setTimeframe} 
            />
          </section>
        </div>
      </div>
    </div>
    <div className="flex justify-center mt-0 mb-0 bg-gray-100 min-h-full">
  <button
    onClick={handleExportPDF}
    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
  >
    Export as PDF
  </button>
</div>
    </div>
  );
}