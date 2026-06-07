export interface Plan {
  planId: string;
  planName: string;
  planType: 'Fixed' | 'Variable' | 'GreenEnergy';
  termMonths: number;
  ratePerKwh: number;
  baseCharge: number;
  earlyTermFee: number;
  greenPercentage: number;
  tdspName: string;
  features: string[];
}
