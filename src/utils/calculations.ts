import { InputMetrics, DetailedMetrics, TimeFrame, TimeFrameMultiplier } from '../types/metrics';

export const TIME_FRAME_MULTIPLIER: TimeFrameMultiplier = {
  '1 Month': 30,
  '3 Months': 90,
  '1 Year': 365,
};

export const GROSS_MARGIN_RATE = 0.35; // 35% gross margin

export function calculateMetrics(
  input: InputMetrics,
  timeframe: TimeFrame,
  churnRate: number
): DetailedMetrics {
  const days = TIME_FRAME_MULTIPLIER[timeframe];
  const marketingExpenses = input.dailyAdvertisingBudget * days;
  
  // Basic metrics
  const prospectsGenerated = marketingExpenses / input.costPerProspect;
  const newPatients = prospectsGenerated * input.prospectConversionRate;
  
  // Revenue calculations
  const initialRevenue = newPatients * input.initialPatientValue;
  const lifetimeRevenue = newPatients * input.patientLifetimeValue * (1 - churnRate);
  const revenues = initialRevenue + lifetimeRevenue;
  
  // ROI and other calculations
  const roi = (revenues - marketingExpenses) / marketingExpenses;
  const revenueLossChurn = revenues * churnRate;
  const adjustedRevenues = revenues - revenueLossChurn;
  const grossProfit = revenues * GROSS_MARGIN_RATE;
  const adjustedGrossProfit = adjustedRevenues * GROSS_MARGIN_RATE;

  return {
    marketingExpenses,
    revenues,
    churnRate,
    grossMargin: GROSS_MARGIN_RATE,
    grossProfit,
    roi,
    revenueLossChurn,
    adjustedRevenues,
    adjustedGrossProfit,
  };
}

export function formatCurrency(value: number): string {
  if (typeof value !== 'number') return '0.00';
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercentage(value: number): string {
  if (typeof value !== 'number') return '0.00%';
  return (value * 100).toFixed(2) + '%';
}