import { Injectable, signal } from '@angular/core';
import { Plan } from './plan.model';

const MOCK_PLANS: Plan[] = [
  {
    planId: 'fixed-12',
    planName: 'Exarep Steady 12',
    planType: 'Fixed',
    termMonths: 12,
    ratePerKwh: 0.089,
    baseCharge: 9.95,
    earlyTermFee: 150,
    greenPercentage: 0,
    tdspName: 'Oncor Electric Delivery',
    features: ['Locked-in rate for 12 months', 'No hidden fees', 'Free nights & weekends eligible']
  },
  {
    planId: 'fixed-24',
    planName: 'Exarep Steady 24',
    planType: 'Fixed',
    termMonths: 24,
    ratePerKwh: 0.082,
    baseCharge: 9.95,
    earlyTermFee: 200,
    greenPercentage: 0,
    tdspName: 'Oncor Electric Delivery',
    features: ['Lowest fixed rate', 'Price certainty for 2 years', 'Free weekends eligible']
  },
  {
    planId: 'variable',
    planName: 'Exarep Flex',
    planType: 'Variable',
    termMonths: 0,
    ratePerKwh: 0.095,
    baseCharge: 0,
    earlyTermFee: 0,
    greenPercentage: 0,
    tdspName: 'Oncor Electric Delivery',
    features: ['No contract', 'No cancellation fee', 'Rate adjusts monthly']
  },
  {
    planId: 'green-12',
    planName: 'Exarep Green 12',
    planType: 'GreenEnergy',
    termMonths: 12,
    ratePerKwh: 0.099,
    baseCharge: 9.95,
    earlyTermFee: 150,
    greenPercentage: 100,
    tdspName: 'Oncor Electric Delivery',
    features: ['100% renewable energy', 'Texas wind & solar sourced', 'Carbon neutral']
  }
];

@Injectable({ providedIn: 'root' })
export class PlanService {

  readonly plans = signal<Plan[]>([]);
  readonly loading = signal(false);
  readonly selectedZipCode = signal('');

  loadPlansForZip(zipCode: string): void {
    this.loading.set(true);
    this.selectedZipCode.set(zipCode);

    // Simulated API call
    setTimeout(() => {
      this.plans.set(MOCK_PLANS);
      this.loading.set(false);
    }, 800);
  }
}
