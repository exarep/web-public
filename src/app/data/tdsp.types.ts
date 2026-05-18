export type TdspId =
  | 'ONCOR'
  | 'CENTERPOINT'
  | 'AEP_TEXAS_CENTRAL'
  | 'AEP_TEXAS_NORTH'
  | 'TNMP'
  | 'LPL';

export interface TdspTerritory {
  id: TdspId;
  /** Display name for the TDSP (TDU). */
  shortName: string;
  /** Estimated delivery pass-through in ¢/kWh (illustrative; real bills vary by tariff class and season). */
  deliveryCentsPerKwh: number;
  /** Typical monthly base / customer charge portion attributed to the TDU ($), illustrative. */
  monthlyBaseUsd: number;
}

export type PlanTermMonths = 12 | 24 | 36;

export interface RepEnergyPlan {
  code: string;
  displayName: string;
  termMonths: PlanTermMonths;
  /** Exarep energy charge only (¢/kWh). */
  energyCentsPerKwh: number;
}

export interface ZipLookupResult {
  zip: string;
  tdsp: TdspTerritory;
}

export interface QuotedPlan extends RepEnergyPlan {
  estimatedAllInCentsPerKwh: number;
}
