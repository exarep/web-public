import type { RepEnergyPlan } from './tdsp.types';

/** Fixed-rate plan lineup (sample plans for demonstration). */
export const REP_ENERGY_PLANS: RepEnergyPlan[] = [
  {
    code: 'FIXED_12',
    displayName: 'Fixed 12',
    termMonths: 12,
    energyCentsPerKwh: 11.2,
  },
  {
    code: 'FIXED_24',
    displayName: 'Fixed 24',
    termMonths: 24,
    energyCentsPerKwh: 10.9,
  },
  {
    code: 'FIXED_36',
    displayName: 'Fixed 36',
    termMonths: 36,
    energyCentsPerKwh: 10.6,
  },
];
