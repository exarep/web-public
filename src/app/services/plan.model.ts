export interface Plan {
  planId: string;
  planName: string;
  termMonths: number;
  energyChargePerKwh: number;
  tdspChargePerKwh: number;
  baseCharge: number;
  earlyTermFee: number;
  tdspName: string;
  features: string[];
}

export interface PlanEstimate {
  kwh: number;
  energyCharge: number;
  tdspCharge: number;
  baseCharge: number;
  total: number;
  averagePricePerKwh: number;
}

export function calculateEstimates(plan: Plan): PlanEstimate[] {
  return [500, 1000, 2000].map(kwh => {
    const energyCharge = kwh * plan.energyChargePerKwh;
    const tdspCharge = kwh * plan.tdspChargePerKwh;
    const total = energyCharge + tdspCharge + plan.baseCharge;
    return {
      kwh,
      energyCharge,
      tdspCharge,
      baseCharge: plan.baseCharge,
      total,
      averagePricePerKwh: total / kwh
    };
  });
}
