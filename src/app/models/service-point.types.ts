/** A Texas service location (ESIID / service point) candidate from lookup. */
export interface ServicePointCandidate {
  esiId: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  /** TDU / TDSP name when known */
  tduName?: string;
  /** Residential vs small commercial — demo only */
  premiseType?: 'RESIDENTIAL' | 'COMMERCIAL';
}

export interface EsiidLookupByAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}
