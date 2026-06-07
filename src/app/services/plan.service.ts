import { Injectable, signal } from '@angular/core';
import { Plan } from './plan.model';

const MOCK_PLANS: Plan[] = [
  {
    planId: 'fixed-12',
    planName: 'Exarep Fixed 12',
    termMonths: 12,
    energyChargePerKwh: 0.069,
    tdspChargePerKwh: 0.04039,
    baseCharge: 9.95,
    earlyTermFee: 150,
    tdspName: 'Oncor Electric Delivery',
    features: ['Locked-in rate for 12 months', 'No hidden fees', 'Predictable monthly bills']
  },
  {
    planId: 'fixed-24',
    planName: 'Exarep Fixed 24',
    termMonths: 24,
    energyChargePerKwh: 0.065,
    tdspChargePerKwh: 0.04039,
    baseCharge: 9.95,
    earlyTermFee: 200,
    tdspName: 'Oncor Electric Delivery',
    features: ['Lower rate for longer commitment', 'Price certainty for 2 years', 'Predictable monthly bills']
  },
  {
    planId: 'fixed-36',
    planName: 'Exarep Fixed 36',
    termMonths: 36,
    energyChargePerKwh: 0.062,
    tdspChargePerKwh: 0.04039,
    baseCharge: 9.95,
    earlyTermFee: 250,
    tdspName: 'Oncor Electric Delivery',
    features: ['Lowest fixed rate available', 'Price certainty for 3 years', 'Predictable monthly bills']
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

    setTimeout(() => {
      this.plans.set(MOCK_PLANS);
      this.loading.set(false);
    }, 800);
  }
}
