export interface InputMetrics {
  dailyAdvertisingBudget: number;
  costPerProspect: number;
  initialPatientValue: number;
  patientRetentionRate: number;
  patientLifetimeValue: number;
  prospectConversionRate: number;
}

export interface ChurnMetrics {
  period: string;
  activeClientsStart: number;
  lostClients: number;
  newClients: number;
  churnRate: number;
}

export interface DetailedMetrics {
  marketingExpenses: number;
  revenues: number;
  churnRate: number;
  grossMargin: number;
  grossProfit: number;
  roi: number;
  revenueLossChurn: number;
  adjustedRevenues: number;
  adjustedGrossProfit: number;
}

export type TimeFrame = '1 Month' | '3 Months' | '1 Year';

export interface TimeFrameMultiplier {
  [key: string]: number;
}