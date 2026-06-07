import { Injectable, signal } from '@angular/core';
import { Plan } from './plan.model';

interface TdspInfo {
  tdspName: string;
  tdspChargePerKwh: number;
}

const TDSP_BY_ZIP: Record<string, TdspInfo> = {
  '75201': { tdspName: 'Oncor Electric Delivery', tdspChargePerKwh: 0.04039 },
  '75208': { tdspName: 'Oncor Electric Delivery', tdspChargePerKwh: 0.04039 },
  '75219': { tdspName: 'Oncor Electric Delivery', tdspChargePerKwh: 0.04039 },
  '75226': { tdspName: 'Oncor Electric Delivery', tdspChargePerKwh: 0.04039 },
  '75230': { tdspName: 'Oncor Electric Delivery', tdspChargePerKwh: 0.04039 },
  '77002': { tdspName: 'CenterPoint Energy', tdspChargePerKwh: 0.04196 },
  '77007': { tdspName: 'CenterPoint Energy', tdspChargePerKwh: 0.04196 },
  '77019': { tdspName: 'CenterPoint Energy', tdspChargePerKwh: 0.04196 },
  '77054': { tdspName: 'CenterPoint Energy', tdspChargePerKwh: 0.04196 },
  '77057': { tdspName: 'CenterPoint Energy', tdspChargePerKwh: 0.04196 },
  '78401': { tdspName: 'AEP Texas', tdspChargePerKwh: 0.04541 },
  '78411': { tdspName: 'AEP Texas', tdspChargePerKwh: 0.04541 },
};

const DEFAULT_TDSP: TdspInfo = { tdspName: 'Oncor Electric Delivery', tdspChargePerKwh: 0.04039 };

function buildPlansForZip(zipCode: string): Plan[] {
  const tdsp = TDSP_BY_ZIP[zipCode] ?? DEFAULT_TDSP;

  return [
    {
      planId: 'fixed-12',
      planName: 'Exarep Fixed 12',
      termMonths: 12,
      energyChargePerKwh: 0.069,
      tdspChargePerKwh: tdsp.tdspChargePerKwh,
      baseCharge: 9.95,
      earlyTermFee: 150,
      tdspName: tdsp.tdspName,
      features: ['Locked-in rate for 12 months', 'No hidden fees', 'Predictable monthly bills']
    },
    {
      planId: 'fixed-24',
      planName: 'Exarep Fixed 24',
      termMonths: 24,
      energyChargePerKwh: 0.065,
      tdspChargePerKwh: tdsp.tdspChargePerKwh,
      baseCharge: 9.95,
      earlyTermFee: 200,
      tdspName: tdsp.tdspName,
      features: ['Lower rate for longer commitment', 'Price certainty for 2 years', 'Predictable monthly bills']
    },
    {
      planId: 'fixed-36',
      planName: 'Exarep Fixed 36',
      termMonths: 36,
      energyChargePerKwh: 0.062,
      tdspChargePerKwh: tdsp.tdspChargePerKwh,
      baseCharge: 9.95,
      earlyTermFee: 250,
      tdspName: tdsp.tdspName,
      features: ['Lowest fixed rate available', 'Price certainty for 3 years', 'Predictable monthly bills']
    }
  ];
}

@Injectable({ providedIn: 'root' })
export class PlanService {

  readonly plans = signal<Plan[]>([]);
  readonly loading = signal(false);
  readonly selectedZipCode = signal('');

  loadPlansForZip(zipCode: string): void {
    this.loading.set(true);
    this.selectedZipCode.set(zipCode);

    setTimeout(() => {
      this.plans.set(buildPlansForZip(zipCode));
      this.loading.set(false);
    }, 800);
  }
}
