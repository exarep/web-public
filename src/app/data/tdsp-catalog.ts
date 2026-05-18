import type { TdspId, TdspTerritory } from './tdsp.types';

/**
 * Illustrative TDSP pass-through components used to show how retail supply pricing and TDU charges combine.
 * Replace with tariff feeds or a pricing API before production use.
 */
export const TDSP_BY_ID: Record<TdspId, TdspTerritory> = {
  ONCOR: {
    id: 'ONCOR',
    shortName: 'Oncor',
    deliveryCentsPerKwh: 3.85,
    monthlyBaseUsd: 4.23,
  },
  CENTERPOINT: {
    id: 'CENTERPOINT',
    shortName: 'CenterPoint Energy',
    deliveryCentsPerKwh: 4.12,
    monthlyBaseUsd: 5.47,
  },
  AEP_TEXAS_CENTRAL: {
    id: 'AEP_TEXAS_CENTRAL',
    shortName: 'AEP Texas Central',
    deliveryCentsPerKwh: 3.42,
    monthlyBaseUsd: 3.98,
  },
  AEP_TEXAS_NORTH: {
    id: 'AEP_TEXAS_NORTH',
    shortName: 'AEP Texas North',
    deliveryCentsPerKwh: 3.58,
    monthlyBaseUsd: 4.05,
  },
  TNMP: {
    id: 'TNMP',
    shortName: 'TNMP',
    deliveryCentsPerKwh: 4.48,
    monthlyBaseUsd: 6.95,
  },
  LPL: {
    id: 'LPL',
    shortName: 'Lubbock Power & Light',
    deliveryCentsPerKwh: 3.18,
    monthlyBaseUsd: 3.45,
  },
};
